import { Request, Response } from "express";
import ApplicationService from "../../Application/Features/Application/ApplicationService";
import { CreateApplicationRequest } from "../../Application/Features/Application/Requests/CreateApplicationReqeuest";
import IApplicationService from "../../Application/Persistences/IServices/IApplicationService";
import { GetApplicationRequest } from "../../Application/Features/Application/Requests/GetApplicationRequest";
import { UpdateApplicationRequest } from "../../Application/Features/Application/Requests/UpdateApplicationReqeuest";
import { DeleteApplicationRequest } from "../../Application/Features/Application/Requests/DeleteApplicationReqeuest";
import { GetAllApplicationRequest } from "../../Application/Features/Application/Requests/GetAllApplicationRequest";
import { ApprovedCVRequest } from "../../Application/Features/Application/Requests/ApprovedCVRequest";
import { GetAllApplicationByJobIdReqeuest } from "../../Application/Features/Application/Requests/GetAllApplicationByJobIdReqeuest";
import { ChangeStatusApplicationRequest } from "../../Application/Features/Application/Requests/ChangeStatusApplicationRequest";
import { GetDetailApplicationRequest } from "../../Application/Features/Application/Requests/GetDetailApplicationRequest";
import { GetCandidatesByJobIdReqeuest } from "../../Application/Features/Application/Requests/GetCandidatesByJobIdReqeuest";
import { GetAllApplicationByUserRequest } from "../../Application/Features/Application/Requests/GetAllApplicationByUserRequest";
import { CoreException } from "../../Application/Common/Exceptions/CoreException";
import { ExportCandidatesResponse } from "../../Application/Features/Application/Response/ExportCandidatesResponse";

import NotificationController from './NotificationController';
import NotificationRepository from "../../Infrastructure/Persistences/Respositories/NotificationRepository";
import NotificationService from "../../Application/Features/Notification/NotificationService";
import { CVStatusEnums } from '../../Domain/Enums/CVStatusEnums';
import { GetApplicationByCvIdRequest } from "../../Application/Features/Application/Requests/GetApplicationByCvIdRequest";



export default class ApplicationController {
    // private applicationService: IApplicationService = new ApplicationService();

    private NotificationRepository = new NotificationRepository();
    private NotificationService = new NotificationService(this.NotificationRepository);
    private notificationController: NotificationController = new NotificationController(this.NotificationService);

    createApplication = async (
        req: Request<any, any, CreateApplicationRequest>,
        res: Response
    ): Promise<Response> => {
        // const applicationService: IApplicationService = new ApplicationService();
        try {
            /*
                #swagger.tags = ['Applications']
                #swagger.summary = 'Create new application'
                #swagger.description = 'Create new application with new data'
                #swagger.security = [{
                    "apiKeyAuth": []
                }]
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Add new application with some informations',
                    schema: {
                        "cvId": "6666bc65e99a8259df75f575",
                        "jobId": "JD01",
                        "status": "cv"
                    }
                } 
                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "message": "created successfully",
                        "statusCode": 200 
                    }
                }

                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        'statusCode': 500,
                        'message': 'Error'
                    }
                }
            */
            const applicationService: IApplicationService = new ApplicationService();
            const {cvId, jobId, status} = req.body;
            if(!cvId && !jobId) return res.status(400).json("Invalid CV or Job");

            const createApplicationData = {cvId, jobId, status};

            const result: any = await applicationService.createApplicationService(createApplicationData);

            return res.status(200).json(result);
            //}
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    }

    getApplication = async (
        req: Request<any, any, GetApplicationRequest>,
        res: Response
    ): Promise<Response> => {
        try {
            // #swagger.tags = ['Applications']
            // #swagger.summary = 'Get application'
            // #swagger.description = "Get Application by Id"
            
            /* 
                #swagger.security = [{
                    "apiKeyAuth": []
                }]
                #swagger.parameters['applicationId'] = {
                    in: 'path',
                    description: 'Application Id',
                    schema: {
                        "_id": "6666bc65e99a8259df75f575",
                    }
                }

            */
            
            const applicationService: IApplicationService = new ApplicationService();
            const userId: string = (req as any).user?.userId;
            const { applicationId } = req.params;
            const data: any  = {
                userId: userId,
                applicationId: applicationId
            };

            const result = await applicationService.getApplicationService(data);
            
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    }
        getDetailApplication = async (
        req: Request<any, any, GetDetailApplicationRequest>,
        res: Response
    ): Promise<Response> => {
        try {
            // #swagger.tags = ['Applications']
            // #swagger.summary = 'Get detail application'
            // #swagger.description = "Get detail about cv and user profile Application by Id"

            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }]
                #swagger.parameters['applicationId'] = {
                    in: 'path',
                    description: 'Application Id',
                    schema: {
                        "_id": "6666bc65e99a8259df75f575",
                    }
                }

            */
            
            const applicationService: IApplicationService = new ApplicationService();
            const { applicationId } = req.params;
            const data  = {applicationId};

            const result = await applicationService.getDetailApplicationService(data);
            
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    }

    getAllApplication = async (
        req: Request<any, any, GetAllApplicationRequest>,
        res: Response
    ): Promise<Response> => {
        try {
            // #swagger.tags = ['Applications']
            // #swagger.summary = 'Get All applications'
            // #swagger.description = 'Get applications have in page'
            
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
                #swagger.parameters['page'] = {
                    in: 'query',
                    description: 'page',
                    type: 'number',
                }
                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "message": "Sucessful",
                        "statusCode": 200 
                    }
                }

                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        'statusCode': 500,
                        'message': 'Error'
                    }
                }
            */
            const applicationService: IApplicationService = new ApplicationService();
            const page = req.query;
            const limit = 10;
            const query = {
                page: page,
                limit: limit
            }

            const result = await applicationService.getAllApplicationService(query);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    }

    filterGetApplication = async (
        req: Request<any, any, GetAllApplicationRequest>,
        res: Response
    ) => {
        try {
            // #swagger.tags = ['Applications']
            // #swagger.summary = 'Filter application'
            // #swagger.description = "Filter get application with Page and limit"
            /* 
                #swagger.parameters['page'] = {
                    in: 'query',
                    description: 'Page',
                    schema: {
                        "page": {
                            "type": "number",
                            "example": 1
                        },
                    }
                }
                #swagger.parameters['limit'] = {
                    in: 'query',
                    description: 'Limit',
                    schema: {
                        "limit": {
                            "type": "number",
                            "example": 3
                        },
                    }
                }
                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "message": "Filter successfully",
                        "statusCode": 200 
                    }
                }

                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        'statusCode': 500,
                        'message': 'Error'
                    }
                }
            */

            const applicationService: IApplicationService = new ApplicationService();
            
            const result = await applicationService.filterApplicationService(req.query);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    }

    updateApplication = async (
        req: Request<any, any, UpdateApplicationRequest>,
        res: Response
    ): Promise<Response> =>  {
        try {
            // #swagger.tags = ['Applications']
            // #swagger.summary = "Update application"
            // #swagger.description = "Update Application by Id and new Data"
            /*  
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Update Application with new informations',
                    schema: {
                        "cvId": "6666bc65e99a8259df75f575",
                        "jobId": "JD01",
                        "status": "state1"
                    }
                }
                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "message": "Update successfully",
                        "statusCode": 200 
                    }
                }

                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        'statusCode': 500,
                        'message': 'Error'
                    }
                }
            */
            const applicationService: IApplicationService = new ApplicationService();
            const {cvId, jobId, status} = req.body;
            const {applicationId} = req.params;
            const data = { applicationId, cvId, jobId, status };
            
            const result = await applicationService.updateApplicationService(data);

            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    }

    changeStatusApplication = async (
        req: Request<any, any, ChangeStatusApplicationRequest>,
        res: Response
    ): Promise<Response> => {
        try{
            // #swagger.tags = ['Applications']
            // #swagger.summary = 'Get application'
            // #swagger.description = "Get Application by Id and Status"

            /* 
                #swagger.security = [{
                        "apiKeyAuth": []
                }]
                #swagger.parameters['applicationId'] = {
                        in: 'path',
                        description: 'Application Id',
                        required: true,
                        type: 'string',
                }
                #swagger.parameters['status'] = {
                        in: 'query',
                        description: 'Status (Accept or Reject)',
                        required: true,
                        type: 'string',
                        enum: ['Accept', 'Reject']
                }
            */
            const userId: string = (req as any).user?.userId;
            const applicationService: IApplicationService = new ApplicationService();
            const {applicationId} = req.params;
            const {status} = req.body;

            if (!Object.values(CVStatusEnums).includes(status as any))
                return res.status(400).json('Status is invalid');

            const data = {userId, applicationId, status };
            
            const result = await applicationService.changeStatusApplicationService(data);

            const temp = await applicationService.getUserIDbyapplicationIdService(applicationId);

            const candidate = temp.toString()

            const title = "Thay đổi trạng thái";
            const message = "Trạng thái hồ sơ của bạn đã thay đổi thành: " + status;
  
            await this.notificationController.createNotificationRealtime(title, message, candidate)
                        
            return res.status(200).json(result);
        }catch(error: any) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    }

    deleteApplication = async (
        req: Request<any, any, DeleteApplicationRequest>,
        res: Response
    ): Promise<Response> => {
        try {
            // #swagger.tags = ['Applications']
            // #swagger.summary = "Delete application"
            // #swagger.description = "Delete Application by Id"
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }]
                #swagger.parameters['applicationId'] = { 
                    description: 'Application id',
                    schema: {
                    "id": "665fe8ccc5a09967910db414",
                    }
                }
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Change status',
                    schema: {
                        "status": "state1"
                    }
                }
                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "result": {
                            "message": "deleted application successfully",
                            "statusCode": 200
                        }
                    }
                }
                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        "result": {
                            "statusCode": 500,
                            "message": "Error"
                        }
                    }
                }
            
            */
            const applicationService: IApplicationService = new ApplicationService();
            const {applicationId } = req.params;
            const data = {applicationId};

            const result = await applicationService.deleteApplicationService(data);
            
            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    }

    getAllApplicationByJobId = async (
        req: Request<any, any, GetAllApplicationByJobIdReqeuest>,
        res: Response): Promise<Response> => {
            try {
                // #swagger.tags = ['Applications']
                // #swagger.summary = "Get Application by Job Id"
                // #swagger.description = "API for getting application by using job id"

                /* 
                   #swagger.parameters['jobId'] = { 
                        description: 'job id',
                        schema: {
                        "id": "666bba927946ff93a04a0ff8",
                        }
                    }
                    #swagger.responses[200] = {
                        description: 'Successfully',
                        schema: {
                            "result": {
                                "message": "Get application successfully",
                                "statusCode": 200
                            }
                        }
                    }
                    #swagger.responses[500] = {
                        description: 'Error',
                        schema: {
                            "result": {
                                "statusCode": 500,
                                "message": "Error"
                            }
                        }
                    } 
                */
                const applicationService: IApplicationService = new ApplicationService();
                const {jobId } = req.params;
                const data = {jobId};

                const result = await applicationService.getAllApplicationByJobIdService(data);
                return res.status(200).json(result);
            } catch (error: any) {
                console.error(error);
                return res.status(500).json({message: error.message});
            }
        }

    getExportApplicationByJobId = async (
        req: Request<any, any, GetCandidatesByJobIdReqeuest>,
        res: Response): Promise<Response> => {
            try {
                // #swagger.tags = ['Applications']
                // #swagger.summary = "Export Excel All Candidates by Job Id"
                // #swagger.description = "API for getting candidates by using job id and export to excel"
                /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }]
                */
                /* 
                   #swagger.parameters['jobId'] = { 
                        description: 'job id',
                        schema: {
                        "id": "666bba927946ff93a04a0ff8",
                        }
                    }
                    #swagger.responses[200] = {
                        description: 'Successfully',
                        schema: {
                            "result": {
                                "message": "Get application successfully",
                                "statusCode": 200
                            }
                        }
                    }
                    #swagger.responses[500] = {
                        description: 'Error',
                        schema: {
                            "result": {
                                "statusCode": 500,
                                "message": "Error"
                            }
                        }
                    } 
                */

                const applicationService: IApplicationService = new ApplicationService();
                const {jobId } = req.params;
                const data = {jobId};
                
                const result = await applicationService.getExportApplicationByJobIdService(data);

                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=candidates.xlsx'); 

                return res.status(200).send(result);      
            } catch (error: any) {
                console.error(error);
                return res.status(500).json({message: error.message});
            }
    }

    getApplicationByCvId = async (
        req: Request< any, any, GetApplicationByCvIdRequest>,
        res: Response
    ): Promise<Response> => {
        try {
            // #swagger.tags = ['Applications']
            // #swagger.summary = "Get Application By Cv Id"
            // #swagger.description = "API for getting candidates profile by using cv ID"
            /*
            #swagger.security = [{
                "apiKeyAuth": []
            }]
            */
            /* 
                #swagger.parameters['cvId'] = { 
                    description: 'cvId id',
                    schema: {
                    "id": "6673fa762aee7010d9cf309e",
                    }
                }
                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "result": {
                            "message": "Get application successfully",
                            "statusCode": 200
                        }
                    }
                }
                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        "result": {
                            "statusCode": 500,
                            "message": "Error"
                        }
                    }
                } 
            */
            const applicationService: IApplicationService = new ApplicationService();
            const {cvId } = req.params;
            const data = {cvId};

            const result = await applicationService.getApplicationByCvIdService(data);

            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    }
    
    getAllApplicationState = async (req: Request<any, any, GetAllApplicationByUserRequest>, res: Response): Promise<Response> =>{
        const applicationService: IApplicationService = new ApplicationService();
        try{
            // #swagger.tags = ['Applications']
            // #swagger.summary = "Get all applications by user"
            // #swagger.description = "API to get all the applications that the user has applied for and its current status"
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }]  
                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "message": "Successful",
                        "statusCode": 200,
                        "data": [{
                            "_id": "666aa0d6f029fcd5f60eac98",
                            "jobTitle_VN": "Thực tập sinh",
                            "jobTitle_EN": "",
                            "currentState": "cv"
                        }]
                    }
                }
            */
            const userId: string = (req as any).user?.userId;
            const result: any = await applicationService.getAllApplicationStateByUser(userId);
            return res.status(200).json(result);
        }catch(error: any){
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    }

    // approvedCV = async (
    //     req: Request<any, any, ApprovedCVRequest>,
    //     res: Response
    // ) => {
    //     try {
    //         // #swagger.tags = ['Applications']
    //         // #swagger.summary = "Approved application"
    //         // #swagger.description = "Approved application which can change next state"
    //         /* 
    //             #swagger.parameters['body'] = {
    //                 in: 'body',
    //                 description: 'Change state',
    //                 schema: {
    //                     "status": "state1"
    //                 }
    //             }     
    //             #swagger.responses[200] = {
    //                 description: 'Successfully',
    //                 schema: {
    //                     "result": {
    //                         "message": "Approved application successfully",
    //                         "statusCode": 200
    //                     }
    //                 }
    //             }
    //             #swagger.responses[500] = {
    //                 description: 'Error',
    //                 schema: {
    //                     "result": {
    //                         "statusCode": 500,
    //                         "message": "Error"
    //                     }
    //                 }
    //             }
            
    //         */
    //         const applicationService: IApplicationService = new ApplicationService();
    //         const {applicationId} = req.params;
    //         const {isApproved} = req.body;
            
    //         const data = {applicationId, isApproved};
    //         // console.log(data);

    //         const result = await applicationService.approvedCVService(data);
            
    //         return res.status(200).json(result);
    //     } catch (error: any) {
    //         console.error(error);
    //         return res.status(500).json({message: error.message});
    //     }
    // }

    // watchApplication = async (
    //     req: Request<any, any, WatchApplicationRequest>,
    //     res: Response
    // ) => {
    //     try {
    //         const applicationService: IApplicationService = new ApplicationService();
    //         const { applicationId } = req.params;
    //         const data = { applicationId };

    //         const result = await applicationService.watchCVFromApplicationService(data);
    //         return res.status(200).json(result);
    //     } catch (error: any) {
    //         console.error(error);
    //         return res.status(500).json({message: error.message});
    //     }
    // }
}