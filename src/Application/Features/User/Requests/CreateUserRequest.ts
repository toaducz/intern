export class CreateUserRequest {
    public username: string;
    public password: string;
    public fullname: string;
    typeOfWork: string;
    careerGoal: string;
    gender: boolean;
    languageLevel: string;
    graduationTime: Date;
    hometown: string;
    education: string;
    imagePath: string;
    birthday: Date;
    phoneNumber: string;
    email: string;
    studentId: string;


    constructor(username: string, password: string, fullname: string, typeOfWork: string, careerGoal: string, gender: boolean, languageLevel: string, graduationTime: Date, hometown: string, education: string, imagePath: string, birthday: Date, phoneNumber: string, email: string, studentId: string) {
        this.username = username;
        this.password = password;
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