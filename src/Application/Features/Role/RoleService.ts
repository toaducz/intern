import IRoleService from "../../Persistences/IServices/IRoleService";
import {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork";
import {UnitOfWork} from "../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import {CoreException} from "../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../Domain/Enums/StatusCodeEnums";
import {CreateRoleResponse} from "./Response/CreateRoleResponse";
import {FindRoleResponse} from "./Response/FindRoleResponse";
import {RoleWithBase} from "../../../Domain/Entities/RoleEntities";
import {FindAllRoleResponse} from "./Response/FindAllRoleResponse";
import {UpdateRoleResponse} from "./Response/UpdateRoleResponse";
import {DeleteRoleResponse} from "./Response/DeleteRoleResponse";
import {ClaimPermissionResponse} from "./Response/ClaimPermissionResponse";

export default class RoleService implements IRoleService {
    // private roleRepository: IRoleRepository = new RoleRepository();
    private unitOfWork: IUnitOfWork = new UnitOfWork();


    async create(data: any): Promise<any> {
        // console.log("Create @", data);

        try {
            // console.log("data", data);
            const session = await this.unitOfWork.startTransaction();

            const result = await this.unitOfWork.roleRepository.createRole(data, session);

            await this.unitOfWork.commitTransaction();
            return new CreateRoleResponse(
                "Create Role Success",
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

    async findById(data: any): Promise<any> {
        // const unitOfWork: IUnitOfWork = new UnitOfWork();
        try {
            // const session = await unitOfWork.startTransaction();

            // console.log("Find by Id data:", data);

            const {roleId} = data;

            const query = {
                isActive: true,
                isDeleted: false
            }

            const result: typeof RoleWithBase | null = await this.unitOfWork.roleRepository.getRoleById(roleId, query);
            // await unitOfWork.commitTransaction();
            if (result == null) {
                return new CoreException(
                    StatusCodeEnums.NotFound_404,
                    "Role not found"
                )
            }
            return new FindRoleResponse(
                "Find Role Success",
                StatusCodeEnums.OK_200,
                result
            )

        } catch (error: any) {
            // await unitOfWork.abortTransaction();
            throw new CoreException(
                StatusCodeEnums.InternalServerError_500,
                error.message
            )
        }
    }

    async findAll(data: any): Promise<any> {
        // const unitOfWork: IUnitOfWork = new UnitOfWork();
        try {
            // const session = await unitOfWork.startTransaction();

            const query = {
                isActive: true,
                isDeleted: false
            }
            const result = await this.unitOfWork.roleRepository.getAllRoles(query);
            // await unitOfWork.commitTransaction();
            if (result == null) {
                return new CoreException(
                    StatusCodeEnums.NotFound_404,
                    "Role not found"
                )
            }

            // console.log("Result:", result);

            return new FindAllRoleResponse(
                "Find All Role Success",
                StatusCodeEnums.OK_200,
                result
            )

        } catch (error: any) {
            // await unitOfWork.abortTransaction();
            throw new CoreException(
                StatusCodeEnums.InternalServerError_500,
                error.message
            )
        }
    }

    async update(data: any): Promise<any> {
        // const unitOfWork: IUnitOfWork = new UnitOfWork();
        try {
            const session = await this.unitOfWork.startTransaction();

            const {roleId, ...roleData} = data;

            const result: typeof RoleWithBase | null = await this.unitOfWork.roleRepository.updateRoleById(roleId, roleData, session);
            await this.unitOfWork.commitTransaction();

            if (result == null) {
                return new CoreException(
                    StatusCodeEnums.NotFound_404,
                    "Role not found"
                )
            }

            return new UpdateRoleResponse(
                "Update Role Success",
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

    async delete(data: any): Promise<any> {
        try {
            const session = await this.unitOfWork.startTransaction();

            const {roleId} = data;

            const result: any = await this.unitOfWork.roleRepository.deleteRoleById(roleId, session);

            await this.unitOfWork.commitTransaction();
            return new DeleteRoleResponse(
                "Delete Role Success",
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

    async claimPermission(data: any): Promise<ClaimPermissionResponse | CoreException> {
        try {
            const session = await this.unitOfWork.startTransaction();

            const {roleId, permissionId} = data;
            const rolePermissionData = {
                roleId: roleId,
                permissionId: permissionId
            }

            //check if role and permission exist
            const roleAndPermissionCheck = await this.unitOfWork.rolePermissionRepository.getAllRolePermissions(
                {
                    isActive: true,
                    isDeleted: false,
                    ...rolePermissionData
                }
            );
            if (roleAndPermissionCheck.length > 0) {
                await this.unitOfWork.abortTransaction();
                return new CoreException(
                    StatusCodeEnums.BadRequest_400,
                    "This Permission Aldreay claims to this Role"
                )
            }


            // console.log("Role Permission Data:", rolePermissionData);

            const result = await this.unitOfWork.rolePermissionRepository.createRolePermission(rolePermissionData, session);
            await this.unitOfWork.commitTransaction();

            // console.log("Result:", result);

            // const rolePermission = {
            //     roleId: result.roleId,
            //     permissionId: result.permissionId
            // }
            //  console.log("Role Permission:", rolePermission);

            return new ClaimPermissionResponse(
                "Claim Permission Success",
                StatusCodeEnums.Created_201,
                {
                    roleId: result.roleId as string,
                    permissionId: result.permissionId as string
                }
            )

        } catch (error: any) {
            await this.unitOfWork.abortTransaction();
            throw new CoreException(
                StatusCodeEnums.InternalServerError_500,
                error.message
            )
        }
    }

    async revokePermission(data: any): Promise<any> {
        try {
            const session = await this.unitOfWork.startTransaction();

            const {roleId, permissionId} = data;

            const rolePermissionData = {
                roleId: roleId,
                permissionId: permissionId
            }

            const result = await this.unitOfWork.rolePermissionRepository.deleteRolePermission(rolePermissionData, session);
            await this.unitOfWork.commitTransaction();

            return new ClaimPermissionResponse(
                "Revoke Permission Success",
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