import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

export class DeletePermissionResponse extends BaseResponse{
    private data: any;

    constructor(message: string, statusCode: number, data: object, error?: string) {
        super(message, statusCode, data, error);
        this.data = data;
    }
}