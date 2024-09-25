import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";
export class FindApplicationResponse extends BaseResponse {
    private data: {
        _id: string;
        cvId: string;
        jobId: string;
        currentState: string;
        createTime: Date;
        updateTime: Date;
        isActive: boolean;
        isDelete: boolean;
        isApproved: boolean;
    }[];
    
    constructor(
        message: string, 
        statusCode: number, 
        data: {
        _id: string,
        cvId: string;
        jobId: string;
        currentState: string;
        createTime: Date;
        updateTime: Date;
        isActive: boolean;
        isDelete: boolean;
        isApproved: boolean;
    }[], 
    error?: string) {
        super(message, statusCode, data, error);
        this.data = data.map(data => ({
            _id: data._id,
            cvId: data.cvId,
            jobId: data.jobId,
            currentState: data.currentState,
            createTime: data.createTime,
            updateTime: data.updateTime,
            isActive: data.isActive,
            isDelete: data.isDelete,
            isApproved: data.isApproved
        }))
    }
}