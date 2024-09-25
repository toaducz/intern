import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export default class GetRoleByIdResponse extends BaseResponse {
  private data: {
    name: string;
    description: string;
    isAdmin: boolean;
    listClaim: Object[];
  };

  constructor(
    message: string,
    statusCode: number,
    data: {
      name: string;
      description: string;
      isAdmin: boolean;
      listClaim: Object[];
    },
    error?: string
  ) {
    super(message, statusCode, data, error);
    this.data = {
        name: data.name,
        description: data.description,
        isAdmin: data.isAdmin,
        listClaim: data.listClaim,
    }
    
  }
}
