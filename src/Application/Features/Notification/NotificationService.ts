import { CoreException } from '../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import  INotificationService from '../../Persistences/IServices/INotificationService';
import  INotificationRepository  from "../../../Application/Persistences/IRepositories/INotificationRepository";
import SocketIoController from '../../../Api/Controllers/SocketIoController';
import { createNotiResponse } from './Response/CreateNotiResponse';
import { getNotiResponse } from './Response/GetNotiResponse';
import { getNotiUserRespone } from './Response/GetNotiUserResponse';
import { deleteNotiResponse } from './Response/DeleteNotiResponse';
import { updateNotiResponse } from './Response/UpdateNotiResponse';

export default class NotificationService implements INotificationService { 

    private NotificationRepository: INotificationRepository;

    constructor(notificationRepository: INotificationRepository) {
        this.NotificationRepository = notificationRepository;
    }

    async createNotificationService(data: any): Promise<createNotiResponse | CoreException> {
        const unitOfWork: IUnitOfWork = new UnitOfWork();
        try {
            
            const session = await unitOfWork.startTransaction();  
            const result: any = await this.NotificationRepository.createNotification(data, session);
            await unitOfWork.commitTransaction()
            
            SocketIoController.sendNotification(result.title, result.message, result.userId as string);

            return new createNotiResponse('Created successful', StatusCodeEnums.Created_201, {result})

        } catch (error: any) {
            await unitOfWork.abortTransaction()
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at Service: ${error.message}`
            )
        }
    }
    async getNotifiocationByIdService(queryData: any): Promise<getNotiResponse | CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork();
        try {
            const session = await unitOfWork.startTransaction();

            const data = {
                id: queryData.notiId,
                // isDeleted: queryData.isDeleted,
            }
            const result = await this.NotificationRepository.getNotifiocationById(data);
            // console.log(data);
            if (result == null){
                return new CoreException(StatusCodeEnums.NotFound_404, `Not Found`);
            }
            await unitOfWork.commitTransaction();

            return  new getNotiResponse('Get successful', StatusCodeEnums.Created_201, {result})

        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at Service: ${error.message}`);
        }
        
    }
    async updateNotificationByIdService(notiId: string,updateData: any): Promise<updateNotiResponse | CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork()
        try {
            const session = await unitOfWork.startTransaction()

            const id = notiId;
            // console.log(_id);
            const notiNotNull = {
                id,
                isDeleted: false,
            }
            const noti = await this.NotificationRepository.getNotifiocationById(notiNotNull);

            if(noti == null){
                return new CoreException(StatusCodeEnums.NotFound_404, `Not Found`);
            }

            const data = {
                ...updateData,
                // isDeleted: false,
            };
           
            const result = await this.NotificationRepository.updateNotificationById(id,data,session)

            await unitOfWork.commitTransaction();

            return  new updateNotiResponse('Updated successful', StatusCodeEnums.Created_201, {result});

        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at Service: ${error.message}`);
        }
    }
    async deleteNotificationByIdService(notiId: string ): Promise<deleteNotiResponse | CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork()
        try {
            const session = await unitOfWork.startTransaction()

            const id = notiId;
            // console.log(_id);
            const notiNotNull = {
                id,
                isDeleted: false,
            }
            const noti = await this.NotificationRepository.getNotifiocationById(notiNotNull);

            if(noti == null){
                return new CoreException(StatusCodeEnums.NotFound_404, `Not Found`);
            }

            const data = {
                isDeleted: true,
            };
     
            const result = await this.NotificationRepository.updateNotificationById(id,data,session)

            await unitOfWork.commitTransaction();

            return  new deleteNotiResponse('(Soft) Deleted successful', StatusCodeEnums.Created_201, {});

        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at Service: ${error.message}`);
        }

    }
    async getAllNotificationByUserIdService(data: any,page:number): Promise<getNotiUserRespone | CoreException>{
        const unitOfWork: IUnitOfWork = new UnitOfWork();
        try {
            const session = await unitOfWork.startTransaction();

            const query = {...data};

            
            const result = await this.NotificationRepository.getAllNotificationByUserId(query,page);
            // console.log(result)
            if (result.length === 0) {
                throw new CoreException(StatusCodeEnums.NotFound_404, "Not Found");
            }
            await unitOfWork.commitTransaction();

            return  new getNotiUserRespone("Get User's Notification successful", StatusCodeEnums.Created_201, {result});

        } catch (error: any) {
            await unitOfWork.abortTransaction();
            return new CoreException(
                StatusCodeEnums.InternalServerError_500, `Error occured at Service: ${error.message}`);
        }
    }
}