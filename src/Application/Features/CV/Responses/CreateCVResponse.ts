import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class CreateCVResponse extends BaseResponse {
    private data: {
        _id: string;
        userId: Types.ObjectId;
        cvPath: string;
        isApproved: boolean;
    };
    constructor(message: string, 
        statusCode: number, 
        data: {
            _id: string;
            userId: Types.ObjectId;
            cvPath: string;
            isApproved: boolean;
        }, 
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            userId: data.userId,
            cvPath: data.cvPath,
            isApproved: data.isApproved
        };
    }
}