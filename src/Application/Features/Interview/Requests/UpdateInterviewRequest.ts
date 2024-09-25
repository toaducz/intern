import { Types } from 'mongoose';

export class updateInterviewRequest {
    public applicationId: String | Types.ObjectId ;
    public interviewerId: String | Types.ObjectId ;
    public intervieweeId: String | Types.ObjectId ;

    public state: string;

    public interviewSchedule: string;
    public interviewContent: string;
    public linkMeeting: string;
    public interviewResult: boolean;
}
