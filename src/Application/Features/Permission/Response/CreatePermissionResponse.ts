import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";
import {data} from "franc/data";

export class CreatePermissionResponse extends BaseResponse{
    private data: any;

    constructor(message: string, statusCode: number, data: object, error?: string) {
        super(message, statusCode, data, error);
        this.data = data;
    }
}