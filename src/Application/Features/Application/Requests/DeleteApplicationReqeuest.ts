export class DeleteApplicationRequest {
    applicationId: string;
    cvId: string;
    jobId: string;
    currentState: string;
    
    constructor(applicationId: string, cvId: string, jobId: string, currentState: string) {
        this.applicationId = applicationId;
        this.cvId = cvId;
        this.jobId = jobId;
        this.currentState = currentState;
    }
}