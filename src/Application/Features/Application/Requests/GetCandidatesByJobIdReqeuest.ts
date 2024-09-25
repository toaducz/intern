export class GetCandidatesByJobIdReqeuest {
    jobId: string;

    public getJobId(): string {
        return this.jobId;
    }

    public setApplicationId(jobId: string): void {
        this.jobId = jobId;
    }
}