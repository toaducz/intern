export class ApprovedCVRequest {
    applicationId: string;
    isApproved: boolean;
    
    constructor(applicationId: string, isApproved: boolean, currentState: string) {
        this.applicationId = applicationId;
        this.isApproved = isApproved;
    }
}