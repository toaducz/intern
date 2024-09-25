import mongoose, { Types } from "mongoose";
import { BaseSchema } from "./BaseEntities";

const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
};

export const CV = new mongoose.Schema({
    userId:{
        type: Types.ObjectId,
        validate: {
            validator: isValidObjectId,
        },
        ref: "UserWithBase"
    },
    cvPath:{
        type: String
    },
    isApproved:{
        type: Boolean,
    }
})

const CVWithBaseSchema = new mongoose.Schema({
    ...CV.obj,
    ...BaseSchema.obj
})

export const CVWithBase = mongoose.model("CVWithBase", CVWithBaseSchema, "cv")