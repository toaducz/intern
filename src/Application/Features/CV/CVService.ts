import ICVService from "../../Persistences/IServices/ICVService";

import { StatusCodeEnums } from '../../../Domain/Enums/StatusCodeEnums';
import { CoreException } from '../../Common/Exceptions/CoreException';

import { CreateCVResponse } from "./Responses/CreateCVResponse";
import { GetCVResponse } from "./Responses/GetCVResponse";
import { GetAllCVResponse } from "./Responses/GetAllCVResponse";
import { UpdateCVResponse } from "./Responses/UpdateCVResponse";
import { DeleteCVResponse } from "./Responses/DeleteCVResponse";

import ICVRepository from "../../Persistences/IRepositories/ICVRepository";
import CVRepository from "../../../Infrastructure/Persistences/Respositories/CVRepository";

import IUserRepository from "../../Persistences/IRepositories/IUserRepository";
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";

export default class CVService implements ICVService{

    private cvRepository: ICVRepository = new CVRepository();
    private userRepository : IUserRepository = new UserRepository()

    async createNewCV(data:any): Promise<CreateCVResponse|CoreException>{
        try {
            const {userId, cvPath} = data;
            const cvData: any = {
                userId: userId,
                isDeleted: false,
                isActive: true,
            };
            if(userId === undefined){
                return new CoreException(StatusCodeEnums.InternalServerError_500, "You need to login before uploading your CV");
            }
            const findUser: any = {
              isDeleted: false,
              isActive: true
            }
            const userProfile: any = await this.userRepository.getUserById(userId, findUser);
            if (!userProfile) {
              return new CoreException(StatusCodeEnums.InternalServerError_500, "User Id not found!");
            }
            const cvExist: any | undefined = await this.cvRepository.getCVByUserId(cvData);
            if(cvExist){
                return new CoreException(StatusCodeEnums.InternalServerError_500, "This user have been upload a CV, If you wanna change your CV, please update your CV");
            }
            const createCVData: any = {
                userId: userId,
                cvPath: cvPath,
                isDeleted: false,
                isActive: true,
                isApproved: false
            };

            const result: any = await this.cvRepository.createCV(createCVData);
            await this.cvRepository.commitTransaction();
          
            return new CreateCVResponse("Successful", StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.cvRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async getCVById(_id: string): Promise<GetCVResponse|CoreException>{
        try {
            await this.cvRepository.startTransaction();
            const cvData: any = {
                _id: _id,
                isDeleted: false,
                isActive: true,
            }
            const cv: any | undefined = await this.cvRepository.getCVById(cvData);
            if (!cv || cv === undefined) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "CV not found!");
            }
            return new GetCVResponse("Get CV successful", StatusCodeEnums.OK_200, cv);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
        }
    }

    async getCVByUserId(userId: string): Promise<GetCVResponse|CoreException>{
        try {
            await this.cvRepository.startTransaction();
            const cvData: any = {
                userId: userId,
                isDeleted: false,
                isActive: true,
            }
            const findUser: any = {
                isDeleted: false,
                isActive: true
            }
            const userProfile: any = await this.userRepository.getUserById(userId, findUser);
            if (!userProfile) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "User Id not found!");
            }
            const cv: any | undefined = await this.cvRepository.getCVByUserId(cvData);
            if (!cv || cv === undefined) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "This account has not uploaded any CV yet");
            }
            return new GetCVResponse("Get CV successful", StatusCodeEnums.OK_200, cv);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
        }
    }

    async getAllCV(): Promise<GetAllCVResponse|CoreException>{
        try {
            await this.cvRepository.startTransaction();
            const cv: any = await this.cvRepository.getAllCV();
            if (!cv || cv === undefined) {
                throw new CoreException(StatusCodeEnums.InternalServerError_500, "Cound not found any CV!");
            }
            return new GetAllCVResponse("Get All CV successful", StatusCodeEnums.OK_200, cv);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
        }
    }

    async updateCVById(_id: string, data:any): Promise<UpdateCVResponse|CoreException>{
        try {
            const cvData: any = {
                _id: _id,
                isDeleted: false,
                isActive: true,
            }
            const cv: any = await this.cvRepository.getCVById(cvData);
            if (!cv) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "CV not found!");
            }
    
            const cvUpdateData: any = {
                ...data,
                updatedAt: Date.now()
            };
            const result: any = await this.cvRepository.updateCVById(cvData, cvUpdateData);
            await this.cvRepository.startTransaction();

            return new UpdateCVResponse("Update CV successfully!", 200, result);
        } catch (error: any) {
            await this.cvRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async deleteCVById(_id: string): Promise<DeleteCVResponse|CoreException>{
        try {
            const cvData: any = {
                _id: _id,
                isDeleted: false,
                isActive: true,
            }
            const cv: any = await this.cvRepository.getCVById(cvData);
            if (!cv) {
                throw new CoreException(StatusCodeEnums.InternalServerError_500, "CV not found!");
            }
    
            const result: any = await this.cvRepository.deleteCVById(cvData);
            await this.cvRepository.startTransaction();

            return new DeleteCVResponse("Delete CV successfully!", 200, result);
        } catch (error: any) {
            await this.cvRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }
}