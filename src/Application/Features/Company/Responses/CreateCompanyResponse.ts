import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class CreateCompanyResponse extends BaseResponse {
    private data: {
        _id: string;
        companyName: string;
        industry: string;
        location: string;
        companySize: string;
        address: string;
        website: string;
        contactInfo: string;
        email: string;
        status: string;
    };
    constructor(message: string, 
        statusCode: number, 
        data: {
            _id: string;
            companyName: string;
            industry: string;
            location: string;
            companySize: string;
            address: string;
            website: string;
            contactInfo: string;
            email: string;
            status: string;
        }, 
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            companyName: data.companyName,
            industry: data.industry,
            location: data.location,
            companySize: data.companySize,
            address: data.address,
            website: data.website,
            contactInfo: data.contactInfo,
            email: data.email,
            status: data.status,
        };
    }
}