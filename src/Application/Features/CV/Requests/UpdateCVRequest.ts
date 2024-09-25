export class UpdateCVRequest{
    public _id: string;
    public userId: string;
    public cvPath: string;
    public isActive: boolean;
    public isDeleted: boolean;
    public isApproved: boolean;
}