export class FindAllPermissionRequest {
    page: number;
    limit: number;
    constructor(page: number, limit: number) {
        this.page = page;
        this.limit = limit;
    }
}