import mongoose, { Types } from "mongoose";
import { BaseSchema } from "./BaseEntities";

export const Role = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    // bitwisePermission: {
    //     type: Number,
    //     default: 0,
    // },
})

const RoleWithBaseSchema = new mongoose.Schema({
    ...Role.obj,
    ...BaseSchema.obj
})

export const RoleWithBase = mongoose.model("RoleWithBase", RoleWithBaseSchema, "roles");
