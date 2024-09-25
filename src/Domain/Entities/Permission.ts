import mongoose from "mongoose";
import {BaseSchema} from "./BaseEntities";

export const Permission = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    bitwisePermission: {
        type: Number,
        default: 0,
    },
})

const PermissionWithBaseSchema = new mongoose.Schema({
    ...Permission.obj,
    ...BaseSchema.obj
})

export const PermissionWithBase = mongoose.model("PermissionWithBase", PermissionWithBaseSchema, "permissions");