import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

interface ClaimPermission {
    roleId: string;
    permissionId: string;
}

export class ClaimPermissionResponse extends BaseResponse {
    private data: ClaimPermission;


    constructor(message: string, statusCode: number, data: any, error?: string) {
        super(message, statusCode, data, error);

        console.log("Data:", data);
        this.data = {
            roleId: data.roleId,
            permissionId: data.permissionId
        };
    }
}