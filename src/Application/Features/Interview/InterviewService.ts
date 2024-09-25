import { createInterviewResponse } from './Response/CreateInterviewResponse';
import { getInterviewByIdResponse } from './Response/GetInterviewByIdResponse';
import { deleteInterviewByIdResponse } from './Response/DeleteInterviewByIdResponse';
import { updateInterviewByIdResponse } from './Response/UpdateInterviewByIdResponse';

import { UnitOfWork } from '../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";
import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import ApplicationRepository from "../../../Infrastructure/Persistences/Respositories/ApplicationRepository";

import { StatusCodeEnums } from '../../../Domain/Enums/StatusCodeEnums';
import { JobStatusEnums } from '../../../Domain/Enums/JobStatusEnums';
import { IUnitOfWork } from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import  IUserRepository  from "../../../Application/Persistences/IRepositories/IUserRepository";
import  IInterviewRepository  from "../../../Application/Persistences/IRepositories/IInterviewRepository";
import  IRoleRepository  from "../../../Application/Persistences/IRepositories/IRoleRepository";
import  IApplicatioRepository  from "../../../Application/Persistences/IRepositories/IApplicationRepository";
import  IJobRepository  from "../../../Application/Persistences/IRepositories/IJobRepository";

import JobRepository from '../../../Infrastructure/Persistences/Respositories/JobRepository';
import IInterviewService from '../../Persistences/IServices/IInterviewService';
import { CoreException } from '../../Common/Exceptions/CoreException';
import { RoleWithBase } from '../../../Domain/Entities/RoleEntities';
import { compareSync } from 'bcryptjs';

export default class InterviewService implements IInterviewService {
    private InterviewRepository: IInterviewRepository;
    private userRepository: IUserRepository = new UserRepository();
    private JobRepository: IJobRepository = new JobRepository();
    private ApplicationRepository: IApplicatioRepository = new ApplicationRepository();

    constructor(interviewRepository: IInterviewRepository) {
        this.InterviewRepository = interviewRepository;
    }

    async createInterviewService(data: any,userId:string): Promise<createInterviewResponse | CoreException> {
        const unitOfWork: IUnitOfWork = new UnitOfWork();
        try {
            
            const session = await unitOfWork.startTransaction();

            const query: any = {
                isDeleted: false,
                isActive: true
              }
            
            const tempData = {_id:data.applicationId,isDeleted: false,isActive: true};

            const app: any = await this.ApplicationRepository.getApplicationById(tempData);
            if(!app){
                return new CoreException(StatusCodeEnums.InternalServerError_500 , `Application not found`);
            }
  
            const jobId = app.jobId;
            

            const job: any = await this.JobRepository.getJobById({id:jobId}); 
            if(!job){
                return new CoreException(StatusCodeEnums.InternalServerError_500 , `Job not found`);
            }

            const user: any = await this.userRepository.getUserById(userId,query);
            if(!user){
                return new CoreException(StatusCodeEnums.InternalServerError_500 , `user not found`);
            }
                       
            if(user.companyId.toString() !== job.companyId.toString()){
                return new CoreException(StatusCodeEnums.InternalServerError_500 , `You have no permission`);
            }

            data.companyId = job.companyId.toString();

            const result = await this.InterviewRepository.createInterview(data, session);
            await unitOfWork.commitTransaction()

            return new createInterviewResponse('Created successful', StatusCodeEnums.Created_201, {result})

        } catch (error: any) {
            await unitOfWork.abortTransaction()
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at interviewService: ${error.message}`
            )
        }
    }
    async getInterviewByIdService(queryData: any): Promise<getInterviewByIdResponse | CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork();
        try {
            const session = await unitOfWork.startTransaction();

            const data = {
                id: queryData.interviewId,
                // isDeleted: queryData.isDeleted,
            }
            const result = await this.InterviewRepository.getInterviewById(data);
            // console.log(data);
            if (result == null){
                return new CoreException(StatusCodeEnums.NotFound_404, `Not Found`);
            }
            await unitOfWork.commitTransaction();

            return  new getInterviewByIdResponse('Get successful', StatusCodeEnums.Created_201, {result})

        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at JobService: ${error.message}`);
        }
        
    }
    async updateInterviewByIdService(jobId: string,updateData: any): Promise<updateInterviewByIdResponse | CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork()
        try {
            const session = await unitOfWork.startTransaction()

            const id = jobId;
            // console.log(_id);
            const jobNotNull = {
                id,
                isDeleted: false,
            }
            const job = await this.InterviewRepository.getInterviewById(jobNotNull);

            if(job == null){
                return new CoreException(StatusCodeEnums.NotFound_404, `Not Found`);
            }

            const data = {
                ...updateData,
                // isDeleted: false,
            };
            
            const result = await this.InterviewRepository.updateInterviewById(id,data,session)

            await unitOfWork.commitTransaction();

            return  new updateInterviewByIdResponse('Updated successful', StatusCodeEnums.Created_201, {result});

        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at interviewService: ${error.message}`);
        }
    }
    async deleteInterviewByIdService(jobId: string ): Promise<deleteInterviewByIdResponse | CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork()
        try {
            const session = await unitOfWork.startTransaction()

            const id = jobId;
            // console.log(_id);
            const jobNotNull = {
                id,
                isDeleted: false,
            }
            const job = await this.InterviewRepository.getInterviewById(jobNotNull);

            if(job == null){
                return new CoreException(StatusCodeEnums.NotFound_404, `Not Found or Deleted `);
            }

            const data = {
                isDeleted: true,
            };
     
            const result = await this.InterviewRepository.updateInterviewById(id,data,session)

            await unitOfWork.commitTransaction();

            return  new deleteInterviewByIdResponse('(Soft) Deleted successful', StatusCodeEnums.Created_201, {});

        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at JobService: ${error.message}`);
        }
    }
}