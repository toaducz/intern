import {IPermissionService} from "../../Persistences/IServices/IPermissionService";
import {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {CreatePermissionResponse} from "./Response/CreatePermissionResponse";
import {StatusCodeEnums} from "../../../Domain/Enums/StatusCodeEnums";
import {DeletePermissionResponse} from "./Response/DeletePermissionResponse";
import {FindPermissionResponse} from "./Response/FindPermissionResponse";
import {FindAllPermissionResponse} from "./Response/FindAllPermissionResponse";
import {CoreException} from "../../Common/Exceptions/CoreException";

export class PermissionService implements IPermissionService {
    // private permissionRepository: IPermissionRepository = new PermissionRepository();
    private unitOfWork: IUnitOfWork = new UnitOfWork();

    async create(data: any): Promise<any> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const result = await this.unitOfWork.permissionRepository.createPermission(data, session);
            await this.unitOfWork.commitTransaction();
            return new CreatePermissionResponse(
                "Create Permission Success",
                StatusCodeEnums.Created_201,
                result
            )
        } catch (error: any) {
            await this.unitOfWork.abortTransaction();
            throw new CoreException(
                StatusCodeEnums.InternalServerError_500,
                error.message
            )
        }
    }

    async delete(data: any): Promise<any> {
        try {
            const session = await this.unitOfWork.startTransaction();
            // console.log("Delete Permission by ID", data);
            const result = await this.unitOfWork.permissionRepository.deletePermissionById(data, session);
            await this.unitOfWork.commitTransaction();
            return new DeletePermissionResponse(
                "Delete Permission Success",
                StatusCodeEnums.OK_200,
                result
            )
        } catch (error: any) {
            await this.unitOfWork.abortTransaction();
            throw new CoreException(
                StatusCodeEnums.InternalServerError_500,
                error.message
            )
        }
    }

    async findAll(data: any): Promise<any> {
        try {
            const query = {
                isActive: true,
                isDeleted: false,
                ...data
            }

            const result = await this.unitOfWork.permissionRepository.getAllPermissions(data);
            return new FindAllPermissionResponse(
                "Find All Permission Success",
                StatusCodeEnums.OK_200,
                result
            )
        } catch (error: any) {
            throw new CoreException(
                StatusCodeEnums.InternalServerError_500,
                error.message
            )
        }
    }

    async findById(data: any): Promise<any> {
        try {
            const query = {
                isActive: true,
                isDeleted: false
            }


            const result = await this.unitOfWork.permissionRepository.getPermissionById(data, query);
            return new FindPermissionResponse(
                "Find Permission Success",
                StatusCodeEnums.OK_200,
                result
            )
        } catch (error: any) {
            throw new CoreException(
                StatusCodeEnums.InternalServerError_500,
                error.message
            )
        }
    }

    async update(data: any): Promise<any> {
        try {
            const session = await this.unitOfWork.startTransaction();

            const {permissionId} = data;

            //remove permissionId from data
            delete data.permissionId;

            console.log("Update Permission by ID", data);
            console.log("Permission ID", permissionId);

            const result = await this.unitOfWork.permissionRepository.updatePermissionById(permissionId, data, session);
            await this.unitOfWork.commitTransaction();
            return new CreatePermissionResponse(
                "Update Permission Success",
                StatusCodeEnums.OK_200,
                result
            )
        } catch (error: any) {
            await this.unitOfWork.abortTransaction();
            throw new CoreException(
                StatusCodeEnums.InternalServerError_500,
                error.message
            )
        }
    }
}