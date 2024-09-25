import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

export class changeStatusApprRes extends BaseResponse {
    private jobData: any

    constructor(message: string, statusCode: number, jobData: {}, error?: string) {
        super(message, statusCode, jobData, error);
        this.jobData = jobData
    }
    
    //get

    //set
}