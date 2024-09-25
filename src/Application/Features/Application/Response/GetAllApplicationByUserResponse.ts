import { Types } from "mongoose";
import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class GetAllApplicationByUserResponse extends BaseResponse {
    private data: {
        _id: string;
        jobTitle_VN: string;
        jobTitle_EN: string;
        currentState: string;
    }[];
    constructor(
        message: string,
        statusCode: number,
        data: {
            _id: string;
            jobTitle_VN: string;
            jobTitle_EN: string;
            currentState: string;
        }[], 
        error?: string) {
        super(message, statusCode, data, error);
        this.data = data.map(cv => ({
            _id: cv._id,
            jobTitle_VN: cv.jobTitle_VN,
            jobTitle_EN: cv.jobTitle_EN,
            currentState: cv.currentState,
        }));
        
    }
}