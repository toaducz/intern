import { Types } from "mongoose";

export class CreateApplicationRequest {
    cvId: string;
    jobId: string;
    status: string;
    
    
    constructor(cvId: string, jobId: string, status: string) {
        this.cvId = cvId;
        this.jobId = jobId;
        this.status = status;
    }
}