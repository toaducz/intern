import mongoose, { Types } from "mongoose";
import { BaseSchema } from "./BaseEntities";
import { InterviewStateEnums } from '../Enums/InterviewStateEnums';


// check ObjectId is valid or not 
const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
};

export const interview = new mongoose.Schema({
    applicationId:{
        type: Types.ObjectId,
        validate: {
            validator: isValidObjectId,
        },
        ref: 'application',
        default: '',   
    },
    interviewerId:{
        type: Types.ObjectId,
        validate: {
            validator: isValidObjectId,
        },
        ref: 'users',
        default: '',   
    },
    intervieweeId:{
        type: Types.ObjectId,
        validate: {
            validator: isValidObjectId,
        },
        ref: 'users',
        default: '',   
    },
    state:{
        type:String,
        enum: InterviewStateEnums,
        default: InterviewStateEnums.CV,
    },
    interviewSchedule:{
        type:Date,
        default: Date.now()
    },
    interviewContent:{
        type:String,
        default: "Default Content"
    },
    linkMeeting:{
        type:String,
        default: "link"
    },
    interviewResult:{
        type:Boolean,
        default: false
    },
});

const InterviewWithBaseSchema = new mongoose.Schema({
    ...interview.obj,
    ...BaseSchema.obj
});

// Tạo model cho entity Job
export const InterviewWithBase = mongoose.model("InterviewWithBase",InterviewWithBaseSchema, "interviews");