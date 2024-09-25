import mongoose, { Types } from 'mongoose';
import { BaseSchema } from './BaseEntities';
import { CompanyStatusEnums } from '../Enums/CompanyStatusEnums';

export const Company = new mongoose.Schema({
    companyName: {
        type: String
    },
    industry: {
        type: String
    },
    location: {
        type: String,
    },
    companySize: {
        type: String
    },
    address: {
        type: String
    },
    website: {
        type: String,
    },
    contactInfo: {
        type: String
    },
    email: {
        type: String
    },
    apiKey: {
        type: String,
    },
    status: {
        type: String,
        enum: CompanyStatusEnums,
        default: CompanyStatusEnums.PENDING
    },
    slotTime: {
        type: Number,
        default: 15
    },
    slot: {
        type: Map,
        of: Number
    }
});

const CompanyWithBaseSchema = new mongoose.Schema({
    ...Company.obj,
    ...BaseSchema.obj
});

export const CompanyWithBase = mongoose.model('CompanyWithBase', CompanyWithBaseSchema, 'companys');