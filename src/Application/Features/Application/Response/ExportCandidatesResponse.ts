import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";
export class ExportCandidatesResponse extends BaseResponse {
    private buffer: Buffer;
    
    constructor(message: string, statusCode: number, buffer: Buffer, error?: string) {
        super(message, statusCode, {buffer}, error);
        this.buffer = buffer;
    }
}