import mongoose from "mongoose";

export class UpdateProfileEmployee {
    _id: mongoose.Types.ObjectId;
    fullname: string;
    careerGoal: string;
    gender: boolean;
    imagePath: string;
    birthday: string;
    phoneNumber: string;
    email: string;
    companyId: string;


    constructor(id: mongoose.Types.ObjectId, fullname: string, careerGoal: string, gender: boolean, imagePath: string, birthday: string, phoneNumber: string, email: string, companyId: string) {
        this._id = id;
        this.fullname = fullname;
        this.careerGoal = careerGoal;
        this.gender = gender;
        this.imagePath = imagePath;
        this.birthday = birthday;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.companyId = companyId;
    }
}