export class UpdateCandidateRequest {
    public fullname: string;
    public typeOfWork: string;
    public careerGoal: string;
    public gender: boolean;
    public languageLevel: string;
    public graduationTime: string;
    public hometown: string;
    public education: string;
    public imagePath: string;
    public birthday: string;
    public phoneNumber: string;
    public email: string;
    public studentId: string;


    constructor(fullname: string, typeOfWork: string, careerGoal: string, gender: boolean, languageLevel: string, graduationTime: string, hometown: string, education: string, imagePath: string, birthday: string, phoneNumber: string, email: string, studentId: string) {
        this.fullname = fullname;
        this.typeOfWork = typeOfWork;
        this.careerGoal = careerGoal;
        this.gender = gender;
        this.languageLevel = languageLevel;
        this.graduationTime = graduationTime;
        this.hometown = hometown;
        this.education = education;
        this.imagePath = imagePath;
        this.birthday = birthday;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.studentId = studentId;
    }
}