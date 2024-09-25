import { Types } from "mongoose";
import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class GetAllApplicationResponse extends BaseResponse {
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
            _id: string;
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
        this.data = data.map(cv => ({
            _id: cv._id,
            cvId: cv.cvId,
            jobId: cv.jobId,
            currentState: cv.currentState,
            createTime: cv.createTime,
            updateTime: cv.updateTime,
            isActive: cv.isActive,
            isDelete: cv.isDelete,
            isApproved: cv.isApproved,
        }));
        
    }
}