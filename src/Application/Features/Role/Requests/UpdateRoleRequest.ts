export class UpdateRoleRequest {
    roleId: string;
    name: string;
    description: string;
    bitwisePermission: number;


    constructor(roleId: string, name: string, description: string, bitwisePermission: number) {
        this.roleId = roleId;
        this.name = name;
        this.description = description;
        this.bitwisePermission = bitwisePermission;
    }
}