import mongoose, { Types } from "mongoose";
import { BaseSchema } from "./BaseEntities";
import { JobStatusEnums } from '../Enums/JobStatusEnums';


// check ObjectId is valid or not 
const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
};

export const Job = new mongoose.Schema({
    companyId:{
        type: Types.ObjectId,
        validate: {
            validator: isValidObjectId,
        },
        ref: 'companys',
        default: '',   
    },
    title_VN: {
        type: String,
        default: 'default'
    },
    title_EN: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: 'default'
    },
    typeOfWork: {
        type: String,
        default: 'default'
    },
    occupation: {
        type: String,
        default: 'default'
    },
    major: {
        type: String,
        default: 'default'
    },
    gender: {
        type: String,
        default: "male"
    },
    expirationDate:{
        type:Date,
        default: Date.now()
    },
    startingSalary: {
        type: String,
        default: 'Thương lượng'
    },
    vacanciesNum: {
        type: String,
        default: 'Thương lượng'
    },
    city: {
        type: String,
        default: 'default'
    },
    district: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    description_VN: {
        type: String,
        default: 'default'
    },
    description_EN: {
        type: String,
        default: ''
    },
    requirement_VN: {
        type: String,
        default: 'default'
    },
    requirement_EN: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: JobStatusEnums,
        default: JobStatusEnums.PENDING,
    },
    benefit_VN: {
        type: String,
        default: 'benefit'
    },
    benefit_EN: {
        type: String,
        default: ''
    },
    // expiration:{
    //     type:Date,
    //     default: Date.now()
    // },
    applicationId: [{
        type: Types.ObjectId,
        validate: {
            validator: isValidObjectId,
        },
        ref: 'Application',
        default: '',
    }],


});

const JobWithBaseSchema = new mongoose.Schema({
    ...Job.obj,
    ...BaseSchema.obj
});

// Tạo model cho entity Job
export const JobWithBase = mongoose.model("JobWithBase", JobWithBaseSchema, "jobs");