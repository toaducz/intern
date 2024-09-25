import { Buffer } from 'buffer';
import { StatusCodeEnums } from "../../../Domain/Enums/StatusCodeEnums";
import ApplicationRepository from "../../../Infrastructure/Persistences/Respositories/ApplicationRepository";
import CVRepository from "../../../Infrastructure/Persistences/Respositories/CVRepository";
import JobRepository from "../../../Infrastructure/Persistences/Respositories/JobRepository";
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";
import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import { CoreException } from "../../Common/Exceptions/CoreException";
import IApplicationRepository from "../../Persistences/IRepositories/IApplicationRepository";
import ICVRepository from "../../Persistences/IRepositories/ICVRepository";
import IJobRepository from "../../Persistences/IRepositories/IJobRepository";
import IUserRepository from "../../Persistences/IRepositories/IUserRepository";
import IRoleRepository from "../../Persistences/IRepositories/IRoleRepository";
import IApplicationService from "../../Persistences/IServices/IApplicationService";
import { ApprovedCVResqponse } from "./Response/ApprovedCVResqponse";
import { GetAllApplicationByUserResponse } from "./Response/GetAllApplicationByUserResponse";
import { CreateApplicationResponse } from "./Response/CreateApplicationResponse";
import { DeleteApplicationResponse } from "./Response/DeleteApplicationResponse";
import { ExportCandidatesResponse } from "./Response/ExportCandidatesResponse";
import { GetAllApplicationByJobIdResponse } from "./Response/GetAllApplicationByJobIdResponse";
import { GetAllApplicationResponse } from "./Response/GetAllApplicationResponse";
import { GetApplicationResponse } from "./Response/GetApplicationResponse";
import { GetDetailApplicationResponse } from "./Response/GetDetailApplicationResponse";
import { UpdateApplicationResponse } from "./Response/UpdateApplicationResponse";
import { ChangeStatusApplicationResponse } from "./Response/ChangeStatusApplicationResponse";
import { FindApplicationResponse } from "./Response/FindApplicationResponse";
import { Workbook, Worksheet } from 'exceljs';
import { GetApplicationByCvIdResponse } from './Response/GetApplicationByCvIdResponse';


export default class ApplicationService implements IApplicationService {
    private applicationRepository: IApplicationRepository = new ApplicationRepository();
    private cvRepository: ICVRepository = new CVRepository();
    private jobRepository: IJobRepository = new JobRepository();
    private userRepository: IUserRepository = new UserRepository();
    private roleRepository: IRoleRepository = new RoleRepository();

    async createApplicationService(data: any): Promise<CreateApplicationResponse | CoreException> {
        try {
            const session = await this.applicationRepository.startTransaction();
            const { cvId, jobId, status } = data;

            const createApplicationData = {
                cvId: cvId,
                jobId: jobId, 
                status: status,
                isDelete: false,
                isActive: true,
            };

            const cvHaveBeenApplyData : any = {
                cvId: cvId, 
                jobId: jobId,
                isDeleted: false,
                isActive: true
            };
            const appWithCV: any = await this.applicationRepository.getApplicationByCVIdAndJobId(cvHaveBeenApplyData);
            if (!appWithCV || appWithCV === undefined) {
              const result: any = await this.applicationRepository.createApplication(createApplicationData, session)
              await this.applicationRepository.commitTransaction();
              return new CreateApplicationResponse("Successful", StatusCodeEnums.OK_200, result);
            }else{
              return new CoreException(StatusCodeEnums.InternalServerError_500, "You have been applied this job before");
            }
        } catch (error: any) {
            await this.applicationRepository.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

  async getApplicationService(data: any): Promise<GetApplicationResponse | CoreException> {
    try {
        const session = await this.applicationRepository.startTransaction();
        const {userId, applicationId} = data;

        const queryData = {
            _id: applicationId,
            isDeleted: false,
            isActive: true
        };

        const query: any = {
          isDeleted: false,
          isActive: true
        }


        const user: any = await this.userRepository.getUserById(userId, query);


        const role: any = await this.roleRepository.getRoleById(user.roleId, query);
        if(role.name === "Company"){
          const checkStatus: any = await this.applicationRepository.getApplicationById(queryData);
          if (!checkStatus || checkStatus === undefined) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, "Application not found!");
          }
          if(checkStatus.status !== 'Reject' && checkStatus.status !== 'Accept'){
            await this.applicationRepository.updateApplication(applicationId, {status: "Watched"}, session);
          }
        }

        const result: any = await this.applicationRepository.getApplicationById(queryData);

        if (!result || result === undefined) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, "Application not found!");
        }
        return new GetApplicationResponse("Successful", StatusCodeEnums.OK_200, result);
    } catch (error: any) {
        return new CoreException(
            StatusCodeEnums.InternalServerError_500, error.message
        );
    }
  }

  async getDetailApplicationService(data: any): Promise<GetDetailApplicationResponse | CoreException> {
    try {
        await this.applicationRepository.startTransaction();
        const {applicationId} = data;
        const queryData = {
            _id: applicationId,
            isDeleted: false,
            isActive: true
        };

        const result: any = await this.applicationRepository.getDetailApplicationById(queryData);

        if (!result || result === undefined) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, "Application not found!");
        }
        return new GetDetailApplicationResponse("Successful", StatusCodeEnums.OK_200, result);
    } catch (error: any) {
        return new CoreException(
            StatusCodeEnums.InternalServerError_500, error.message
        );
    }
  }

  async getAllApplicationService(data: any): Promise<GetAllApplicationResponse | CoreException> {
    try {
      const result: any = await this.applicationRepository.getAllApplication(data);
      await this.applicationRepository.commitTransaction();

      if (!result) {
        return new CoreException(
          StatusCodeEnums.InternalServerError_500,
          "Application is empty"
        );
      }

      return new GetAllApplicationResponse(
        "Successful",
        StatusCodeEnums.OK_200,
        result
      );
    } catch (error: any) {
      await this.applicationRepository.abortTransaction();
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        error.message
      );
    }
  }

  async updateApplicationService(applicationData: any): Promise<UpdateApplicationResponse | CoreException> {
    try {
      const session = await this.applicationRepository.startTransaction();
      const { applicationId, cvId, jobId, currentState } = applicationData;

      const updateApplicationData = { cvId, jobId, currentState };

      const result: any =
        await this.applicationRepository.updateApplication(
          applicationId,
          updateApplicationData,
          session
        );
      await this.applicationRepository.commitTransaction();

      return new UpdateApplicationResponse(
        "Successfull",
        StatusCodeEnums.OK_200,
        result
      );
    } catch (error: any) {
      await this.applicationRepository.abortTransaction();
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        error.message
      );
    }
  }

  async changeStatusApplicationService(applicationData: any): Promise<ChangeStatusApplicationResponse | CoreException> {
    try {
      const session = await this.applicationRepository.startTransaction();
      const {userId, applicationId, status} = applicationData;
      const query: any = {
        isDeleted: false,
        isActive: true
      }

      const applicationQuery: any = {
        _id: applicationId,
        ...query
      }

      const application: any | undefined = await this.applicationRepository.getApplicationById(applicationQuery);
      const job: any | undefined = await this.jobRepository.getJobById({id: application.jobId});

      const user: any = await this.userRepository.getUserById(userId, query);


      const role: any = await this.roleRepository.getRoleById(user.roleId, query);
      if(role.name !== "Company Amin" || role.name !== "Company Employee" || user.companyId !== job.companyId){
        return new CoreException(
          StatusCodeEnums.InternalServerError_500,
          "You're not have permission to to this"
        );
      }

      const result: any = await this.applicationRepository.updateApplication(applicationId, {status: status}, session);

      return new ChangeStatusApplicationResponse(
        "Successfull",
        StatusCodeEnums.OK_200,
        result
      );
    } catch (error: any) {
      await this.applicationRepository.abortTransaction();
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        error.message
      );
    }
  }

  async deleteApplicationService(data: any): Promise<DeleteApplicationResponse | CoreException> {
    try {
      const session = await this.applicationRepository.startTransaction();
      const { applicationId } = data;

      const result: any =
        await this.applicationRepository.deleteApplicationById(
          applicationId,
          session
        );
      await this.applicationRepository.commitTransaction();

      return new DeleteApplicationResponse(
        "Successful",
        StatusCodeEnums.OK_200,
        result
      );
    } catch (error: any) {
      await this.applicationRepository.abortTransaction();
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        error.message
      );
    }
  }

  async filterApplicationService(query: any): Promise<FindApplicationResponse | CoreException> {
    try {
      await this.applicationRepository.startTransaction();

      const queryData = query;

      const result: any = await this.applicationRepository.filterApplication(queryData);
      await this.applicationRepository.commitTransaction();

      return new FindApplicationResponse(
        "Successful",
        StatusCodeEnums.OK_200,
        result
      );
    } catch (error: any) {
      await this.applicationRepository.abortTransaction();
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        error.message
      );
    }
  }

  async getAllApplicationByJobIdService(data: any): Promise<GetAllApplicationByJobIdResponse | CoreException> {
    try {
      await this.applicationRepository.startTransaction();
      const applicationData : any = {
            jobId: data.jobId,
            isDeleted: false,
            isActive: true
        };

      const result: any = await this.applicationRepository.getAllApplicationByJobId(applicationData);
      await this.applicationRepository.abortTransaction();

      return new GetAllApplicationByJobIdResponse(
        "Successful",
        StatusCodeEnums.OK_200,
        result
      );
    } catch (error: any) {
      await this.applicationRepository.abortTransaction();
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        error.message
      );
    }
  }

  async getExportApplicationByJobIdService(data: any): Promise<Buffer | CoreException> {
    try {
      await this.applicationRepository.startTransaction();
      const applicationData : any = {
        jobId: data.jobId,
        isDeleted: false,
        isActive: true
      }; 
      const applications: any = await this.applicationRepository.getAllApplicationByJobId(applicationData);
      const cvIds = applications.map((app: any) => app.cvId);
      const candidates = await this.applicationRepository.getCandidatesDetails(cvIds);

      const workbook = new Workbook();
      const worksheet: Worksheet = workbook.addWorksheet('Candidates');

      worksheet.columns = [
        {header: "fullname.", key: "fullname", width: 20},
        {header: "email", key: "email", width: 25},
        {header: "phoneNumber", key: "phoneNumber", width: 15},
        {header: "cvPath", key: "cvPath", width: 20},
      ]

      candidates.forEach(candidate => {
        worksheet.addRow([candidate.fullname, candidate.email, candidate.phoneNumber, candidate.cvPath]);
      });
      
      const buffer: any = await workbook.xlsx.writeBuffer();

      await this.applicationRepository.commitTransaction();

      return buffer;
    } catch (error: any) {
      await this.applicationRepository.abortTransaction();
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        error.message
      );
    }
  }

  async getUserIDbyapplicationIdService(applicationId: string): Promise<string> {
    try{
      const result: any = await this.applicationRepository.getUserIDbyCVId(applicationId);
      return result;
    }catch (error: any) {
        throw new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }
  }

  async getApplicationByCvIdService(data: any): Promise<GetApplicationByCvIdResponse | CoreException > {
    try {
        await this.applicationRepository.startTransaction();
          const {cvId} = data;
          const queryData = {
              cvId: cvId,
              isDeleted: false,
              isActive: true
          };

          const result: any = await this.applicationRepository.getDetailApplicationByCvId(queryData);

          if (!result || result === undefined) {
              throw new CoreException(StatusCodeEnums.InternalServerError_500, "Application not found!");
          }
          return new GetApplicationByCvIdResponse("Successful", StatusCodeEnums.OK_200, result);
    } catch (error: any) {
        return new CoreException(
          StatusCodeEnums.InternalServerError_500, error.message
        );
    }
  }

  async getAllApplicationStateByUser(userId: String): Promise<GetAllApplicationByUserResponse | CoreException>{
    try{
        type jobAndState = {
            _id: string;
            jobTitle_VN: string,
            jobTitle_EN: string,
            currentState: string;
        }
        var result: jobAndState[] = [];
        const dataUser: any ={
            userId: userId,
            isDeleted: false,
            isActive: true
        }
        const cv: any = await this.cvRepository.getCVByUserId(dataUser);
        if(!cv || cv === undefined){
            return new CoreException(StatusCodeEnums.InternalServerError_500, "You haven't uploaded any CV");
        }
        const dataCv: any = {
          cvId: cv._id,
          isDeleted: cv.isDeleted,
          isActive: cv.isActive
        };
        const applicationList: any[] = await this.applicationRepository.getApplicationByCVId(dataCv);
        for(const application of applicationList){
          const job: any = await this.jobRepository.getJobById({id: application.jobId});
          result = [...result, {
              _id: application._id,
              jobTitle_VN: job.title_VN,
              jobTitle_EN: job.title_EN,
              currentState: application.currentState
          }]
        }
        if(result.length === 0){
            return new CoreException(StatusCodeEnums.InternalServerError_500, "You haven't applied any job");
        }
        return new GetAllApplicationByUserResponse("Successful", StatusCodeEnums.OK_200, result);

    }catch(error: any){
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }
  }

}
