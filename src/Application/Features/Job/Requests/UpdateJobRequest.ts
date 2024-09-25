import { Types } from "mongoose";

export class updateJobRequest{
    public companyId: String | Types.ObjectId ;
    public title_VN: string;
    public title_EN: string;

    public position: string;
    public typeOfWork: string;
    public occupation: string;
    public major: string;

    public gender: Boolean;
    public expirationDate: Date;
    public startingSalary: string;
    public vacanciesNum: string;
    public city: string;
    public district: string;
    public address: string;
    public description_VN: string;
    public description_EN: string;
    public requirement_VN: string;
    public requirement_EN: string;
    public status: string;

    public benefit_VN: string;
    public benefit_EN: Number;

    public applicationId: Types.ObjectId[];
}