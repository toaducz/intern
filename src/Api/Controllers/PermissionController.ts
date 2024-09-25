import {Request, Response} from 'express';
import {IPermissionService} from "../../Application/Persistences/IServices/IPermissionService";
import {PermissionService} from "../../Application/Features/Permission/PermissionService";
import {CreatePermissionRequest} from "../../Application/Features/Permission/Requests/CreatePermissionRequest";
import {FindAllPermissionRequest} from "../../Application/Features/Permission/Requests/FindAllPermissionRequest";
import {UpdatePermissionRequest} from "../../Application/Features/Permission/Requests/UpdatePermissionRequest";
import {FindPermissionRequest} from "../../Application/Features/Permission/Requests/FindPermissionRequest";
import {DeletePermissionRequest} from "../../Application/Features/Permission/Requests/DeletePermissionRequest";

export default class PermissionController {
    private permissionService: IPermissionService = new PermissionService();

    createPermission = async (req: Request<any, any, CreatePermissionRequest>, res: Response) => {
        // #swagger.tags = ['Permissions']
        // #swagger.summary = 'Create new permission'
        // #swagger.description = 'API to create new permission'
        /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create new permission with default permissions',
            schema: {
                $ref: '#/definitions/CreatePermissionRequest'
            },
            example: {
                "name": "Create User",
                "description": "Create new user",
                "bitwisePermission": 1
            }
        }
         */

        try {
            const {name, description, bitwisePermission} = req.body;

            const data = {
                name,
                description,
                bitwisePermission
            }
            const result = await this.permissionService.create(data);


            // #swagger.responses[200] = { description: 'Permission created successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }

    findAllPermission = async (req: Request<any, any, FindAllPermissionRequest>, res: Response) => {
        // #swagger.tags = ['Permissions']
        // #swagger.summary = 'Get all permissions'
        // #swagger.description = 'API to get all permissions'

        /*
        #swagger.parameters['page'] = {
            in: 'query',
            description: 'Page number',
            type: 'number',
            example: 1
        }
        #swagger.parameters['limit'] = {
            in: 'query',
            description: 'Limit number',
            type: 'number',
            example: 10
        }
         */
        try {
            const {
                page,
                limit
            } = req.query;

            const query = {
                page: parseInt(page as string),
                limit: parseInt(limit as string)
            }

            const result = await this.permissionService.findAll(query);

            // #swagger.responses[200] = { description: 'Permission found successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }

    updatePermission = async (req: Request<UpdatePermissionRequest, any, UpdatePermissionRequest>, res: Response) => {
        // #swagger.tags = ['Permissions']
        // #swagger.summary = 'Update permission'
        // #swagger.description = 'API to update permission'

        /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update permission with default permissions',
            schema: {
                $ref: '#/definitions/UpdatePermissionRequest'
            },
            example: {
                "name": "Create User",
                "description": "Create new user",
                "bitwisePermission": 1
            }
        }
        #swagger.parameters['permissionId'] = {
            in: 'path',
            description: 'Permission ID',
            required: true,
            type: 'string',
            example: '66790bf4d8fbf700fae168d8'
        }
         */

        try {
            const {name, description, bitwisePermission} = req.body;
            const {permissionId} = req.params;

            const data = {
                permissionId,
                name,
                description,
                bitwisePermission
            }
            const result = await this.permissionService.update(data);

            // #swagger.responses[200] = { description: 'Permission updated successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }

    findPermissionById = async (req: Request<FindPermissionRequest, any, any>, res: Response) => {
        // #swagger.tags = ['Permissions']
        // #swagger.summary = 'Get permission by id'
        // #swagger.description = 'API to get permission by id'

        /*  #swagger.parameters['permissionId'] = {
            in: 'path',
            description: 'Permission ID',
            required: true,
            type: 'string',
            example: '66790bf4d8fbf700fae168d8'
        }
         */

        try {
            const {permissionId} = req.params;

            // const data = {
            //     permissionId
            // }
            // console.log("Find Permission by ID", data);
            const result = await this.permissionService.findById(permissionId);

            // #swagger.responses[200] = { description: 'Permission found successfully' }
            return res.status(200).json(result);

        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }

    deletePermission = async (req: Request<DeletePermissionRequest, any, any>, res: Response) => {
        // #swagger.tags = ['Permissions']
        // #swagger.summary = 'Delete permission'
        // #swagger.description = 'API to delete permission'

        /*  #swagger.parameters['permissionId'] = {
            in: 'path',
            description: 'Permission ID',
            required: true,
            type: 'string',
            example: '66790bf4d8fbf700fae168d8'
        }
         */

        try {
            const {permissionId} = req.params;

            // const data = {
            //     permissionId
            // }
            const result = await this.permissionService.delete(permissionId);

            // #swagger.responses[200] = { description: 'Permission deleted successfully' }
            return res.status(200).json(result);
        } catch (error) {
            // #swagger.responses[400] = { description: 'Bad request' }
            return res.status(400).json(error);
        }
    }
}