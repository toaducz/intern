export class UpdateCertificateRequest{
    public _id: string;
    public name: string;
    public type: string;
    public description: string;
    public userId: string;
    public fileURL: string;
    public issueDate: Date;
    public expiryDate: Date;
    public isActive: boolean;
    public isDeleted: boolean;
}