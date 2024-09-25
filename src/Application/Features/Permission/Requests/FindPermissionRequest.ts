export class FindPermissionRequest {
    permissionId: string;
    name: string;
    bitwisePermission: number;

    constructor(permissionId: string, name: string, bitwisePermission: number) {
        this.permissionId = permissionId;
        this.name = name;
        this.bitwisePermission = bitwisePermission;
    }
}