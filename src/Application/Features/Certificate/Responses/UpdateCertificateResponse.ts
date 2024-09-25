import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class UpdateCertificateResponse extends BaseResponse {
    private data: {
        _id: string;
        name: string;
        type: string;
        description: string;
        userId: string;
        fileURL: string;
        issueDate: Date;
        expiryDate: Date;
    };
    constructor(message: string, 
        statusCode: number, 
        data: {
            _id: string;
            name: string;
            type: string;
            description: string;
            userId: string;
            fileURL: string;
            issueDate: Date;
            expiryDate: Date;
        }, 
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            name: data.name,
            type: data.type,
            description: data.description,
            userId: data.userId,
            fileURL: data.fileURL,
            issueDate: data.issueDate,
            expiryDate: data.expiryDate
        };
    }
}