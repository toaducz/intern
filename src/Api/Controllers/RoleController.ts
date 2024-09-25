import {Request, Response} from 'express';
import IRoleService from "../../Application/Persistences/IServices/IRoleService";
import RoleService from "../../Application/Features/Role/RoleService";
import {CreateRoleRequest} from "../../Application/Features/Role/Requests/CreateRoleRequest";
import {FindAllRoleRequest} from "../../Application/Features/Role/Requests/FindAllRoleRequest";
import {UpdateRoleRequest} from "../../Application/Features/Role/Requests/UpdateRoleRequest";
import {FindRoleByIdRequest} from "../../Application/Features/Role/Requests/FindRoleByIdRequest";
import {DeleteRoleRequest} from "../../Application/Features/Role/Requests/DeleteRoleRequest";
import mongoose from "mongoose";
import {RolePermissionEnums} from "../../Domain/Enums/RolePermissionEnums";
import {ClaimPermissionRequest} from "../../Application/Features/Role/Requests/ClaimPermissionRequest";
import {RevokePermissionRequest} from "../../Application/Features/Role/Requests/RevokePermissionRequest";


export default class RoleController {
    private roleService: IRoleService = new RoleService();

    createRole = async (
        req: Request<any, any, CreateRoleRequest>,
        res: Response
    ) => {
        // #swagger.tags = ['Roles']

        // #swagger.summary = 'Create new role'

        // #swagger.description = 'API to create new role'

        /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Create new role with default permissions',
        schema: {
            $ref: '#/definitions/CreateRoleRequest'
        }
        } */

        try {
            const {name, description, bitwisePermission} = req.body;

            const data = {
                name,
                description,
                bitwisePermission
            }
            const result = await this.roleService.create(data);

            // #swagger.responses[200] = { description: 'Role created successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }

    findAllRole = async (
        req: Request<any, any, FindAllRoleRequest>,
        res: Response) => {
        try {
            // #swagger.tags = ['Roles']

            // #swagger.summary = 'Get all roles'

            // #swagger.description = 'API to get all roles'


            const data = {
                ...req.query
            }

            const result = await this.roleService.findAll(data);

            // #swagger.responses[200] = { description: 'Roles found successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }

    updateRole = async (
        req: Request<UpdateRoleRequest, any, UpdateRoleRequest>,
        res: Response
    ) => {
        // #swagger.tags = ['Roles']

        // #swagger.summary = 'Update role'

        // #swagger.description = 'API to update role'

        /*  #swagger.parameters['roleId'] = {
        in: 'path',
        description: 'Role id',
        required: true,
        type: 'string'
        }
         */

        /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update new role to HR',
        schema: {
            $ref: '#/definitions/UpdateRoleRequest'
        }
        } */
        try {
            const {roleId} = req.params;

            //check roleId is valid
            if (!mongoose.Types.ObjectId.isValid(roleId)) {
                // #swagger.responses[400] = { description: 'Invalid role id' }
                return res.status(400).json({
                    statusCode: 400,
                    status: 'Bad Request',
                    message: 'Invalid roleId'
                });
            }

            const {name, description, bitwisePermission} = req.body;
            const data = {
                roleId,
                name,
                description,
                bitwisePermission
            }
            const result = await this.roleService.update(data);

            if (result.statusCode === 404) {
                // #swagger.responses[404] = { description: 'Role not found' }
                return res.status(404).json(result);
            }

            // #swagger.responses[200] = { description: 'Role updated successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }

    findRoleById = async (
        req: Request<FindRoleByIdRequest, any, any>,
        res: Response
    ) => {
        // #swagger.tags = ['Roles']

        // #swagger.summary = 'Find role by id'

        // #swagger.description = 'API to find role by id'

        /*  #swagger.parameters['roleId'] = {
        in: 'path',
        description: 'Role id',
        required: true,
        type: 'string'
        }
         */
        try {
            const {roleId} = req.params;

            //check roleId is valid
            if (!mongoose.Types.ObjectId.isValid(roleId)) {
                // #swagger.responses[400] = { description: 'Invalid role id' }
                return res.status(400).json({
                    statusCode: 400,
                    status: 'Bad Request',
                    message: 'Invalid roleId'
                });
            }

            const data = {
                roleId
            }
            const result = await this.roleService.findById(data);

            if (result.statusCode === 404) {
                // #swagger.responses[404] = { description: 'Role not found' }
                return res.status(404).json(result);
            }

            // #swagger.responses[200] = { description: 'Role found successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }

    deleteRole = async (
        req: Request<DeleteRoleRequest, any, any>,
        res: Response
    ) => {
        // #swagger.tags = ['Roles']

        // #swagger.summary = 'Delete role'

        // #swagger.description = 'API to delete role'

        /*  #swagger.parameters['roleId'] = {
        in: 'path',
        description: 'Role id',
        required: true,
        type: 'string'
        }
         */
        try {
            const {roleId} = req.params;

            //check roleId is valid
            if (!mongoose.Types.ObjectId.isValid(roleId)) {
                // #swagger.responses[400] = { description: 'Invalid role id' }
                return res.status(400).json({
                    statusCode: 400,
                    status: 'Bad Request',
                    message: 'Invalid roleId'
                });
            }

            const data = {
                roleId
            }
            const result = await this.roleService.delete(data);
            // #swagger.responses[200] = { description: 'Role deleted successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }
    getPermission = async (
        req: Request,
        res: Response
    ) => {
        // #swagger.tags = ['Roles']

        // #swagger.summary = 'Get permission'

        // #swagger.description = 'Get permission for each role'

        try {
            const result = {
                "Guest": RolePermissionEnums.GuestPermission,
                "Candidate": RolePermissionEnums.CandidatePermission,
                "CompanyEmployee": RolePermissionEnums.CompanyEmployeePermission,
                "CompanyAdmin": RolePermissionEnums.CompanyAdminPermission,
                "Admin": RolePermissionEnums.AdminPermission
            }
            // #swagger.responses[200] = { description: 'Permissions found successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }
    claimPermission = async (
        req: Request<any,any,ClaimPermissionRequest>,
        res: Response
    ) => {
        // #swagger.tags = ['Roles']

        // #swagger.summary = 'Claim permission'

        // #swagger.description = 'Claim permission for role'\

        /*
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Claim permission for role',
            schema: {
                $ref: '#/definitions/ClaimPermissionRequest'
            }
        }
         */

        try {
            const {roleId, permissionId} = req.body;

            const data = {
                roleId,
                permissionId
            }

            const result = await this.roleService.claimPermission(data);

            console.log("Result:", result);
            // #swagger.responses[200] = { description: 'Permission claimed successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }
    revokePermission = async (
        req: Request<any, any, RevokePermissionRequest>,
        res: Response
    ) => {
        // #swagger.tags = ['Roles']

        // #swagger.summary = 'Revoke permission'

        // #swagger.description = 'Revoke permission for role'

        /*
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Revoke permission for role',
            schema: {
                $ref: '#/definitions/RevokePermissionRequest'
            }
        }
         */

        try {
            const {roleId, permissionId} = req.body;
            const data = {
                roleId,
                permissionId
            }

            const result = await this.roleService.revokePermission(data);
            // #swagger.responses[200] = { description: 'Permission revoked successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }
}
