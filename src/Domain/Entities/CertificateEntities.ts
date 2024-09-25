import mongoose, { Types } from "mongoose";
import { BaseSchema } from "./BaseEntities";

const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
};

export const Certificate = new mongoose.Schema({
    name:{
        type: String
    },
    type:{
        type: String
    },
    description:{
        type: String
    },
    userId:{
        type: Types.ObjectId,
        validate: {
            validator: isValidObjectId,
        }
    },
    fileURL:{
        type: String
    },
    issueDate:{
        type: Date,
        immutable: true,
    },
    expiryDate:{
        type: Date,
        immutable: true,
    }
})

const CertificateWithBaseSchema = new mongoose.Schema({
    ...Certificate.obj,
    ...BaseSchema.obj
})

export const CertificateWithBase = mongoose.model("CertificateWithBase", CertificateWithBaseSchema, "certificate")