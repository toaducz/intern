export class UpdatePermissionRequest {
    permissionId: string;
    name: string;
    description: string;
    bitwisePermission: number;
    constructor(permissionId: string, name: string, description: string, bitwisePermission: number) {
        this.permissionId = permissionId;
        this.name = name;
        this.description = description;
        this.bitwisePermission = bitwisePermission;
    }
}