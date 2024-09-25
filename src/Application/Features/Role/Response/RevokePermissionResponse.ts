import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

interface RevokePermission {
    roleId: string;
    permissionId: string;
}

export class RevokePermissionResponse extends BaseResponse {
    private data: RevokePermission;


    constructor(message: string, statusCode: number, data: any, error?: string) {
        super(message, statusCode, data, error);
        this.data = {
            roleId: data.roleId,
            permissionId: data.permissionId
        }
    }
}