import { Types } from "mongoose";
import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class GetAllCompanyResponse extends BaseResponse {
    private data: {
        companyName: string;
        industry: string;
        location: string;
        companySize: string;
        address: string;
        website: string;
        contactInfo: string;
        email: string;
        apiKey: string;
        status: string;
        updateTime: Date;
        isActive: boolean;
        isDelete: boolean;
        isApproved: boolean;
    }[];
    constructor(
        message: string,
        statusCode: number,
        data: {
            companyName: string;
            industry: string;
            location: string;
            companySize: string;
            address: string;
            website: string;
            contactInfo: string;
            email: string;
            apiKey: string;
            status: string;
            updateTime: Date;
            isActive: boolean;
            isDelete: boolean;
            isApproved: boolean;
        }[], 
        error?: string) {
        super(message, statusCode, data, error);
        this.data = data.map(cp => ({
            companyName: cp.companyName,
            industry: cp.industry,
            location: cp.location,
            companySize: cp.companySize,
            address: cp.address,
            website: cp.website,
            contactInfo: cp.contactInfo,
            email: cp.email,
            apiKey: cp.apiKey,
            status: cp.status,
            updateTime: cp.updateTime,
            isActive: cp.isActive,
            isDelete: cp.isDelete,
            isApproved: cp.isApproved,
        }));
        
    }
}