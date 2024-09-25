import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class UpdateApplicationResponse extends BaseResponse {
    private data: {
        _id: string;
        cvId: Types.ObjectId;
        jobId: Types.ObjectId;
        status: string;
        createAt: Date;
        updatedAt: Date;
        isActive: boolean;
        isDeleted: boolean;
        isApproved: boolean;
    };
    
    constructor(message: string, statusCode: number, data: {
        _id: string,
        cvId: Types.ObjectId;
        jobId: Types.ObjectId;
        status: string;
        createAt: Date;
        updatedAt: Date;
        isActive: boolean;
        isDeleted: boolean;
        isApproved: boolean;
    }, error?: string) {
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            cvId: data.cvId,
            jobId: data.jobId,
            status: data.status,
            createAt: data.createAt,
            updatedAt: data.updatedAt,
            isActive: data.isActive,
            isDeleted: data.isDeleted,
            isApproved: data.isApproved
        }
    }
}