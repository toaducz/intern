import mongoose, { ClientSession } from "mongoose";
import { CoreException } from '../../Common/Exceptions/CoreException';


interface IInterviewService {
    createInterviewService(queryData: any,userId:string): Promise<any>;
    getInterviewByIdService(queryData: any): Promise<any>;   
    updateInterviewByIdService(jobId: string, updateData: any, ): Promise<any>;
    deleteInterviewByIdService(jobId: string ): Promise<any>;
}

export default IInterviewService;