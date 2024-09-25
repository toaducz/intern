import ICompanyService from "../../Persistences/IServices/ICompanyService";
import { sendMail } from "../../Common/Helpers/emailUtils";
import { generateApiKey } from "../../Common/Helpers/apiKeyUtils";
import { StatusCodeEnums } from '../../../Domain/Enums/StatusCodeEnums';
import { CoreException } from '../../Common/Exceptions/CoreException';
import { CreateCompanyResponse } from "./Responses/CreateCompanyResponse";
import { GetCompanyResponse } from "./Responses/GetCompanyResponse";
import { ChangeStatusCompanyResponse } from "./Responses/ChangeStatusCompanyResponse";
import ICompanyRepository from "../../Persistences/IRepositories/ICompanyRepository";
import CompanyRepository from "../../../Infrastructure/Persistences/Respositories/CompanyRepository";
import IUserRepository from "../../Persistences/IRepositories/IUserRepository";
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";
import IRoleRepository from "../../Persistences/IRepositories/IRoleRepository";
import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import { GetAllCompanyResponse } from "./Responses/GetAllCompanyResponse";
import { UnitOfWork } from '../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { IUnitOfWork } from '../../Persistences/IRepositories/IUnitOfWork';
import { CompanyStatusEnums } from '../../../Domain/Enums/CompanyStatusEnums';
import { ConfigSlotResponse } from "./Responses/ConfigSlotResponse";
import { checkValueInterviewStateEnum } from "../../Common/Helpers/checkValueEnum";

export default class CompanyService implements ICompanyService{

    private companyRepository: ICompanyRepository = new CompanyRepository();
    private userRepository: IUserRepository = new UserRepository();
    private roleRepository: IRoleRepository = new RoleRepository();

    async createNewCompany(data:any): Promise<CreateCompanyResponse|CoreException>{
        try {
            const {companyName, industry, location, companySize, address, website, email} = data;
            const createCompanyData: any = {
                companyName: companyName,
                industry: industry,
                location: location, 
                companySize: companySize,
                address: address,
                website: website,
                email: email
            };
            const result: any = await this.companyRepository.createCompany(createCompanyData);
            await this.companyRepository.commitTransaction();
          
            return new CreateCompanyResponse("Successful", StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.companyRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async getCompanyById(companyId: string): Promise<any> {
        const unitOfWork: IUnitOfWork = new UnitOfWork();

        try {
            await unitOfWork.startTransaction();

            const queryData: any = {
                _id: companyId,
                isActive: true,
                isDeleted: false,
            }

            const result = await unitOfWork.companyRepository.getCompanyById(queryData);
            if (result === null) return new CoreException(StatusCodeEnums.BadRequest_400, 'Company not found');
            
            return new GetCompanyResponse('Successfull', StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            console.log('Erorr in company service');
            await unitOfWork.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async changeStatusCompanyById(data: any): Promise<ChangeStatusCompanyResponse|CoreException>{
        try {
            const session = await this.userRepository.startTransaction();
            const companyData: any = {
                _id: data._id,
                isDeleted: false,
                isActive: true
            }
            const company: any | undefined = await this.companyRepository.getCompanyById(companyData);
            if (!company || company === undefined) {
                throw new CoreException(StatusCodeEnums.InternalServerError_500, "Company not found!");
            }

            if(data.status === CompanyStatusEnums.REJECTED){
                const updateCompanyData: any = {
                    status: data.status,
                    updatedAt: Date.now()
                }

                const updateCompany: any | undefined = await this.companyRepository.updateCompanyById(companyData, updateCompanyData);
                return new ChangeStatusCompanyResponse('Company have been rejected', StatusCodeEnums.OK_200, updateCompany);
            }else if(data.status === CompanyStatusEnums.APPROVED){
                const apiKey: any | undefined = await generateApiKey(company._id);

                const baseQuery: any = {
                    isDeleted: false,
                    isActive: true
                }
                
                const roleIdResult = await this.roleRepository.getRoleIdByRoleName("Company Admin", baseQuery);
                if (!roleIdResult) return new CoreException(StatusCodeEnums.BadRequest_400, `Error occured with role`);
    
                const companyName = transformString(company.companyName);
                const isExistUsername = await this.userRepository.checkDuplicateUsername(companyName, {
                    ...baseQuery,
                    roleId: roleIdResult
                })
    
                if (isExistUsername === true)
                    return new CoreException(StatusCodeEnums.BadRequest_400, `Company is already exists`);
    
                const password = generateRandomPassword()
    
                let createCompanyData: any = {
                    username: companyName,
                    password: password,
                    companyId: company._id,
                    roleId: roleIdResult
                }
    
                const result: any = await this.userRepository.createUser(createCompanyData, session);
                await this.userRepository.commitTransaction();
    
                const emailData : any = {
                    companyName: companyName,
                    password: password,
                    apiKey: apiKey.apiKey
                }

                const updateCompanyData: any = {
                    status: data.status,
                    apiKey: apiKey.apiKeyHash,
                    updatedAt: Date.now()
                }

                const updateCompany: any | undefined = await this.companyRepository.updateCompanyById(companyData, updateCompanyData);
                
                await sendMail(company.email, "Your company account", emailData, "companyaccount.ejs");
                return new ChangeStatusCompanyResponse('created company successfully', StatusCodeEnums.Created_201, updateCompany);
            }else{
                return new CoreException(StatusCodeEnums.InternalServerError_500, `Invalid company staus`);
            }

            
        }catch (error: any) {
            await this.userRepository.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at createComService: ${error.message}`);
        }
    }

    async getAllCompany(query: any): Promise<GetAllCompanyResponse | CoreException>{
        try {
            await this.companyRepository.startTransaction();

            const queryData = query;

            const result: any = await this.companyRepository.getAllCompany(queryData);
            await this.companyRepository.commitTransaction();

            if(!result|| result === undefined) {
                throw new CoreException(StatusCodeEnums.InternalServerError_500, "Not found any company!");
            }
            return new GetAllCompanyResponse("Get All company successful", StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
        }
    }
    async update(companyId: string, data: any): Promise<any> {
        const unitOfWork: IUnitOfWork = new UnitOfWork();

        try {
            const session = await unitOfWork.startTransaction();
            
            const result = await unitOfWork.companyRepository.update(companyId, data, session);
            if (result === null) return new CoreException(StatusCodeEnums.BadRequest_400, 'Company not found');

            await unitOfWork.commitTransaction();
            
            return new CreateCompanyResponse('Updated company successfull', StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            console.log('Erorr in company service');
            await unitOfWork.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async delete(companyId: string, data: any): Promise<any> {
        const unitOfWork: IUnitOfWork = new UnitOfWork();

        try {
            const session = await unitOfWork.startTransaction();

            const result = await unitOfWork.companyRepository.update(companyId, data, session);
            console.log(result)
            if (result === null) return new CoreException(StatusCodeEnums.BadRequest_400, 'Company not found');

            await unitOfWork.commitTransaction();
            
            return new CreateCompanyResponse('Deleted successfull', StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            console.log('Erorr in company service');
            await unitOfWork.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async configSlot(companyId: string, slotTime: number, slot: any): Promise<ConfigSlotResponse | CoreException> {
        const session = await this.companyRepository.startTransaction();
        try {
            const queryData = {
                isDeleted: false,
                isActive: true
            }
            const slotState: string[] = Object.keys(slot);
            for (let element of slotState) {
                if (!checkValueInterviewStateEnum(element)) 
                    return new CoreException(StatusCodeEnums.BadRequest_400, `Wrong format slot, slot must be state1, state2 or state3`);
            }

            const result: any = await this.companyRepository.configSlot(companyId, queryData, session, slotTime, slot);
            await this.companyRepository.commitTransaction()
            return new ConfigSlotResponse('Config slot interview successfully', StatusCodeEnums.OK_200, result);
        }
        catch (error: any) {
            await this.companyRepository.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at configSlot in CompanyService: ${error.mesagge}`);
        }
    }
}

function removeDiacritics(input: string): string {
    const map: { [key: string]: string } = {
        'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a', 'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
        'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e', 'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o', 'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u', 'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'Á': 'A', 'À': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A', 'Ă': 'A', 'Ắ': 'A', 'Ằ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
        'Â': 'A', 'Ấ': 'A', 'Ầ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
        'É': 'E', 'È': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E', 'Ê': 'E', 'Ế': 'E', 'Ề': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
        'Í': 'I', 'Ì': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
        'Ó': 'O', 'Ò': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O', 'Ô': 'O', 'Ố': 'O', 'Ồ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
        'Ơ': 'O', 'Ớ': 'O', 'Ờ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
        'Ú': 'U', 'Ù': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U', 'Ư': 'U', 'Ứ': 'U', 'Ừ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
        'Ý': 'Y', 'Ỳ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
        'Đ': 'D', 'đ': 'd'
    };

    return input.split('').map(char => map[char] || char).join('');
}

function transformString(input: string): string {
    const noDiacritics = removeDiacritics(input);
    return noDiacritics.replace(/\s+/g, '').toLowerCase();
}

function generateRandomPassword(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }
    return result;
}
