import mongoose, { ClientSession } from "mongoose";
import {InterviewWithBase } from "../../../Domain/Entities/InterviewEntities";

interface IInterviewRepository {

    createInterview(queryData: any, session: ClientSession): Promise<typeof InterviewWithBase>;
    getInterviewById(queryData: any): Promise<typeof InterviewWithBase | null>;   
    updateInterviewById(jobId: string ,updateData: any, session: ClientSession): Promise<void>;
    deleteInterviewById(jobId: string, session: ClientSession): Promise<void>;
}

export default IInterviewRepository;