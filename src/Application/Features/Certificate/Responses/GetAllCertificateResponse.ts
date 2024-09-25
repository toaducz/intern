import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class GetAllCertificateResponse extends BaseResponse {
    private data: {
        _id: string;
        name: string;
        type: string;
        description: string;
        userId: string;
        fileURL: string;
        issueDate: Date;
        expiryDate: Date;
    }[];
    constructor(
        message: string,
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
        }[],
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = data.map(certificate => ({
            _id: certificate._id,
            name: certificate.name,
            type: certificate.type,
            description: certificate.description,
            userId: certificate.userId,
            fileURL: certificate.fileURL,
            issueDate: certificate.issueDate,
            expiryDate: certificate.expiryDate
        }));
    }
}