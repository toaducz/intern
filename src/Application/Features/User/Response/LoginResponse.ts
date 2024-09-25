import { BaseResponse } from './../../../Common/Model/Response/BaseResponse';

interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

export class LoginResponse extends BaseResponse {
    private data: ILoginResponse
    
    constructor(message: string, statusCode: number, data: ILoginResponse, error?: string) {
        super(message, statusCode, data, error);
        this.data = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    }
}