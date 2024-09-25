import ICertificateService from "../../Persistences/IServices/ICertificateService";

import { StatusCodeEnums } from '../../../Domain/Enums/StatusCodeEnums';
import { CoreException } from '../../Common/Exceptions/CoreException';

import { CreateCertificateResponse } from "./Responses/CreateCertificateResponse";
import { GetCertificateResponse } from "./Responses/GetCertificateResponse";
import { GetAllCertificateResponse } from "./Responses/GetAllCertificateResponse";
import { UpdateCertificateResponse } from "./Responses/UpdateCertificateResponse";
import { DeleteCertificateResponse } from "./Responses/DeleteCertificateResponse";

import ICertificateRepository from "../../Persistences/IRepositories/ICertificateRepository";
import CertificateRepository from "../../../Infrastructure/Persistences/Respositories/CertificateRepository";

import IUserRepository from "../../Persistences/IRepositories/IUserRepository";
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";

export default class CertificateService implements ICertificateService{

    private certificateRepository: ICertificateRepository = new CertificateRepository();
    private userRepository : IUserRepository = new UserRepository()

    async createNewCertificate(data:any): Promise<CreateCertificateResponse|CoreException>{
        try {
            const {name, type, description, userId, fileURL, issueDate, expiryDate} = data;
            const createCertificateData: any = {
                name: name,
                type: type,
                description: description,
                userId: userId,
                fileURL: fileURL,
                issueDate: issueDate,
                expiryDate: expiryDate
            };
            const findUser: any = {
                isDeleted: false,
                isActive: true
            }
            const userProfile: any = await this.userRepository.getUserById(userId, findUser);
            if (!userProfile) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "User Id not found!");
            }
            const result: any = await this.certificateRepository.createCertificate(createCertificateData);
            await this.certificateRepository.commitTransaction();
          
            return new CreateCertificateResponse("Successful", StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.certificateRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async getCertificateById(_id: string): Promise<GetCertificateResponse|CoreException>{
        try {
            await this.certificateRepository.startTransaction();
            const certificateData: any = {
                _id: _id,
                isDeleted: false,
                isActive: true,
            }
            const certificate: any | undefined = await this.certificateRepository.getCertificateById(certificateData);
            if (!certificate || certificate === undefined) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "Certificate not found!");
            }
            return new GetCertificateResponse("Get certificate successful", StatusCodeEnums.OK_200, certificate);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
        }
    }

    async getAllCertificateByUserId(userId: string): Promise<GetAllCertificateResponse|CoreException>{
        try {
            await this.certificateRepository.startTransaction();
            const certificateData: any = {
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
            const certificate: any | undefined = await this.certificateRepository.getAllCertificateByUserId(certificateData);
            if (!certificate || certificate === undefined) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "This account has not uploaded any certificates yet");
            }
            return new GetAllCertificateResponse("Get all certificate by user id successful", StatusCodeEnums.OK_200, certificate);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
        }
    }

    async getAllCertificate(): Promise<GetAllCertificateResponse|CoreException>{
        try {
            await this.certificateRepository.startTransaction();
            const certificate: any = await this.certificateRepository.getAllCertificate();
            if (!certificate || certificate === undefined) {
                throw new CoreException(StatusCodeEnums.InternalServerError_500, "Cound not found any Certificate!");
            }
            return new GetAllCertificateResponse("Get All certificates successful", StatusCodeEnums.OK_200, certificate);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
        }
    }

    async updateCertificateById(_id: string, data:any): Promise<UpdateCertificateResponse|CoreException>{
        try {
            const certificateData: any = {
                _id: _id,
                isDeleted: false,
                isActive: true,
            }
            const certificate: any = await this.certificateRepository.getCertificateById(certificateData);
            if (!certificate) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "Certificate not found!");
            }
            
            const certificateUpdateData: any = {
                ...data,
                updatedAt: Date.now()
            };
            console.log(certificateUpdateData);
            const result: any = await this.certificateRepository.updateCertificateById(certificateData, certificateUpdateData);
            await this.certificateRepository.startTransaction();

            return new UpdateCertificateResponse("Update certificate successfully!", 200, result);
        } catch (error: any) {
            await this.certificateRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async deleteCertificateById(_id: string): Promise<DeleteCertificateResponse|CoreException>{
        try {
            const certificateData: any = {
                _id: _id,
                isDeleted: false,
                isActive: true,
            }
            const certificate: any = await this.certificateRepository.getCertificateById(certificateData);
            if (!certificate) {
                throw new CoreException(StatusCodeEnums.InternalServerError_500, "Certificate not found!");
            }
    
            const result: any = await this.certificateRepository.deleteCertificateById(certificateData);
            await this.certificateRepository.startTransaction();

            return new DeleteCertificateResponse("Delete certificate successfully!", 200, result);
        } catch (error: any) {
            await this.certificateRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }
}