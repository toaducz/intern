import { CreateCompanyRequest } from "../../Application/Features/Company/Requests/CreateCompanyRequest";
import { ChangeStatusCompanyRequest } from "../../Application/Features/Company/Requests/ChangeStatusCompanyRequest";
import { Request, Response } from "express";
import CompanyService from '../../Application/Features/Company/CompanyService';
import ICompanyService from '../../Application/Persistences/IServices/ICompanyService';
import { GetAllCompanyRequest } from "../../Application/Features/Company/Requests/GetAllCompanyRequest";
import { StatusCodeEnums } from '../../Domain/Enums/StatusCodeEnums';
import { UpdateCompanyRequest } from '../../Application/Features/Company/Requests/UpdateCompanyRequest';
import { ConfigSlotRequest } from "../../Application/Features/Company/Requests/ConfigSlotRequest";

export default class CompanyController{

  private companyService: ICompanyService = new CompanyService();

  async createCompany(
    req: Request<any, any, CreateCompanyRequest>,
    res: Response
  ): Promise<Response> {
    const companyService: ICompanyService = new CompanyService();
    try {
        // #swagger.tags = ['Companys']
        // #swagger.summary = 'Create new Company'
        // #swagger.description = 'Users create their own Company'
        /*  
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Add new company with some informations',
                schema: {
                    "companyName": "Công ty Vip Pro",
                    "industry": "Công nghệ thông tin",
                    "location": "Thành Phố Hồ Chí Minh",
                    "companySize": "500",
                    "address" : "Quận 7",
                    "website" : "vippro.com",
                    "contactInfo": "0987654321",
                    "email": "ngotrongnhan12a4chilang@gmail.com" 
                }
            } 

            #swagger.responses[201] = {
                description: 'Successfully',
                schema:{
                    "message": "Successful",
                    "statusCode": 201,
                    "data": {
                        "_id": "6673d30139c0cfc004293f89",
                        "companyName": "Công ty Vip Pro",
                        "industry": "Công nghệ thông tin",
                        "location": "Thành Phố Hồ Chí Minh",
                        "companySize": "500",
                        "address": "Quận 7",
                        "website": "vippro.com",
                        "email": "ngotrongnhan12a4chilang@gmail.com",
                        "status": "pending"
                    }
                }
            }
        */
      const {companyName, industry, location, companySize, address, website, email} = req.body;
      const data: any = {
        companyName: companyName,
        industry: industry,
        location: location, 
        companySize: companySize,
        address: address,
        website: website,
        email: email
      };
      const result: any = await companyService.createNewCompany(data);
      if (result.error != undefined || result.error) {
        return res.status(result.statusCode).json({ error: result.error });
      }
      return res.status(result.statusCode).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.messgae });
    }
  }

  async changeStatusCompany(
    req: Request<any, any, ChangeStatusCompanyRequest>,
    res: Response
  ): Promise<Response>{
    const companyService: ICompanyService = new CompanyService();
    try {
        // #swagger.tags = ['Companys']
        // #swagger.summary = 'Accept company'
        // #swagger.description = 'Accept company and send email'
        /*  
            #swagger.security = [{
                "apiKeyAuth": []
            }] 

            #swagger.parameters['_id'] = {
                in: 'path',
                description: 'Company id',
                required: true,
                type: 'string'
            }
            #swagger.parameters['status'] = {
                in: 'query',
                description: 'Status filter for company',
                type: 'string',
                enum: ['pending','approved','rejected'],
                required: false
            }

            #swagger.responses[201] = {
                description: 'Successfully',
                schema:{
                    "message": "created company successfully",
                    "statusCode": 201,
                    "data": {
                        "_id": "6673d30139c0cfc004293f89",
                        "companyName": "Công ty Vip Pro",
                        "industry": "Công nghệ thông tin",
                        "location": "Thành Phố Hồ Chí Minh",
                        "companySize": "500",
                        "address": "Quận 7",
                        "website": "vippro.com",
                        "email": "ngotrongnhan12a4chilang@gmail.com",
                        "apiKey": "$2a$10$qwB5nhVeCMZAof.QBJSeiuXCZ0S1xFa9Ro5cA9nOA55HcFdo4UnGu",
                        "status": "approved"
                    }
                }
            }

            #swagger.responses[200] = {
                description: 'Successfully',
                schema:{
                    "message": "Company have been rejected",
                    "statusCode": 200,
                    "data": {
                        "_id": "6673d30139c0cfc004293f89",
                        "companyName": "Công ty Vip Pro",
                        "industry": "Công nghệ thông tin",
                        "location": "Thành Phố Hồ Chí Minh",
                        "companySize": "500",
                        "address": "Quận 7",
                        "website": "vippro.com",
                        "email": "ngotrongnhan12a4chilang@gmail.com",
                        "apiKey": "$2a$10$qwB5nhVeCMZAof.QBJSeiuXCZ0S1xFa9Ro5cA9nOA55HcFdo4UnGu",
                        "status": "rejected",
                        "createdAt": "2024-06-20T06:58:09.259Z",
                        "updatedAt": "2024-06-20T07:09:58.044Z",
                        "isActive": true,
                        "isDeleted": false
                    }
                }
            }

            #swagger.responses[500] = {
                description: 'Error',
                schema: {
                    "statusCode": 500,
                    "message": "Error occured at createComService: Error at findCompanyById in CompanyRepository: input must be a 24 character hex string, 12 byte Uint8Array, or an integer"
                }
            }

            #swagger.responses[500] = {
                description: 'Error',
                schema: {
                    "statusCode": 500,
                    "message": "Invalid company staus"
                }
            }
        */
      const {_id} = req.params;
      const {status} = req.query;
      const params: any = {
          _id : _id,
          status: status?.toString()
        }
      const company: any = await companyService.changeStatusCompanyById(params);
      if (company.error != undefined || company.error) {
        return res.status(company.statusCode).json({ error: company.error });
      }
      return res.status(company.statusCode).json(company);
    } catch (error: any) {
      return res.status(500).json({ error: error.messgae });
    }
  }

  async getAllCompany(
    req: Request<any, any, GetAllCompanyRequest>,
    res: Response
  ): Promise<Response>{
    const companyService: ICompanyService = new CompanyService();
    try {
        // #swagger.tags = ['Companys']
        // #swagger.summary = 'Get All Company with filter Status'
        // #swagger.description = "Status filter can help admin get company with Page and limit"
        /* 
            #swagger.parameters['page'] = {
                in: 'query',
                description: 'Page',
                type: 'number',
            }
            #swagger.parameters['limit'] = {
                in: 'query',
                description: 'Limit',
                type: 'number',
            }
            #swagger.parameters['status'] = {
                in: 'query',
                description: 'get status of company',
                type: 'string',
                enum: ['pending','approved','rejected'],
                required: false
            }
            #swagger.responses[200] = {
                description: 'Successfully',
                schema: {
                    "message": "Get all company successfully",
                    "statusCode": 200,
                    "data": [
                        {
                        "companyName": "Công ty cong nghe a",
                        "industry": "Hệ thống thông tin",
                        "location": "Thành Phố Hồ Chí Minh",
                        "companySize": "500",
                        "address": "Quận 5",
                        "website": "congnghea.com",
                        "email": "doanphuongnam.2002@gmail.com",
                        "status": "pending",
                        "isActive": true
                        },
                    ]
                }
            }

            #swagger.responses[500] = {
                description: 'Error',
                schema: {
                    'statusCode': 500,
                    'message': 'Error'
                }
            }
        */
      const {page, limit, status} = req.query;
      const query = {page, limit, status};
      const company: any = await companyService.getAllCompany(query);
      if (company.error != undefined || company.error) {
        return res.status(company.statusCode).json({ error: company.error });
      }
      return res.status(company.statusCode).json(company);
    } catch (error: any) {
      return res.status(500).json({ error: error.messgae });
    }
  }
  getCompanyById = async (req: Request<any, any>, res: Response) => {
    try {
        // #swagger.tags = ['Companys']
        // #swagger.summary = 'Get company'
        // #swagger.description = 'Get company'
        /*  
            #swagger.responses[201] = {
                description: 'Successfully',
                schema: {
                    "message": "Successfull",
                    "statusCode": 200,
                    "data": {
                        "_id": "6672811330255e49d32df209",
                        "companyName": "Amazing",
                        "apiKey": "12345676",
                        "isDeleted": false,
                        "isActive": true,
                        "createdAt": "2024-06-19T06:56:19.400Z",
                        "updatedAt": "2024-06-19T08:08:52.826Z",
                        "__v": 0
                    }
                }
            }

            #swagger.responses[400] = {
                description: 'Bad request',
                schema: {
                    "statusCode": 400,
                    "message": "Company not found"
                }
            }
        */
        const { companyId } = req.params;
        const result: any = await this.companyService.getCompanyById(companyId);

        if (result.error != undefined || result.error) {
            return res.status(result.statusCode).json({ error: result.error });
        }

        return res.status(result.statusCode).json(result);
    }
    catch (error: any) {
        return res.status(StatusCodeEnums.InternalServerError_500).json({ error: error.message })
    }
}

  update = async (req: Request<any, any, UpdateCompanyRequest>, res: Response) => {
    try {
        // #swagger.tags = ['Companys']
        // #swagger.summary = 'Update company'
        // #swagger.description = 'Create company'
        /*  
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Some informations of company',
                schema: {
                    "websize": "amazing123.vn"
                }
            } 

            #swagger.responses[200] = {
                description: 'Successfully',
                schema: {
                    "message": "Updated company successfull",
                    "statusCode": 200
                }
            }
        */
        const { companyId } = req.params;
        const data = req.body;

        const result: any = await this.companyService.update(companyId, data);

        if (result.error != undefined || result.error) {
            return res.status(result.statusCode).json({ error: result.error });
        }

        return res.status(result.statusCode).json(result);
    }
    catch (error: any) {
        return res.status(StatusCodeEnums.InternalServerError_500).json({ error: error.message })
    }
}

  delete = async (req: Request<any, any>, res: Response) => {
        // #swagger.tags = ['Companys']
        // #swagger.summary = 'Create company'
        // #swagger.description = 'Create company'
        /*  
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Some informations of company',
            } 

            #swagger.responses[200] = {
                description: 'Successfully',
                schema: {
                    "message": "Deleted successfull",
                    "statusCode": 200
                }
            }
        */
        try {
            const { companyId } = req.params;
            const data = {
                isDeleted: true,
                isActive: false,
            }
            const result: any = await this.companyService.delete(companyId, data);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }

            return res.status(result.statusCode).json(result);;
        }
        catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: error.message })
        }
    }

    configSlot = async (req: Request<any, any, ConfigSlotRequest>, res: Response) => {
        try {
            // #swagger.tags = ['Companys']
            // #swagger.summary = 'Config slot interview for company'
            // #swagger.description = 'Configure the interview slot, this interview slot to estimate the interview time of the interviews. Each company will configure its own slots, including slotTime which is the time for each interview slot, slot object will decide how many interview slots each state has.'
            /*
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Add slot time and slot for each state. Notes: slot.keys only accepts parameters including state1, state2 and state3, other states will throw error',
                    schema: {
                        "slotTime": 15,
                        "slot": {
                            "state1": 2,
                            "state2": 3,
                            "state3": 3,
                        }
                    }
                } 

                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema:{
                        "message": "Config slot interview successfully",
                        "statusCode": 200,
                    }
                }
            */
            const { slotTime, slot } = req.body
            const companyId: any = req.user?.companyId;
            if (!companyId)
                return res.status(StatusCodeEnums.BadRequest_400).json({ error: 'Please verify api key'})

            const result: any = await this.companyService.configSlot(companyId as string, slotTime, slot);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }
        catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({ error: error.message })
        }
    }
}