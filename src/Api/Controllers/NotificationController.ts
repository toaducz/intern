import { Request, Response } from 'express';
import { createNotiRequest } from '../../Application/Features/Notification/Requests/CreateNotiRequest';
import { getNotiUserRequest } from '../../Application/Features/Notification/Requests/GetNotiUserRequest';
import { deleteNotiRequest } from '../../Application/Features/Notification/Requests/DeleteNotiRequest';
import { updateNotiRequest } from '../../Application/Features/Notification/Requests/UpdateNotiRequest';
import { getNotiRequest } from '../../Application/Features/Notification/Requests/GetNotiRequest';
import { StatusCodeEnums } from '../../Domain/Enums/StatusCodeEnums';
import INotificationService from '../../Application/Persistences/IServices/INotificationService';
import SocketIoController from './SocketIoController';
import NotificationService from '../../Application/Features/Notification/NotificationService';

export default class NotificationController {
    private NotificationService: INotificationService;

    constructor(notificationService: INotificationService) {
        this.NotificationService = notificationService;
        
    }

    async CreateNoti(req: Request<any, any, createNotiRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Notification']
            /*  
                #swagger.summary = 'After the notification is created, it will send realtime to the userId in the notification'
                #swagger.description = "This feature will be called automatically when there is a change in job status, candidate application status... After user successful logging in, frontend will connect to `socket io` and listen notifications event. Socket io demo clip: `https://drive.google.com/file/d/1IeGNNx8XWo7dGaP8ivS8NHuRtKY_H0OE/view?usp=sharing`"
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Add new notification with some informations',
                    schema: {
                        "userId": "666bf5e7ae57ee0d95c4f670",
                        "title": "Thông báo trúng tuyển",
                        "message": "Chúc mừng bạn đã trúng tuyển.",
                    }
                } 

                #swagger.responses[201] = {
                    description: 'Successfully',
                    schema: {
                        "statusCode": 201,
                        "data": {
                            "result": {
                                "userId": "666bf5e7ae57ee0d95c4f670",
                                "title": "Thông báo trúng tuyển",
                                "message": "Chúc mừng bạn đã trúng tuyển.",
                                "isRead": false,
                                "isDeleted": false,
                                "isActive": true,
                                "_id": "6673ceaf76e0fe4c4fa0a5af",
                                "createdAt": "2024-06-20T06:39:43.583Z",
                                "updatedAt": "2024-06-20T06:39:43.583Z",
                                "__v": 0
                            }
                        }
                    }
                }

                #swagger.responses[500] = {
                    description: 'Error',
                    schema: {
                        "statusCode": 500,
                        "message": ""
                    }      
                }
            */
            
            const notiData = req.body;
            // console.log(notiData)
            // console.log("Service result:", req.body);
            const result: any = await this.NotificationService.createNotificationService(notiData);

            if (result.statusCode === 201) {
                try{
                    await SocketIoController.sendNotification(notiData.title, notiData.message, notiData.userId);  
                }catch (error: any) {
                    return res.status(StatusCodeEnums.InternalServerError_500).json({ error:"cant send" });
                }
                
            }
            return  res.status(result.statusCode).json({ result });
        } catch (error: any) {
            
            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });
        }
    }
    async GetNotiById(req: Request<any, any, getNotiRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Notification']
            /*
                    #swagger.summary = 'Find by Id'
                    #swagger.responses[201] = {
                    description: 'Successfully',
                    schema: {
                            "message": "Get successful",
                            "statusCode": 201,
                            "data": {
                            "result": {
                                "_id": "66710240d33963fee0b14179",
                                "userId": "667152037401438f605c8ae5",
                                "title": "Thông báo trúng tuyển",
                                "message": "Chúc mừng bạn đã trúng tuyển.",
                                "isRead": true,
                                "isDeleted": false,
                                "isActive": true,
                                "createdAt": "2024-06-18T03:42:56.735Z",
                                "updatedAt": "2024-06-18T03:42:56.736Z",
                                "__v": 0
                            }
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
            const notiId = req.params.id;
            
            const queryData = {
                notiId: notiId,
                // isDeleted: false,
            }
            const result: any = await this.NotificationService.getNotifiocationByIdService(queryData);
            // console.log(result)
            return  res.status(result.statusCode).json({ result });
            
        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });
        }
    }
    async UpdateNotiById(req: Request<any, any, updateNotiRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Notification']
            /*  
                #swagger.summary = 'Update by Id'
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Update new notification with some informations',
                    schema: {
                        "title": "Thông báo KẾT QUẢ PHỎNG VẤN",
                        "message": "Chúc mừng bạn đã FAIL.",
                    }
                } 
                    #swagger.responses[201] = {
                    description: 'Successfully',
                    schema: {
                        "message": "Successfully",
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
            const notiId = req.params.id;
            const notiData = req.body;
            const result: any = await this.NotificationService.updateNotificationByIdService(notiId, notiData);
            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }
    async DeleteNotiById(req: Request<any, any, deleteNotiRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Notification']
            // #swagger.summary = 'Deleted by Id'
            /*
            #swagger.responses[201] = {
                    description: 'Successfully',
                    schema: {
                        "result": {
                            "message": "(Soft) Deleted successful",
                            "statusCode": 201,
                            "data": {}
                        }
                    }
                }
            */

            const notiId = req.params.id;

            const result: any = await this.NotificationService.deleteNotificationByIdService(notiId);

            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }

    async GetNotiByUserId(req: Request<any, any, getNotiUserRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Notification']
            // #swagger.summary = 'Status filter for notification'
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /* 
            
            #swagger.parameters['isRead'] = {
                in: 'query',
                description: 'Status filter for notification',
                type: 'string',
                enum: ['true', 'false'],
                required: false
            }
            */
            var query = {};
            const { page } = req.params;
            const userId = (req as any).user.userId;
            var  { isRead }  = req.query;
            if(isRead) {
                query = {
                    userId,
                    isRead: isRead?.toString(),
                };
            }else{
                query ={userId};
            }

            
            // console.log(userId)
            
            const result: any = await this.NotificationService.getAllNotificationByUserIdService(query,page);
            // console.log(result)
            return  res.status(result.statusCode).json({ result });
            
        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });
        }
    }

    async updateIsRead(req: Request<any, any, updateNotiRequest>, res: Response): Promise<Response> {
        try {
            // #swagger.tags = ['Notification']
             /*
            #swagger.summary = ' Update status isRead for notification'
             */
        
            const notiId = req.params.id;
            const query = {isRead: true, updateAt: Date.now()}
            const result: any = await this.NotificationService.updateNotificationByIdService(notiId, query);
            return res.status(result.statusCode).json({ result });

        } catch (error: any) {

            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: "loi o day" });

        }
    }
    async createNotificationRealtime(title: string, message: string, userId: string): Promise<void> {
        try {
            const notiData = { title, message, userId };
            const result: any = await this.NotificationService.createNotificationService(notiData);
            // console.log(result)
            if (result.statusCode === 201) {
                await SocketIoController.sendNotification(notiData.title, notiData.message, notiData.userId);
            }
        } catch (error: any) {
            console.error("Error creating notification:", error);
            throw new Error("Error creating notification");
        }
    }
}