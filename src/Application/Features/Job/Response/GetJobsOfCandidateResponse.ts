import { Types } from 'mongoose';
import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import { JobStatusEnums } from '../../../../Domain/Enums/JobStatusEnums';

interface JobData {
    _id: Types.ObjectId,
    title_VN: string,
    title_EN: string,
    position: string,
    typeOfWork: string,
    occupation: string,
    major: string,
    gender: boolean,
    expirationDate: string,
    startingSalary: string,
    vacanciesNum: string,
    city: string,
    district: string,
    address: string,
    description_VN: string,
    description_EN: string,
    requirement_VN: string,
    requirement_EN: string,
    benefit_VN: string,
    benefit_EN: string,
}

export class GetJobsOfCandidateResponse extends BaseResponse {
    private data: JobData[];

    constructor(message: string, statusCode: number, data: JobData[], error?: string) {
        super(message, statusCode, data, error);
        this.data = data.map(value => {
            return {
                _id: value._id,
                title_VN: value.title_VN,
                title_EN: value.title_EN,
                position: value.position,
                typeOfWork: value.typeOfWork,
                occupation: value.occupation,
                major: value.major,
                gender: value.gender,
                expirationDate: value.expirationDate,
                startingSalary: value.startingSalary,
                vacanciesNum: value.vacanciesNum,
                city: value.city,
                district: value.district,
                address: value.address,
                description_VN: value.description_VN,
                description_EN: value.description_EN,
                requirement_VN: value.requirement_VN,
                requirement_EN: value.requirement_EN,
                benefit_VN: value.benefit_VN,
                benefit_EN: value.benefit_EN,
            }
        })
    }
}