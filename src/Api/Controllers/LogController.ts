import ILogServices from "../../Application/Persistences/IServices/ILogServices";
import LogService from "../../Application/Features/Log/LogService";
import {Request, Response} from 'express';
import {CreateLogRequest} from "../../Application/Features/Log/Requests/CreateLogRequest";
import {FindLogByIdRequest} from "../../Application/Features/Log/Requests/FindLogById.Request";
import {UpdateLogRequest} from "../../Application/Features/Log/Requests/UpdateLogRequest";
import {FindAllLogRequest} from "../../Application/Features/Log/Requests/FindAllLogRequest";
import {DeleteLogRequest} from "../../Application/Features/Log/Requests/DeleteLogRequest";


export default class LogController {
    private logService: ILogServices = new LogService();
    createLog = async (
        req: Request<any, any, CreateLogRequest>,
        res: Response
    ) => {
        //#swagger.tags = ['Logs']
        //#swagger.description = 'API to create log'
        /* #swagger.parameters['body'] = {
                in: 'body',
                description: 'Log information',
                required: true,
                schema: { $ref: "#/definitions/CreateLogRequest" }
        }
         */
        try {
            const {
                userId,
                action,
                ipAddress,
                deviceId,
                timeStamp
            } = req.body

            const result = await this.logService.create({
                userId,
                action,
                ipAddress,
                deviceId,
                timeStamp
            });
            return res.status(201).json(result);
        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }
    findLogById = async (
        req: Request<FindLogByIdRequest, any, any>,
        res: Response
    ) => {
        //#swagger.tags = ['Logs']
        //#swagger.description = 'API to get log by id'
        /* #swagger.parameters['logId'] = {
                in: 'path',
                description: 'Log ID',
                required: true,
                type: 'string',
                example: '666c059edfe1ddd535a4df3a'
        }
         */
        try {
            const {logId} = req.params;
            const result = await this.logService.findById(logId);
            return res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }
    findAllLog = async (
        req: Request<any, any, FindAllLogRequest>,
        res: Response
    ) => {
        //#swagger.tags = ['Logs']
        //#swagger.description = 'API to get all logs'
        /* #swagger.parameters['page'] = {
                in: 'query',
                description: 'Page number',
                type: 'number',
                example: 1
        }
        */
        /* #swagger.parameters['limit'] = {
                in: 'query',
                description: 'Limit number',
                type: 'number',
                example: 10
        }
        */
        /* #swagger.parameters['userId'] = {
                in: 'query',
                description: 'User ID',
                required: false,
                type: 'string',
                example: '666bf5e7ae57ee0d95c4f670'
        }
        */
        try {
            const {
                page,
                limit,
                userId,
                // action,
                method,
                url,
                statusCode,
                ipAddress,
                deviceId,
                timeStamp
            } = req.query;
            const data = {
                page,
                limit,
                userId,
                // action,
                method,
                url,
                statusCode,
                ipAddress,
                deviceId,
                timeStamp
            }

            const result = await this.logService.findAll(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message})
        }

    };
    updateLog = async (
        req: Request<UpdateLogRequest, any, UpdateLogRequest>,
        res: Response
    ) => {
        //#swagger.tags = ['Logs']
        //#swagger.description = 'API to update log'
        /* #swagger.parameters['logId'] = {
                in: 'path',
                description: 'Log ID',
                required: true,
                type: 'string',
                example: '666c059edfe1ddd535a4df3a'
         }
        */
        /* #swagger.parameters['body'] = {
                in: 'body',
                description: 'Log information',
                required: true,
                schema: { $ref: "#/definitions/UpdateLogRequest" }
        }
         */
        try {
            const {logId} = req.params;
            const {
                userId,
                action,
                ipAddress,
                deviceId,
                timeStamp
            } = req.body
            const result = await this.logService.update({
                logId,
                userId,
                action,
                ipAddress,
                deviceId,
                timeStamp
            });
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message})
        }

    }
    deleteLog = async (
        req: Request<DeleteLogRequest, any, any>,
        res: Response
    ) => {
        //#swagger.tags = ['Logs']
        //#swagger.description = 'API to delete log'
        /* #swagger.parameters['logId'] = {
                in: 'path',
                description: 'Log ID',
                required: true,
                type: 'string',
                example: '666c059edfe1ddd535a4df3a'
        }
         */
        try {
            const {logId} = req.params;
            const result = await this.logService.delete(logId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message})
        }
    };

}
