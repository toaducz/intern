import mongoose from 'mongoose';
import { BaseResponse } from '../../../Common/Model/Response/BaseResponse';

interface IUserProfile {
    _id: mongoose.Types.ObjectId,
    fullname: string,
    typeOfWork: string,
    careerGoal: string,
    gender: boolean,
    languageLevel: string
    graduationTime: string,
    hometown: string,
    education: string,
    imagePath: string,
    birthday: string,
    phoneNumber: string,
    email: string,
    studentId: string
}

export class GetCandidateProfile extends BaseResponse {
    private data: IUserProfile;

    constructor(message: string, statusCode: number, data: IUserProfile, error?: string) {
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            fullname: data.fullname,
            typeOfWork: data.typeOfWork,
            careerGoal: data.careerGoal,
            gender: data.gender,
            languageLevel: data.languageLevel,
            graduationTime: data.graduationTime,
            hometown: data.hometown,
            education: data.education,
            imagePath: data.imagePath,
            birthday: data.birthday,
            phoneNumber: data.phoneNumber,
            email: data.email,
            studentId: data.studentId,
        };
    }
}