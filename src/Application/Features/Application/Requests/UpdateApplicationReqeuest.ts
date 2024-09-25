export class UpdateApplicationRequest {
    applicationId: string;
    cvId: string;
    jobId: string;
    status: string;
    
    constructor(applicationId: string, cvId: string, jobId: string, status: string) {
        this.applicationId = applicationId;
        this.cvId = cvId;
        this.jobId = jobId;
        this.status = status;
    }
}