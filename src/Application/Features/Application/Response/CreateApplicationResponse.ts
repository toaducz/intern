import { Types } from "mongoose";
import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class CreateApplicationResponse extends BaseResponse {
    private data: {
        _id: string;
        cvId: Types.ObjectId;
        jobId: string;
        currentState: string;
        createTime: Date;
        updateTime: Date;
        isActive: boolean;
        isDeleted: boolean;
        isApproved: boolean;
    };
    
    constructor(message: string, statusCode: number, data: {
        _id: string,
        cvId: Types.ObjectId;
        jobId: string;
        currentState: string;
        createTime: Date;
        updateTime: Date;
        isActive: boolean;
        isDeleted: boolean;
        isApproved: boolean;
    }, error?: string) {
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            cvId: data.cvId,
            jobId: data.jobId,
            currentState: data.currentState,
            createTime: data.createTime,
            updateTime: data.updateTime,
            isActive: data.isActive,
            isDeleted: data.isDeleted,
            isApproved: data.isApproved
        }
    }
}