import { CreateCVRequest } from "../../Application/Features/CV/Requests/CreateCVRequest";
import { GetCVRequest } from "../../Application/Features/CV/Requests/GetCVRequest";
import { GetAllCVRequest } from "../../Application/Features/CV/Requests/GetAllCVRequest";
import { UpdateCVRequest } from "../../Application/Features/CV/Requests/UpdateCVRequest";
import { DeleteCVRequest } from "../../Application/Features/CV/Requests/DeleteCVRequest";
import { Request, Response } from "express";
import CVService from '../../Application/Features/CV/CVService';
import ICVService from '../../Application/Persistences/IServices/ICVService';

export default class CVController{

  private cvService: ICVService = new CVService();

  async createCV(
    req: Request<any, any, CreateCVRequest>,
    res: Response
  ): Promise<Response> {
    const cvService: ICVService = new CVService();
    try {
      // #swagger.tags = ['CVs']
      // #swagger.summary = 'Create new CV'
      // #swagger.description = 'Users create their own CVs'
      // #swagger.consumes = ['multipart/form-data']
      /*
        #swagger.parameters['docs'] = {
          in: 'formData',
          type: 'file',
          required: 'false',
          description: 'CV file',
        }


        #swagger.responses[201] = {
          description: 'Successfully',
          schema:{
            "message": "Successful",
            "statusCode": 201,
            "data": {
              "_id": "666bf5e7ae57ee0d95c4f670",
              "userId": "666bf5e7ae57ee0d95c4f670",
              "cvPath": "uploads/cv/create/1718863781696-VipPro.pdf",
              "isApproved": false
            }
          }
        }

        #swagger.responses[500] = {
          description: 'Error',
          schema: {
            "result": {
              "statusCode": 500,
              "message": "This user have been upload a CV, If you wanna change your CV, please update your CV"
            }
          }
        }

      */
      if ((req as any)?.file) {
        const filename: string = (req as any).file?.filename;
        const fullpath: string = `uploads${req.url}/${filename}`;
        req.body.cvPath = fullpath;
      }else{
        req.body.cvPath = "No file upload";
      }
      const userId: string = (req as any).user?.userId;
      const {cvPath} = req.body;
      const data: any = {
        userId: userId,
        cvPath: cvPath
      };
      const result: any = await cvService.createNewCV(data);
      if (result.error != undefined || result.error) {
        return res.status(result.statusCode).json({ error: result.error });
      }
      return res.status(result.statusCode).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.messgae });
    }
  }

  async getCV(
    req: Request<any, any, GetCVRequest>, 
    res: Response
  ): Promise<Response> {
    const cvService: ICVService = new CVService();
    try {
      // #swagger.tags = ['CVs']
      // #swagger.summary = 'Get CV'
      // #swagger.description = 'Get CV by id' 
      /* #swagger.parameters['_id'] = {
          in: 'path',
          description: 'CV id',
          required: true,
          type: 'string'
        }

        #swagger.responses[200] = {
          description: 'Successfully',
          schema:{
            "message": {
              "message": "Get CV successful",
              "statusCode": 200,
              "data": {
                "_id": "6673c7a582114c6c474191d3",
                "userId": "666bf5e7ae57ee0d95c4f670",
                "cvPath": "uploads/cv/create/1718863781696-VipPro.pdf",
                "isApproved": false
              }
            }
          }
        }

        #swagger.responses[500] = {
          description: 'Error',
          schema: {
            "message": {
              "statusCode": 500,
              "message": "CV not found!"
            }
          }
        }
      */
      
      
      const {_id} = req.params;
      const result: any = await cvService.getCVById(_id);
      return res.status(result.statusCode).json({message: result});
    } catch (error: any) {
        return res.status(500).json({error: error.messgae});
    }
  }

  async getCVByUserId(
    req: Request<any, any, GetCVRequest>, 
    res: Response
  ): Promise<Response> {
    const cvService: ICVService = new CVService();
    try {
      // #swagger.tags = ['CVs']
      // #swagger.summary = 'Get CV'
      // #swagger.description = 'Get CV by user id' 
      /* #swagger.parameters['userId'] = {
          in: 'path',
          description: 'user id',
          required: true,
          type: 'string'
        }

        #swagger.responses[200] = {
          description: 'Successfully',
          schema:{
            "message": {
              "message": "Get CV successful",
              "statusCode": 200,
              "data": {
                "_id": "6673c7a582114c6c474191d3",
                "userId": "666bf5e7ae57ee0d95c4f670",
                "cvPath": "uploads/cv/create/1718863781696-VipPro.pdf",
                "isApproved": false
              }
            }
          }
        }

        #swagger.responses[500] = {
          description: 'Error',
          schema: {
            "message": {
              "statusCode": 500,
              "message": "This account has not uploaded any CV yet"
            }
          }
        }
      */
    
      const {userId} = req.params;
      const result: any = await cvService.getCVByUserId(userId);
      return res.status(result.statusCode).json({message: result});
    } catch (error: any) {
        return res.status(500).json({error: error.messgae});
    }
  }

  async getCVByUser(
    req: Request<any, any, GetCVRequest>, 
    res: Response
  ): Promise<Response> {
    const cvService: ICVService = new CVService();
    try {
      // #swagger.tags = ['CVs']
      // #swagger.summary = 'Get CV'
      // #swagger.description = 'Get CV by user id' 
      /* 
        #swagger.security = [{
            "apiKeyAuth": []
        }] 
        #swagger.responses[200] = {
          description: 'Successfully',
          schema:{
            "message": {
              "message": "Get CV successful",
              "statusCode": 200,
              "data": {
                "_id": "6673c7a582114c6c474191d3",
                "userId": "666bf5e7ae57ee0d95c4f670",
                "cvPath": "uploads/cv/create/1718863781696-VipPro.pdf",
                "isApproved": false
              }
            }
          }
        }

        #swagger.responses[500] = {
          description: 'Error',
          schema: {
            "message": {
              "statusCode": 500,
              "message": "This account has not uploaded any CV yet"
            }
          }
        }
      */
    
      const userId: string = (req as any).user?.userId;
      const result: any = await cvService.getCVByUserId(userId);
      return res.status(result.statusCode).json({message: result});
    } catch (error: any) {
        return res.status(500).json({error: error.messgae});
    }
  }

  async getAllCV(
    req: Request<any, any, GetAllCVRequest>, 
    res: Response
  ): Promise<Response> {
    const cvService: ICVService = new CVService();
    try {
      // #swagger.tags = ['CVs']
      // #swagger.summary = 'Get all CVs'
      // #swagger.description = 'Get all CVs in database'
      /*
        #swagger.responses[200] = {
          description: 'Successfully',
          schema:{
            "message": {
              "message": "Get All CV successful",
              "statusCode": 200,
              "data": [
                {
                  "_id": "6673c7a582114c6c474191d3",
                  "userId": "666bf5e7ae57ee0d95c4f670",
                  "cvPath": "uploads/cv/create/1718863781696-VipPro.pdf",
                  "isApproved": false
                }
              ]
            }
          }
        }
      */
      const result: any = await cvService.getAllCV();
      return res.status(result.statusCode).json({message: result});
    } catch (error: any) {
      return res.status(500).json({error: error.messgae});
    }
  }

  async updateCV(
    req: Request<any, any, UpdateCVRequest>, 
    res: Response
  ): Promise<Response> {
    const cvService: ICVService = new CVService();
    try {
      // #swagger.tags = ['CVs']
      // #swagger.summary = 'Update CV'
      // #swagger.description = 'Update CV by id'
      // #swagger.consumes = ['multipart/form-data']
      /*  
        #swagger.parameters['_id'] = {
          in: 'path',
          description: 'CV id',
          required: true,
          type: 'string'
        }
        #swagger.parameters['docs'] = {
          in: 'formData',
          type: 'file',
          required: 'false',
          description: 'CV file',
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
        #swagger.parameters['isApproved'] = {
          in: 'formData',
          type: 'boolean',
          required: 'false',
          description: 'Approve?',
        }

        #swagger.responses[200] = {
          description: 'Successfully',
          schema:{
            "message": {
              "message": "Update CV successfully!",
              "statusCode": 200,
              "data": {
                "_id": "6673c7a582114c6c474191d3",
                "userId": "666bf5e7ae57ee0d95c4f670",
                "cvPath": "uploads/cv/create/1718863781696-VipPro.pdf",
                "isApproved": false
              }
            }
          }
        }
      */
      var data: any
      const {_id} = req.params;
      const {isActive, isDeleted, isApproved} = req.body;
      if ((req as any)?.file) {
        const filename: string = (req as any).file?.filename;
        const fullpath: string = `uploads${req.url}/${filename}`;
        data = {
          isActive: isActive,
          isDeleted: isDeleted,
          cvPath: fullpath,
          isApproved: isApproved
        }
      }else{
        data = {
          isActive: isActive,
          isDeleted: isDeleted,
          isApproved: isApproved
        }
      }

      
      const result: any = await cvService.updateCVById(_id, data);
      return res.status(result.statusCode).json({message: result});
    } catch (error: any) {
      return res.status(500).json({error: error.messgae});
    }
  }

  async deleteCV(
    req: Request<any, any, DeleteCVRequest>, 
    res: Response
  ): Promise<Response> {
    const cvService: ICVService = new CVService();
    try {
      // #swagger.tags = ['CVs']
      // #swagger.summary = 'Delete CV'
      // #swagger.description = 'Delete CV by id'
      /* #swagger.security = [{
            "apiKeyAuth": []
          }]  
      #swagger.parameters['_id'] = {
          in: 'path',
          description: 'CV id',
          required: true,
          type: 'string'
        }

        #swagger.responses[200] = {
          description: 'Successfully',
          schema:{
            "message": {
              "message": "Delete CV successfully!",
              "statusCode": 200
            }
          }
        }
      */
      const {_id} = req.params;
      const result: any = await cvService.deleteCVById(_id);
      return res.status(result.statusCode).json({message: result});
    } catch (error: any) {
        return res.status(500).json({error: error.messgae});
    }
  }
}