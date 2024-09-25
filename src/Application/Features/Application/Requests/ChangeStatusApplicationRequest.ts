export class ChangeStatusApplicationRequest {
    applicationId: string;
    status: string;
    
    constructor(applicationId: string, status: string) {
        this.applicationId = applicationId;
        this.status = status;
    }
}