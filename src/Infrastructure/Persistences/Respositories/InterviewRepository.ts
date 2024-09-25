import { interview, InterviewWithBase } from "../../../Domain/Entities/InterviewEntities";
import IInterviewRepository from "../../../Application/Persistences/IRepositories/IInterviewRepository";
import mongoose, { ClientSession } from "mongoose";
import { UserWithBase } from "../../../Domain/Entities/UserEntites";
import { CompanyWithBase } from "../../../Domain/Entities/CompanyEntities";
import { AnyMxRecord } from "dns";

class InterviewRepository implements IInterviewRepository {

    async createInterview(queryData: any, session: ClientSession): Promise<typeof InterviewWithBase> {

        try {
            // const user = await UserWithBase.findOne({ _id: userID });
            // if(user){
            //     queryData.companyId = user.companyId;
            // }else{
            //     throw new Error("Error in Repository: " + "Not Found User");
            // };
            // console.log(queryData)
            const user: any = await UserWithBase.findOne({companyId:  queryData.companyId});

            if(user){
                queryData.interviewerId = user._id;
            }else{
                throw new Error("Error in InterviewRepository: Cant not found Users");
            }

            const interview: any = await InterviewWithBase.create([{

                applicationId: queryData.applicationId,
                interviewerId: queryData.interviewerId,
                intervieweeId: queryData.intervieweeId,

                state: queryData.state,

                interviewSchedule: queryData.interviewSchedule,
                interviewContent: queryData.interviewContent,
                linkMeeting: queryData.linkMeeting,
                interviewResult: queryData.interviewResult,
            }], { session });


            const interviewId = interview[0]._id;

            // khi tạo interview sẽ update id vào 2 user còn lại

            if(queryData.interviewerId){
                await UserWithBase.updateOne(
                    { _id: queryData.interviewerId },
                    { $set: { interviewId: interviewId } },
                    { session }
                );
            }

            if(queryData.intervieweeId){
                await UserWithBase.updateOne(
                    { _id: queryData.intervieweeId },
                    { $set: { interviewId: interviewId } },
                    { session }
                );
            }


            return interview[0];

        } catch (error: any) {

            throw new Error("Error at create in interviewRepository: " + error.message);

        }
    }

    async getInterviewById(queryData: any): Promise<typeof InterviewWithBase> {
        try {
            
            const query: any = {
                _id: queryData.id,
                // isDeleted: queryData.isDeleted,
            };

            // console.log(query);

            const interview: typeof InterviewWithBase[] = await InterviewWithBase.find(query).select('-isDeleted -isActive -createdAt -updatedAt -__v');
            // console.log(Job[0])
            return interview[0];

        } catch (error: any) {
            throw new Error("Error at getById in interviewRepository: " + error.message);
        }
    }

    async updateInterviewById(interviewId: string, updateData: any, session: ClientSession): Promise<void> {
        try {

            const _id = interviewId;

            updateData.updateAt = Date.now();

            const query = {
                ...updateData,
            }
            // console.log(query);
            const job: any = await InterviewWithBase.findByIdAndUpdate(_id, query, { session });
            // console.log(job);
        } catch (error: any) {
            throw new Error("Error at updateById in interviewRepository: " + error.message);
        }
    }

    async deleteInterviewById(inteviewID: string | mongoose.Types.ObjectId, session: ClientSession): Promise<void> {
        try {
            const _id = new mongoose.Types.ObjectId(inteviewID);

            const query = { isDeleted: true, }

            const job: any = await InterviewWithBase.findByIdAndUpdate(_id, query, { session });

            // return Job;
        } catch (error: any) {
            throw new Error("Error at deleteById in interviewRepository: " + error.message);
        }
    }
}

export default InterviewRepository;
