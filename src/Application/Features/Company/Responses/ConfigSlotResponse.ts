import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class ConfigSlotResponse extends BaseResponse {
    constructor(message: string, statusCode: number, data: {}, error?: string){
        super(message, statusCode, data, error);
    }
}