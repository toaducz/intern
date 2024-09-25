export class CreateRoleRequest {
    name: string;
    description: string;
    bitwisePermission: number;
    constructor(name: string, description: string, bitwisePermission: number) {
        this.name = name;
        this.description = description;
        this.bitwisePermission = bitwisePermission;
    }
}