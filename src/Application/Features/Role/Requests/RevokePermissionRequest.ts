export class RevokePermissionRequest {
    roleId: string;
    permissionId: string;

    constructor(roleId: string, permissionId: string) {
        this.roleId = roleId;
        this.permissionId = permissionId;
    }
}
