export class GetApplicationRequest {
    applicationId: string;

    public getApplicationId(): string {
        return this.applicationId;
    }

    public setApplicationId(applicationId: string): void {
        this.applicationId = applicationId;
    }
}