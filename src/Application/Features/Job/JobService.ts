import { createJobResponse } from './Response/CreateJobResponse';
import { getJobResponse } from './Response/GetJobResponse';
import { updateJobResponse } from './Response/UpdateJobResponse';
import { deleteJobResponse } from './Response/DeleteJobResponse';
import { changeStatusApprRes } from './Response/ChangeStatusApprRes';
import { getAllJobResponse } from './Response/GetAllJobResponse';
import { searchJobResponse } from './Response/SearchJobResponse';
import { getJobByCompanyIdRes } from './Response/GetJobByCompanyIdRes';
import { CoreException } from '../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../Domain/Enums/StatusCodeEnums';
import { JobStatusEnums } from '../../../Domain/Enums/JobStatusEnums';
import { IUnitOfWork } from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import  IJobRepository  from "../../../Application/Persistences/IRepositories/IJobRepository";
import JobRepository from '../../../Infrastructure/Persistences/Respositories/JobRepository';
import IJobService from '../../Persistences/IServices/IJobService';
import { GetJobsOfCompanyResponse } from './Response/GetJobsOfCompanyResponse';
import { GetJobsOfCandidateResponse } from './Response/GetJobsOfCandidateResponse';
import { RoleWithBase } from '../../../Domain/Entities/RoleEntities';

export default class JobService implements IJobService {
    private JobRepository: IJobRepository;

    constructor(jobRepository: IJobRepository) {
        this.JobRepository = jobRepository;
    }

    async createJobService(data: any,userId:string): Promise<createJobResponse | CoreException> {
        const unitOfWork: IUnitOfWork = new UnitOfWork();
        try {
            
            const session = await unitOfWork.startTransaction();
        
            const result = await this.JobRepository.createJob(data,userId, session);
            await unitOfWork.commitTransaction()

            return new createJobResponse('Created successful', StatusCodeEnums.Created_201, {result})

        } catch (error: any) {
            await unitOfWork.abortTransaction()
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at JobService: ${error.message}`
            )
        }
    }
    async getJobByIdService(queryData: any): Promise<getJobResponse | CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork();
        try {
            const session = await unitOfWork.startTransaction();

            const data = {
                id: queryData.jobId,
                // isDeleted: queryData.isDeleted,
            }
            const result = await this.JobRepository.getJobById(data);
            // console.log(data);
            if (result == null){
                return new CoreException(StatusCodeEnums.NotFound_404, `Not Found`);
            }
            await unitOfWork.commitTransaction();

            return  new getJobResponse('Get successful', StatusCodeEnums.Created_201, {result})

        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at JobService: ${error.message}`);
        }
        
    }
    async updateJobByIdService(jobId: string,updateData: any): Promise<updateJobResponse | CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork()
        try {
            const session = await unitOfWork.startTransaction()

            const id = jobId;
            // console.log(_id);
            const jobNotNull = {
                id,
                isDeleted: false,
            }
            const job = await this.JobRepository.getJobById(jobNotNull);

            if(job == null){
                return new CoreException(StatusCodeEnums.NotFound_404, `Not Found`);
            }

            const data = {
                ...updateData,
                // isDeleted: false,
            };
            
            const result = await this.JobRepository.updateJobById(id,data,session)

            await unitOfWork.commitTransaction();

            return  new updateJobResponse('Updated successful', StatusCodeEnums.Created_201, {result});

        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at JobService: ${error.message}`);
        }
    }
    async deleteJobByIdService(jobId: string ): Promise<deleteJobResponse | CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork()
        try {
            const session = await unitOfWork.startTransaction()

            const id = jobId;
            // console.log(_id);
            const jobNotNull = {
                id,
                isDeleted: false,
            }
            const job = await this.JobRepository.getJobById(jobNotNull);

            if(job == null){
                return new CoreException(StatusCodeEnums.NotFound_404, `Not Found or Deleted `);
            }

            const data = {
                isDeleted: true,
            };
     
            const result = await this.JobRepository.updateJobById(id,data,session)

            await unitOfWork.commitTransaction();

            return  new deleteJobResponse('(Soft) Deleted successful', StatusCodeEnums.Created_201, {});

        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at JobService: ${error.message}`);
        }
    }
    async changeStatusService(data: any): Promise<changeStatusApprRes | CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork()
        try {
            const session = await unitOfWork.startTransaction()

            const id = data.jobId;
            // console.log(_id);
            const jobNotNull = {
                id,
                isDeleted: false,
            }
            const job = await this.JobRepository.getJobById(jobNotNull);

            if(job == null){
                return new CoreException(StatusCodeEnums.NotFound_404, `Not Found or Deleted`);
            }
            const query = {
                status: data.status,
            } 
            const result = await this.JobRepository.updateJobById(id,query,session)

            await unitOfWork.commitTransaction();

            return new changeStatusApprRes('status changed', StatusCodeEnums.Created_201, {result});

        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at JobService: ${error.message}`);
        }
    }


    async getAllJobService(data:any,page:number): Promise<getAllJobResponse|CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork()
        try {
            const session = await unitOfWork.startTransaction();

            
            const result: any = await this.JobRepository.getAllJob(data,page,session);
            if (result.length === 0) {
                throw new CoreException(StatusCodeEnums.NotFound_404, "Not Found");
            }

            return new getAllJobResponse('get all successful', StatusCodeEnums.Created_201, {result});
        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at JobService: ${error.message}`);
        }
    }
    async getJobByCompanyIdService(userID: string,page:number): Promise<getJobByCompanyIdRes|CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork()
        try {
            const session = await unitOfWork.startTransaction();
            const userId = userID;
            const result: any = await this.JobRepository.getJobByCompanyId(userId,page,session);
            if (!result || result === undefined) {
                throw new CoreException(StatusCodeEnums.NotFound_404, "Not Found");
            }

            return new getJobByCompanyIdRes('get jobs by company successful', StatusCodeEnums.Created_201, {result});
        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at JobService: ${error.message}`);
        }
    }
    
    async searchJobService(data :any,page:number): Promise<searchJobResponse|CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork()
        try {
            const session = await unitOfWork.startTransaction();
    
            const result: any = await this.JobRepository.searchJob(data,page,session);
            if (result.length === 0) {
                throw new CoreException(StatusCodeEnums.NotFound_404, "Not Found");
            }
            return new searchJobResponse('Searching Successful', StatusCodeEnums.Created_201, {result});
        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at JobService: ${error.message}`);
        }

    }

    async findJobs(queryData: any, skip: number, limit: number): Promise<getAllJobResponse | CoreException> {
        const unitOfWork: IUnitOfWork = new UnitOfWork();

        try {
            await unitOfWork.startTransaction();

            const result: any = await this.JobRepository.findJobs(queryData, skip, limit);
            if (!result || result === undefined)
                throw new CoreException(StatusCodeEnums.InternalServerError_500, 'No suitable jobs found');

            return new getAllJobResponse('Successful', StatusCodeEnums.Created_201, { result });
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
        }
    }

    async getJobsByRole(userId: string, skip: number, limit: number): Promise<any> {
        const unitOfWork: IUnitOfWork = new UnitOfWork();

        try {
            await unitOfWork.startTransaction();

            const queryData = {
                isDeleted: false,
                isActive: true
            };

            const user = await unitOfWork.userRepository.getUserById(userId, queryData);
            if (!user)
                return new CoreException(StatusCodeEnums.BadRequest_400, 'User is not found!');

            const role: any = await unitOfWork.roleRepository.getRoleById(user.roleId, queryData);

            let query: any = {}
            if (role.name === 'Company') {
                query = {
                    companyId: userId
                }
            } else if (role.name === 'Candidate') {
                // get cv id by userId
                const cvId = '666bdb56a55c538a68b6bff1';
                // get application id by cvid
                const applicationId = '666aa0d6f029fcd5f60eac98';

                query = {
                    applicationId: applicationId
                }
            } else {
                throw new Error('Role must me Company or Candidate')
            }

            const result: any = await unitOfWork.JobRepository.findJobs(query, skip, limit);
            console.log(result)
            if (!result || result === undefined)
                throw new CoreException(StatusCodeEnums.InternalServerError_500, 'No suitable jobs found');

            if (role.name === 'Company') return new GetJobsOfCompanyResponse('Successful', StatusCodeEnums.Created_201, result);
            else return new GetJobsOfCandidateResponse('Successful', StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
        }
    }
    async getUserIdByJobIdService(jobId: string): Promise<string[]> {

        const result: any = await this.JobRepository.getUserIdbyJobId(jobId);

        return result;

    } catch (error: any) {
        throw new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }

}