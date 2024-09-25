import { HasInterviewStateEnums } from "../../../Domain/Enums/InterviewStateEnums";

export function checkValueInterviewStateEnum (stateName: string): boolean {
    try {
        const values: string[] = Object.values(HasInterviewStateEnums)
        return values.includes(stateName);
    }
    catch (error: any) {
        throw new Error(`Error occured at checkValueInterviewStateEnum helper: ${error.message}`)
    }
}