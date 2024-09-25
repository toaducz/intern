import mongoose, {Types} from "mongoose";
import {BaseSchema} from "./BaseEntities";

export const RolePermission = new mongoose.Schema({
    roleId: {
        type: Types.ObjectId,
        ref: "RoleWithBase",
    },
    permissionId: {
        type: Types.ObjectId,
        ref: "PermissionWithBase",
    },
    // bitwisePermission: {
    //     type: Number,
    //     default: 0,
    // },
})

const RolePermissionWithBaseSchema = new mongoose.Schema({
    ...RolePermission.obj,
    ...BaseSchema.obj
})

export const RolePermissionWithBase = mongoose.model("RolePermissionWithBase", RolePermissionWithBaseSchema, "role_permissions");

