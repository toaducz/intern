import { createJobRequest } from '../../Application/Features/Job/Requests/CreateJobRequest';
import { getJobRequest } from '../../Application/Features/Job/Requests/GetJobRequest';
import { updateJobRequest } from '../../Application/Features/Job/Requests/UpdateJobRequest';
import { deleteJobRequest } from '../../Application/Features/Job/Requests/DeleteJobRequest';
import { changeStatusApprReq } from '../../Application/Features/Job/Requests/ChangeStatusApprReq';
import { getAllJobRequest } from '../../Application/Features/Job/Requests/GetAllJobRequest';
import { searchJobRequest } from '../../Application/Features/Job/Requests/SearchJobRequest';
import { getJobByCompanyReq } from '../../Application/Features/Job/Requests/GetJobByCompanyReq';
import JobService from "../../Application/Features/Job/JobService";
import IJobService from '../../Application/Persistences/IServices/IJobService';
import { StatusCodeEnums } from '../../Domain/Enums/StatusCodeEnums';
import { Request, Response } from 'express';
import JobRepository from "../../Infrastructure/Persistences/Respositories/JobRepository";
import { GetJobsByRoleRequest } from '../../Application/Features/Job/Requests/GetJobsByRoleRequest';
import { RoleEnums } from '../../Domain/Enums/RoleEnums';
import SocketIoController from './SocketIoController';
import NotificationController from './NotificationController';

export default class JobController {
    private JobService: IJobService;
    private notificationController: NotificationController;

    constructor(jobService: IJobService,notificationController: NotificationController) {
        this.JobService = jobService;
        this.notificationController = notificationController;
    }
    
    async CreateJob(req: Request<any, any, createJobRequest>, res: Response): Promise<Response> {
        try {
            const userId = (req as any).user.userId; // id user login
            // const userId = "666aa8bb85a30ba8773965c2" //  id test 
            // console.log(userId)
            // #swagger.tags = ['Jobs']
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /*  
                #swagger.summary = ' Login to create Jobs'
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Add new job with some informations',
                    schema: {
                        "title_VN": "Thực tập sinh",
                        "position": "Thực tập",
                        "typeOfWork": "Thực tập sinh backend",
                        "occupation": "Công nghệ thông tin",
                        "major" : "Khoa học máy tính",
                        "gender" : "male",
                        "startingSalary": "1.000.000",
                        "vacanciesNum": "3",
                        "city": "Hồ Chí Minh",
                        "description_VN": "Việc nhẹ lương cao",
                        "requirement_VN": "Không cần kinh nghiệm",
                        "benefit_VN": "Kinh nghiệm",  
                    }
                } 

                #swagger.responses[201] = {
                    description: 'Successfully',
                    schema: {
                        "message": "created successfully",
                        "statusCode": 201 
                    }
                }

                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        'statusCode': 500,
                        'message': ''
                    }
                }
            */
            
            const JobData = req.body;
          
            const result: any = await this.JobService.createJobService(JobData,userId);
            
            return  res.status(result.statusCode).json({ result });

        } catch (error: any) {
            
            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });
        }
    }
    async GetJobById(req: Request<any, any, getJobRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Jobs']
            // #swagger.parameters['id'] = { in: 'path', schema: "666bba187946ff93a04a0ff6", required: 'true' }
            /*  
                #swagger.summary = ' get job by id'

                #swagger.responses[201] = {
                    description: 'Successfully',
                    schema: {
                        "message": "successfully",
                        "statusCode": 201 
                    }
                }

                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        'statusCode': 500,
                        'message': ''
                    }
                }
            */
            const jobId = req.params.id;
            
            const queryData = {
                jobId: jobId,
                isDeleted: false,
            }
            const result: any = await this.JobService.getJobByIdService(queryData);
            // console.log(result)
            return  res.status(result.statusCode).json({ result });
            
        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });
        }
    }
    async UpdateJobById(req: Request<any, any, updateJobRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Jobs']
            // #swagger.parameters['id'] = { in: 'path', schema: "666bba187946ff93a04a0ff6", required: 'true' }
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /*  
                #swagger.summary = ' update by id'
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Add new job with some informations',
                    schema: {
                        "title_VN": "Giám đốc",
                    }
                } 

                #swagger.responses[201] = {
                    description: 'Successfully',
                    schema: {
                        "message": "successfully",
                        "statusCode": 201 
                    }
                }

                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        'statusCode': 500,
                        'message': ''
                    }
                }
            */

            const jobId = req.params.id;
            const jobData = req.body;
            const result: any = await this.JobService.updateJobByIdService(jobId, jobData);
            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }
    async DeleteJobById(req: Request<any, any, deleteJobRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Jobs']
            // #swagger.parameters['id'] = { in: 'path', schema: "666bba187946ff93a04a0ff6", required: 'true' }
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /*  
            

                #swagger.responses[201] = {
                    description: 'Successfully',
                    schema: {
                        "message": "created successfully",
                        "statusCode": 201 
                    }
                }

                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        'statusCode': 500,
                        'message': ''
                    }
                }
            */
            
            const jobId = req.params.id;

            const result: any = await this.JobService.deleteJobByIdService(jobId);

            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }
    async changeStatus(req: Request<any, any, changeStatusApprReq>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Jobs']
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /* 
            #swagger.summary = 'change jobs status, send notification realtime after changed'
            #swagger.parameters['status'] = {
                in: 'query',
                description: 'Status filter for jobs',
                type: 'string',
                enum: ['pending','approved','rejected','open','closed','expired','archived'],
                required: false
            }
            */

            const jobId = req.params.id;
            const { status }  = req.query;
            const searchParams ={status: status?.toString(),jobId: jobId?.toString()};

            const result: any = await this.JobService.changeStatusService(searchParams);

            const title = "Thay đổi trạng thái";
            const message = "Trạng thái việc làm của bạn đã thay đổi thành: " + status;

            const userIds = await this.JobService.getUserIdByJobIdService(jobId);
            console.log("repo: " + userIds)
            if (userIds.length) {
                const notificationPromises = userIds.map((userId: string) => 
                    this.notificationController.createNotificationRealtime(title, message, userId)
                    
                );
    
                await Promise.all(notificationPromises);
              }
            
            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }

    async changeStatusForCompany(req: Request<any, any, changeStatusApprReq>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Jobs']
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /* 
            #swagger.summary = 'change jobs status for company, send notification realtime after changed'
            #swagger.parameters['status'] = {
                in: 'query',
                description: 'Status filter for jobs (company)',
                type: 'string',
                enum: ['open','closed'],
                required: true
            }
            */

            const jobId = req.params.id;
            const { status }  = req.query;
            const searchParams ={status: status?.toString(),jobId: jobId?.toString()};

            const result: any = await this.JobService.changeStatusService(searchParams);

            const title = "Thay đổi trạng thái";
            const message = "Trạng thái việc làm của bạn đã thay đổi thành: " + status;

            const userIds = await this.JobService.getUserIdByJobIdService(jobId);
            console.log("repo: " + userIds)
            if (userIds.length) {
                const notificationPromises = userIds.map((userId: string) => 
                    this.notificationController.createNotificationRealtime(title, message, userId)
                    
                );
    
                await Promise.all(notificationPromises);
              }
            
            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }


    async getAllJob(req: Request<any, any, getAllJobRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Jobs']
            /* 
            #swagger.summary = ' get jobs for candidate, return a list of aprroved jobs'
            #swagger.parameters['status'] = {
                in: 'query',
                description: 'get jobs for candidate',
                type: 'string',
                enum: ['approved'],
                required: true
            }
            */

            var { status }  = req.query;
            const { page } = req.params;

            const limit = 10;
            // const skip = (parseInt(page) - 1)*limit;

            var searchParams ={};
            if(status) {
                searchParams = {
                    status: status?.toString(),
                };
            }

            const result: any = await this.JobService.getAllJobService(searchParams,page);
            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }

    async getAllJobAdmin(req: Request<any, any, getAllJobRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Jobs']
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /* 
            #swagger.summary = ' get jobs for admin'
            #swagger.parameters['status'] = {
                in: 'query',
                description: 'get jobs for admin,get jobs for candidate, return a all jobs, can filter by status',
                type: 'string',
                enum: ['pending','approved','rejected','open','closed','expired','archived'],
                required: false
            }
            */

            var { status }  = req.query;

            const { page } = req.params;

            var searchParams ={};
            if(status) {
                searchParams = {
                    status: status?.toString(),
                };
            }

            const result: any = await this.JobService.getAllJobService(searchParams,page);
            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }

    async getJobByCompany(req: Request<any, any, getJobByCompanyReq>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Jobs']
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /*
            #swagger.summary = ' Get a list of jobs based on the companyId of the currently logged-in user'
            #swagger.responses[201] = {
                    description: 'Successfully',
                    "result": {
                        "message": "get jobs by company successful",
                        "statusCode": 201,
                        "data": {
                        "result": []
                        }
                    }
                }

                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        'statusCode': 500,
                        'message': ''
                    }
                }
             */
            const { page } = req.params;
            const userId = (req as any).user.userId;

            const result: any = await this.JobService.getJobByCompanyIdService(userId,page);
            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }


    async searchJob(req: Request<any, any, searchJobRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Jobs']
            // #swagger.parameters['major'] = { in: 'query', schema: "Khoa học máy tính", required: 'true' }
            // #swagger.parameters['occupation'] = { in: 'query', schema: "Công nghệ thông tin", required: 'true' }
            // #swagger.parameters['position'] = { in: 'query', schema: "Thực tập", required: 'true' }
            // #swagger.parameters['title'] = { in: 'query', schema: "Thực tập sinh", required: 'true' }
            /*
            #swagger.summary = ' Get a list of jobs according to criteria'
             */
            const { major, occupation, position, title } = req.query;

            const { page } = req.params;

            const searchParams = {
                major: major?.toString(),
                occupation: occupation?.toString(),
                position: position?.toString(),
                title: title?.toString(),
            };


            const result: any = await this.JobService.searchJobService(searchParams,page);

            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }

    async findJobs(req: Request<any, any>, res: Response): Promise<void> {
        try {
            // #swagger.tags = ['Jobs']
            // #swagger.summary = 'Find jobs'
            // #swagger.description = 'Find jobs by some infor and pagination'
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /*
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'some infor of job',
                    schema: {
                        "typeOfWork": "Thực tập sinh backend",
                        "city": "Hồ Chí Minh",
                    }
                } 

                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "message": "Change pass successfully",
                        "statusCode": 200,
                        "data": {
                            "result": [
                                {
                                    "_id": "666bba187946ff93a04a0ff6",
                                    "companyId": "666aa8bb85a30ba8773965c2",
                                    "title_VN": "Thực tập sinh",
                                    "title_EN": "",
                                    "position": "Thực tập.",
                                    "typeOfWork": "Thực tập sinh backend",
                                    "occupation": "Công nghệ thông tin",
                                    "major": "Khoa học máy tính",
                                    "gender": true,
                                    "expirationDate": "2024-06-14T03:29:42.390Z",
                                    "startingSalary": "1.000.000",
                                    "vacanciesNum": "3",
                                    "city": "Hồ Chí Minh",
                                    "district": "",
                                    "address": "",
                                    "description_VN": "Việc nhẹ lương cao",
                                    "description_EN": "",
                                    "requirement_VN": "Không cần kinh nghiệm",
                                    "requirement_EN": "",
                                    "status": "pending",
                                    "benefit_VN": "Kinh nghiệm",
                                    "benefit_EN": "",
                                    "applicationId": [
                                        "666aa0d6f029fcd5f60eac98"
                                    ],
                                    "isDeleted": false,
                                    "isActive": true,
                                    "createdAt": "2024-06-14T03:33:44.317Z",
                                    "updatedAt": "2024-06-14T03:33:44.317Z",
                                    "__v": 0
                                }
                            ]
                        }
                    }
                }
            */
            const query = req.body;
            const { page } = req.params;
            const limit = 10;

            const skip = (parseInt(page) - 1)*limit;

            const result: any = await this.JobService.findJobs(query, skip, limit);

            if (result.error != undefined || result.error) 
                res.status(result.statusCode).json({ error: result.error });

            res.status(result.statusCode).json({ data: result });
        } catch {
            res.status(StatusCodeEnums.InternalServerError_500).json({ error: 'Error at findJobs in JobController' });
        }
    }

    async getJobsByRole(req: Request<any, any, GetJobsByRoleRequest>, res: Response): Promise<void> {
        try {
            // #swagger.tags = ['Jobs']
            // #swagger.summary = 'Find jobs by role'
            // #swagger.description = 'Find jobs by role (Company find posted jobs, Candidate find applied for jobs) and pagination'
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /*
                #swagger.responses[201] = {
                    description: 'Successfully',
                    schema: {
                        "statusCode": 201,
                        "data": [
                            {
                                "_id": "666bba187946ff93a04a0ff6",
                                "title_VN": "Thực tập sinh",
                                "title_EN": "",
                                "position": "Thực tập.",
                                "typeOfWork": "Thực tập sinh backend",
                                "occupation": "Công nghệ thông tin",
                                "major": "Khoa học máy tính",
                                "gender": true,
                                "expirationDate": "2024-06-14T03:29:42.390Z",
                                "startingSalary": "1.000.000",
                                "vacanciesNum": "3",
                                "city": "Hồ Chí Minh",
                                "district": "",
                                "address": "",
                                "description_VN": "Việc nhẹ lương cao",
                                "description_EN": "",
                                "requirement_VN": "Không cần kinh nghiệm",
                                "requirement_EN": "",
                                "benefit_VN": "Kinh nghiệm",
                                "benefit_EN": ""
                            }
                        ]
                    }
                }
            */
            var userId: string = '';
            if((req as any).user?.userId) 
                userId = (req as any).user.userId;
            else
                res.status(400).json({ error: 'Please check login status'})
            
            const { page } = req.params;
            const limit = 10;

            const skip = (parseInt(page) - 1)*limit;

            const result: any = await this.JobService.getJobsByRole(userId, skip, limit);
            console.log(result)

            if (result.error != undefined || result.error) 
                res.status(result.statusCode).json({ error: result.error });

            res.status(result.statusCode).json({ data: result });
        } catch (error: any) {
            res.status(StatusCodeEnums.InternalServerError_500).json({ error: "Error at getJobsByRole" });
        }
    }
}