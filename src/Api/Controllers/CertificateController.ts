import { CreateCertificateRequest } from "../../Application/Features/Certificate/Requests/CreateCertificateRequest";
import { GetCertificateRequest } from "../../Application/Features/Certificate/Requests/GetCertificateRequest";
import { GetAllCertificateRequest } from "../../Application/Features/Certificate/Requests/GetAllCertificateRequest";
import { UpdateCertificateRequest } from "../../Application/Features/Certificate/Requests/UpdateCertificateRequest";
import { DeleteCertificateRequest } from "../../Application/Features/Certificate/Requests/DeleteCertificateRequest";
import { Request, Response } from "express";
import CertificateService from '../../Application/Features/Certificate/CertificateService';
import ICertificateService from '../../Application/Persistences/IServices/ICertificateService';

export default class CertificateController{

  private certificateService: ICertificateService = new CertificateService();

  async createCertificate(
    req: Request<any, any, CreateCertificateRequest>,
    res: Response
  ): Promise<Response> {
    const certificateService: ICertificateService = new CertificateService();
    try {
      // #swagger.tags = ['Certificates']
      // #swagger.summary = 'Create new Certificate'
      // #swagger.description = 'Users create their own certificates'
      // #swagger.consumes = ['multipart/form-data']
      /*
        #swagger.parameters['docs'] = {
          in: 'formData',
          type: 'file',
          required: 'false',
          description: 'Certificate file',
        }
        #swagger.parameters['name'] = {
          in: 'formData',
          type: 'string',
          required: 'false',
          description: 'Certificate name',
        }
        #swagger.parameters['type'] = {
          in: 'formData',
          type: 'string',
          required: 'false',
          description: 'Certificate type',
        }
        #swagger.parameters['description'] = {
          in: 'formData',
          type: 'string',
          required: 'false',
          description: 'Certificate description',
        }
        #swagger.parameters['issueDate'] = {
          in: 'formData',
          type: 'Date',
          required: 'false',
          description: 'issue date',
        }
        #swagger.parameters['expiryDate'] = {
          in: 'formData',
          type: 'Date',
          required: 'false',
          description: 'expiry date',
        }
        
        #swagger.responses[201] = {
          description: 'Successfully',
          schema:{
            "message": "Successful",
            "statusCode": 201,
            "data": {
              "_id": "6673ce5fb2129c80b6779e2b",
              "createdAt": "2024-06-20T06:38:23.216Z",
              "updatedAt": "2024-06-20T06:38:23.216Z",
              "isActive": true,
              "isDeleted": false,
              "name": "English",
              "type": "English",
              "description": "English Vip",
              "userId": "666bf5e7ae57ee0d95c4f670",
              "fileURL": "uploads/certificate/create/1718865503209-VipPro.pdf",
              "issueDate": "2022-07-18T17:00:00.000Z",
              "expiryDate": "2024-07-18T17:00:00.000Z"
            }
          }
        }
      */
      if ((req as any)?.file) {
        const filename: string = (req as any).file?.filename;
        const fullpath: string = `uploads${req.url}/${filename}`;
        req.body.fileURL = fullpath;
      }else{
        req.body.fileURL = "No file upload";
      }
      const userId: string = (req as any).user?.userId;
      const {name, type, description, fileURL, issueDate, expiryDate} = req.body;
      const data: any = {
        name: name,
        type: type,
        description: description,
        userId: userId,
        fileURL: fileURL,
        issueDate: issueDate,
        expiryDate: expiryDate
      };
      const result: any = await certificateService.createNewCertificate(data);
      if (result.error != undefined || result.error) {
        return res.status(result.statusCode).json({ error: result.error });
      }
      return res.status(result.statusCode).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.messgae });
    }
  }

  async getCertificate(
    req: Request<any, any, GetCertificateRequest>, 
    res: Response
  ): Promise<Response> {
    const certificateService: ICertificateService = new CertificateService();
    try {
      // #swagger.tags = ['Certificates']
      // #swagger.summary = 'Get certificate'
      // #swagger.description = 'Get certificate by id' 
      /* #swagger.parameters['_id'] = {
          in: 'path',
          description: 'Certificate id',
          required: true,
          type: 'string'
        }

        #swagger.responses[200] = {
          description: 'Successfully',
          schema:{
            "message": {
              "message": "Get certificate successful",
              "statusCode": 200,
              "data": {
                "_id": "6673ce5fb2129c80b6779e2b",
                "name": "English",
                "type": "English",
                "description": "English Vip",
                "userId": "666bf5e7ae57ee0d95c4f670",
                "fileURL": "uploads/certificate/create/1718865503209-VipPro.pdf",
                "issueDate": "2022-07-18T17:00:00.000Z",
                "expiryDate": "2024-07-18T17:00:00.000Z"
              }
            }
          }
        }

        #swagger.responses[500] = {
          description: 'Error',
          schema: {
            "message": {
              "statusCode": 500,
              "message": "Certificate not found!"
            }
          }
        }
      */
      const {_id} = req.params;
      const result: any = await certificateService.getCertificateById(_id);
      return res.status(result.statusCode).json({message: result});
    } catch (error: any) {
        return res.status(500).json({error: error.messgae});
    }
  }

  async getAllCertificateByUserId(
    req: Request<any, any, GetAllCertificateRequest>, 
    res: Response
  ): Promise<Response> {
    const certificateService: ICertificateService = new CertificateService();
    try {
      // #swagger.tags = ['Certificates']
      // #swagger.summary = 'Get certificate'
      // #swagger.description = 'Get certificate by user id' 
      /* #swagger.parameters['userId'] = {
          in: 'path',
          description: 'User id',
          required: true,
          type: 'string'
        }

        #swagger.responses[200] = {
          description: 'Successfully',
          schema:{
            "message": {
              "message": "Get all certificate by user id successful",
              "statusCode": 200,
              "data": [
                {
                  "_id": "6673ce5fb2129c80b6779e2b",
                  "name": "English",
                  "type": "English",
                  "description": "English Vip",
                  "userId": "666bf5e7ae57ee0d95c4f670",
                  "fileURL": "uploads/certificate/create/1718865503209-VipPro.pdf",
                  "issueDate": "2022-07-18T17:00:00.000Z",
                  "expiryDate": "2024-07-18T17:00:00.000Z"
                }
              ]
            }
          }
        }

        #swagger.responses[500] = {
          description: 'Error',
          schema: {
            "message": {
              "statusCode": 500,
              "message": "This account has not uploaded any certificates yet"
            }
          }
        }
      */
      const {userId} = req.params;
      const result: any = await certificateService.getAllCertificateByUserId(userId);
      return res.status(result.statusCode).json({message: result});
    } catch (error: any) {
      return res.status(500).json({error: error.messgae});
    }
  }

  async getAllCertificate(
    req: Request<any, any, GetAllCertificateRequest>, 
    res: Response
  ): Promise<Response> {
    const certificateService: ICertificateService = new CertificateService();
    try {
      // #swagger.tags = ['Certificates']
      // #swagger.summary = 'Get all certificates'
      // #swagger.description = 'Get all certificates in database'
      /*
        #swagger.responses[200] = {
          description: 'Successfully',
          schema:{
            "message": {
              "message": "Get All certificates successful",
              "statusCode": 200,
              "data": [
                {
                  "_id": "66723c34138d5ecdf35faafb",
                  "userId": "66723c05138d5ecdf35faaee",
                  "fileURL": "uploads/certificate/create/1718762548094-CV_LuuDucHai_BackendIntern.pdf"
                },
                {
                  "_id": "6673ce5fb2129c80b6779e2b",
                  "name": "English",
                  "type": "English",
                  "description": "English Vip",
                  "userId": "666bf5e7ae57ee0d95c4f670",
                  "fileURL": "uploads/certificate/create/1718865503209-VipPro.pdf",
                  "issueDate": "2022-07-18T17:00:00.000Z",
                  "expiryDate": "2024-07-18T17:00:00.000Z"
                }
              ]
            }
          }
        }
      */
      const result: any = await certificateService.getAllCertificate();
      return res.status(result.statusCode).json({message: result});
    } catch (error: any) {
      return res.status(500).json({error: error.messgae});
    }
  }

  async updateCertificate(
    req: Request<any, any, UpdateCertificateRequest>, 
    res: Response
  ): Promise<Response> {
    const certificateService: ICertificateService = new CertificateService();
    try {
      // #swagger.tags = ['Certificates']
      // #swagger.summary = 'Update certificate'
      // #swagger.description = 'Update certificate by id'
      // #swagger.consumes = ['multipart/form-data']
      /*  
        #swagger.parameters['_id'] = {
          in: 'path',
          description: 'Certificate id',
          required: true,
          type: 'string'
        }
        #swagger.parameters['docs'] = {
          in: 'formData',
          type: 'file',
          required: 'false',
          description: 'Certificate file',
        }
        #swagger.parameters['name'] = {
          in: 'formData',
          type: 'string',
          required: 'false',
          description: 'Certificate name',
        }
        #swagger.parameters['type'] = {
          in: 'formData',
          type: 'string',
          required: 'false',
          description: 'Certificate type',
        }
        #swagger.parameters['description'] = {
          in: 'formData',
          type: 'string',
          required: 'false',
          description: 'Certificate description',
        }
        #swagger.parameters['issueDate'] = {
          in: 'formData',
          type: 'Date',
          required: 'false',
          description: 'issue date',
        }
        #swagger.parameters['expiryDate'] = {
          in: 'formData',
          type: 'Date',
          required: 'false',
          description: 'expiry date',
        }
        #swagger.parameters['isActive'] = {
          in: 'formData',
          type: 'boolean',
          required: 'false',
          description: 'Active?',
        }
        #swagger.parameters['isDeleted'] = {
          in: 'formData',
          type: 'boolean',
          required: 'false',
          description: 'Delete?',
        }

        #swagger.responses[200] = {
          description: 'Successfully',
          schema:{
            "message": {
              "message": "Update certificate successfully!",
              "statusCode": 200,
              "data": {
                "_id": "6673ce5fb2129c80b6779e2b",
                "name": "Tiếng Việt",
                "type": "Tiếng Việt",
                "description": "Tiếng Việt Vip",
                "userId": "666bf5e7ae57ee0d95c4f670",
                "fileURL": "uploads/certificate/create/1718865503209-VipPro.pdf",
                "issueDate": "2022-07-18T17:00:00.000Z",
                "expiryDate": "2024-07-18T17:00:00.000Z"
              }
            }
          }
        }
      */
      var data: any;
      const {_id} = req.params;
      const {name, type, description, issueDate, expiryDate, isActive, isDeleted} = req.body;
      if ((req as any)?.file) {
        const filename: string = (req as any).file?.filename;
        const fullpath: string = `uploads${req.url}/${filename}`;
        data = {
          name: name,
          type: type,
          description: description,
          fileURL: fullpath,
          issueDate: issueDate,
          expiryDate: expiryDate,
          isActive: isActive,
          isDeleted: isDeleted
        }
      }else{
        data = {
          name: name,
          type: type,
          description: description,
          issueDate: issueDate,
          expiryDate: expiryDate,
          isActive: isActive,
          isDeleted: isDeleted
        }
      }


      
      const result: any = await certificateService.updateCertificateById(_id, data);
      return res.status(result.statusCode).json({message: result});
    } catch (error: any) {
      return res.status(500).json({error: error.messgae});
    }
  }

  async deleteCertificate(
    req: Request<any, any, DeleteCertificateRequest>, 
    res: Response
  ): Promise<Response> {
    const certificateService: ICertificateService = new CertificateService();
    try {
      // #swagger.tags = ['Certificates']
      // #swagger.summary = 'Delete certificate'
      // #swagger.description = 'Delete certificate by id'
      /* #swagger.parameters['_id'] = {
          in: 'path',
          description: 'Certificate id',
          required: true,
          type: 'string'
        }

        #swagger.responses[200] = {
          description: 'Successfully',
          schema:{
            "message": {
              "message": "Delete certificate successfully!",
              "statusCode": 200
            }
          }
        }
      */
      const {_id} = req.params;
      const result: any = await certificateService.deleteCertificateById(_id);
      return res.status(result.statusCode).json({message: result});
    } catch (error: any) {
        return res.status(500).json({error: error.messgae});
    }
  }
}