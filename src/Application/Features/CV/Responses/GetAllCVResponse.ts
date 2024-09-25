import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class GetAllCVResponse extends BaseResponse {
    private data: {
        _id: string;
        userId: Types.ObjectId;
        cvPath: string;
        isApproved: boolean;
    }[];
    constructor(
        message: string,
        statusCode: number,
        data: {
            _id: string;
            userId: Types.ObjectId;
            cvPath: string;
            isApproved: boolean;
        }[],
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = data.map(cv => ({
            _id: cv._id,
            userId: cv.userId,
            cvPath: cv.cvPath,
            isApproved: cv.isApproved
        }));
    }
}