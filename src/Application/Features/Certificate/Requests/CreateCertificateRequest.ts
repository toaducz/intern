export class CreateCertificateRequest{
    public name: string;
    public type: string;
    public description: string;
    public userId: string;
    public fileURL: string;
    public issueDate: Date;
    public expiryDate: Date;
}