import mongoose from "mongoose";
import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

interface IGetEmployeeProfile {
    _id: mongoose.Types.ObjectId;
    fullname: string;
    careerGoal: string;
    gender: boolean;
    imagePath: string;
    birthday: string;
    phoneNumber: string;
    email: string;
    companyId: string;
}

export class GetEmployeeProfile extends BaseResponse {
    private data: IGetEmployeeProfile;


    constructor(message: string, statusCode: number, data: IGetEmployeeProfile, error?: string) {
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            fullname: data.fullname,
            careerGoal: data.careerGoal,
            gender: data.gender,
            imagePath: data.imagePath,
            birthday: data.birthday,
            phoneNumber: data.phoneNumber,
            email: data.email,
            companyId: data.companyId
        }
    }
}