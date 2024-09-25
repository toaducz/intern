import { createInterviewRequest } from '../../Application/Features/Interview/Requests/CreateInterviewRequest';
import { getInterviewRequest } from '../../Application/Features/Interview/Requests/GetInterviewRequest';
import { updateInterviewRequest } from '../../Application/Features/Interview/Requests/UpdateInterviewRequest';
import { deleteInterviewRequest } from '../../Application/Features/Interview/Requests/DeleteInterviewRequest';

import JobService from "../../Application/Features/Job/JobService";
import IIntervieweService from '../../Application/Persistences/IServices/IInterviewService';
import { StatusCodeEnums } from '../../Domain/Enums/StatusCodeEnums';
import { Request, Response } from 'express';
import JobRepository from "../../Infrastructure/Persistences/Respositories/JobRepository";
import { GetJobsByRoleRequest } from '../../Application/Features/Job/Requests/GetJobsByRoleRequest';
import { RoleEnums } from '../../Domain/Enums/RoleEnums';
import SocketIoController from './SocketIoController';

export default class JobController {
    private interviewService: IIntervieweService;

    constructor(interviewService: IIntervieweService) {
        this.interviewService = interviewService;
    }
    
    async CreateInterview(req: Request<any, any, createInterviewRequest>, res: Response): Promise<Response> {
        try {
             // id user login
             const userId = (req as any).user.userId; // id user login
            // #swagger.tags = ['Interview']
            
            /*  
                #swagger.summary = ' Login to create Interview'
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Add new job with some Interview',
                    schema: {
                        "applicationId": "666aa0d6f029fcd5f60eac98",
                        "interviewerId": "6673df33a08132f1ae962409",
                        "intervieweeId": "666bf5e7ae57ee0d95c4f670",
                        "interviewContent" : "Phỏng vấn ác quỷ 1 chọi 10,000 người",
                        "linkMeeting": "",
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
          
            const result: any = await this.interviewService.createInterviewService(JobData,userId);
            
            return  res.status(result.statusCode).json({ result });

        } catch (error: any) {
            
            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });
        }
    }
    async GetInterviewById(req: Request<any, any, getInterviewRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Interview']
            // #swagger.parameters['id'] = { in: 'path', schema: "667a49fe9a759d80f52a77ed", required: 'true' }
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
            const interviewId = req.params.id;
            
            const queryData = {
                interviewId: interviewId,
                isDeleted: false,
            }
            const result: any = await this.interviewService.getInterviewByIdService(queryData);
            // console.log(result)
            return  res.status(result.statusCode).json({ result });
            
        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });
        }
    }
    async UpdateInterviewById(req: Request<any, any, updateInterviewRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Interview']
            // #swagger.parameters['id'] = { in: 'path', schema: "667a49fe9a759d80f52a77ed", required: 'true' }
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /*  
                #swagger.summary = ' update by id'
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Update new Interview with some informations',
                    schema: {
                        "interviewContent": "Changed text",
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
            const result: any = await this.interviewService.updateInterviewByIdService(jobId, jobData);
            return res.status(result.statusCode).json({result  });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }
    async DeleteInterviewById(req: Request<any, any, deleteInterviewRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Interview']
            // #swagger.parameters['id'] = { in: 'path', schema: "667a49fe9a759d80f52a77ed", required: 'true' }
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

            const result: any = await this.interviewService.deleteInterviewByIdService(jobId);

            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }
}