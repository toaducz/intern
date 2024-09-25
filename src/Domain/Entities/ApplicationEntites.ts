import mongoose, { Types } from "mongoose";
import { BaseSchema } from "./BaseEntities";
import { ApplicationStateEnums } from '../Enums/ApplicationStateEnums';

export const Application = new mongoose.Schema({
  cvId: {
    type: Types.ObjectId,
    ref: "CVWithBase",
  },
  jobId: {
    type: Types.ObjectId,
    ref: "jobs",
  },
  status: {
    type: String,
    default: "cv",
  },
  currentState:{
    type: String,
    enum: ApplicationStateEnums,
    default: ApplicationStateEnums.CV
  }
});

const ApplicationWithBaseSchema = new mongoose.Schema({
  ...BaseSchema.obj,
  ...Application.obj,
});

export const ApplicationWithBase = mongoose.model("ApplicationWithBase", ApplicationWithBaseSchema, "application");
