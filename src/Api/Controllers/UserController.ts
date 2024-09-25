import UserService from "../../Application/Features/User/UserService";
import IUserService from "../../Application/Persistences/IServices/IUserService";
import {StatusCodeEnums} from "../../Domain/Enums/StatusCodeEnums";
import {Request, Response} from 'express';
import {CreateUserRequest} from "../../Application/Features/User/Requests/CreateUserRequest";
import {LoginRequest} from "../../Application/Features/User/Requests/LoginRequest";
import {UpdateCompanyRequest} from "../../Application/Features/User/Requests/UpdateCompanyRequest";
import {UpdateCandidateRequest} from "../../Application/Features/User/Requests/UpdateCandidateRequest";
import {ChangePasswordRequest} from '../../Application/Features/User/Requests/ChangePasswordRequest';
import {GetUserRequest} from "../../Application/Features/User/Requests/GetUserRequest";
import {DeleteEmployee} from "../../Application/Features/User/Requests/DeleteEmployee";
import {UpdateProfileEmployee} from "../../Application/Features/User/Requests/UpdateProfileEmployee";
import {RoleEnums} from "../../Domain/Enums/RoleEnums";

export default class UserController {
    private userService: IUserService = new UserService();

    registerAccountCandidate = async (req: Request<any, any, CreateUserRequest>, res: Response) => {
        try {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Register account with username, password and name of candidate'
            // #swagger.description = 'This API is used for candidate to create accounts on website'
            /*  
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Add new user with some informations',
                    schema: {
                        "fullname": "Lưu Đức Hải",
                        "username": "luuduchai",
                        "password": "123456",
                        "typeOfWork": "Full-time",
                        "careerGoal": "Trở thành Full-Nack Developer",
                        "gender": true,
                        "languageLevel": "B2",
                        "graduationTime": "2024-09-30",
                        "hometown": "Hải Phòng",
                        "education": "Đại học Tôn Đức Thắng",
                        "imagePath": "uploads/user/profile-candidate/1718352690139-profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
                        "birthday": "2000-05-15",
                        "phoneNumber": "0123456789",
                        "email": "luuduchai@gmail.com",
                        "studentId": "52000123"
                    }
                } 

                #swagger.responses[201] = {
                    description: 'Successfully',
                    schema: {
                        "message": "created account successfully",
                        "statusCode": 201 
                    }
                }

                #swagger.responses[400] = {
                    description: 'Error',
                    schema: {
                        'statusCode': 400,
                        'message': 'Username is already exists'
                    }
                }
            */

            const {
                username,
                password,
                fullname,
                typeOfWork,
                careerGoal,
                gender,
                languageLevel,
                graduationTime,
                hometown,
                education,
                imagePath,
                birthday,
                phoneNumber,
                email,
                studentId
            } = req.body;

            const data = {
                username,
                password,
                fullname,
                typeOfWork,
                careerGoal,
                gender,
                languageLevel,
                graduationTime,
                hometown,
                education,
                imagePath,
                birthday,
                phoneNumber,
                email,
                studentId
            }

            // console.log(data);

            const result = await this.createUser(data, RoleEnums.RoleCandidate);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            //#swagger.responses[201] = { description: 'Successfully' }
            return res.status(StatusCodeEnums.Created_201).json(result);

        } catch (error: any) {
            // #swagger.responses[500] = { description: 'Error' }
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    createUser = async (userData: any, rolename: string): Promise<any> => {
        const {username, password, name} = userData;
        const result = await this.userService.registerAccount(userData, rolename);
        return result;
    }

    login = async (req: Request<any, any, LoginRequest>, res: Response) => {
        try {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Login account with username and password'
            // #swagger.description = 'Login with Json Web Token, return a pair of access token and refresh token, frontend will storage these keys and attach they to header author. In addition, backend will automatic storage access token on cookie of client with httpOnly mode'
            /*  
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'username & password',
                    schema: {
                        "username": "duchai",
                        "password": "123456"
                    }
                } 

                #swagger.responses[201] = {
                    description: 'Successfully',
                    schema: {
                        "message": "Login successfully",
                        "statusCode": 200,
                        "data": {
                            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZhYjhiYTdmZWQ0ZmZkZGYyNTk1NTgiLCJpYXQiOjE3MTgyNzAxNTQsImV4cCI6MTcxODMwNjE1NH0.EQ7DzPawuiLCyUQJc0CvcNgUJpN7AFvEnI8-bs5TF1Q",
                            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZhYjhiYTdmZWQ0ZmZkZGYyNTk1NTgiLCJpYXQiOjE3MTgyNzAxNTQsImV4cCI6MTcxODMwNjE1NH0.O8pyUzJ44qNl0_KiSkpSQmRa8bANAuimlMNtIECnvEY"
                        }
                    }
                }

                #swagger.responses[400] = {
                    description: 'Error',
                    schema: {
                        "result": {
                            "statusCode": 400,
                            "message": "Username or password is incorrect"
                        }
                    }
                }
            */
            const { username, password } = req.body;
            const result: any = await this.userService.login({ username, password });
            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            res.cookie('access_token', result.data?.accessToken, {
                httpOnly: true, //Config cookie just accessed by server
                // signed: true, //Cookie secure, prevents client-side modifications
                maxAge: 10 * 60 * 60 * 1000, //Expires after 10 hours
                // sameSite: 'none',
                // secure: true // Cookies are only transmitted over a secure channel (eg: https protocol)
            })

            return res.status(StatusCodeEnums.Created_201).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    getProfileCandidateById = async (req: Request, res: Response): Promise<Response> => {
        try {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Get user candidate profile'
            // #swagger.description = 'Get information of the candidate user by user id. This api can be used by company employee to get candidate profile'
            // #swagger.parameters['id'] = { in: 'path', schema: "666bc56fcc7a332f032bc0e5", required: 'true' }
            /*  
                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "message": "Get user's information successfully",
                        "statusCode": 200,
                        "data": {
                            "_id": "666bf5e7ae57ee0d95c4f670",
                            "fullname": "Nguyễn Văn A",
                            "typeOfWork": "Full-time",
                            "careerGoal": "Trở thành chuyên gia về trí tuệ nhân tạo",
                            "gender": true,
                            "languageLevel": "Advanced",
                            "graduationTime": "2024-06-30T00:00:00.000Z",
                            "hometown": "Hà Nội",
                            "education": "Đại học Bách Khoa Hà Nội",
                            "imagePath": "uploads/user/profile-candidate/1718352690139-profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
                            "birthday": "2000-05-15T00:00:00.000Z",
                            "phoneNumber": "0123456789",
                            "email": "nguyenvana@default.com",
                            "studentId": "20184001"
                        }
                    }
                }
            */

            const id = req.params.id;
            if (!id)
                return res.status(400).json({error: 'Please check login status'})
            const result = await this.userService.getUserCandidateById(id);

            return res.status(200).json(result)
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<any> => {
        try {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Delete user'
            // #swagger.description = 'This api perform by admin, deletes account by user id'
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /*  
                #swagger.parameters['id'] = { 
                    description: 'User id',
                    schema: '666bc56fcc7a332f032bc0e5'
                }
                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "message": "deleted user successfully",
                        "statusCode": 200
                    }
                }
                #swagger.responses[400] = {
                    description: 'Error',
                    schema: {
                        "statusCode": 400,
                        "message": "User is not found!"    
                    }
                }
            */
            const userId: string = req.params.id;

            const result = await this.userService.deleteUserById(userId);

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    }

    updateProfileCandidate = async (req: Request<any, any, UpdateCandidateRequest>, res: Response): Promise<any> => {
        try {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Update candidate profile'
            // #swagger.description = 'Update candidate profile with candidate information as well as image profile. You can use this api to show candidates infor when they apply a job, so they can edit their personal information if any, and also force candidates to fill in personal information in the form before submitting. The user id will be obtained based on the access token provided from authorization'
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            // #swagger.consumes = ['multipart/form-data']
            /*
                #swagger.parameters['image'] = {
                    in: 'formData',
                    type: 'file',
                    required: 'false',
                    description: 'User image',
                }

                #swagger.parameters['fullname'] = {
                    in: 'formData',
                    type: 'string',
                    required: false,
                    description: 'Full name of the user',
                    default: 'Nguyễn Văn A'
                }

                #swagger.parameters['typeOfWork'] = {
                    in: 'formData',
                    type: 'string',
                    required: false,
                    description: 'Type of work',
                    default: 'Full-time'
                }

                #swagger.parameters['careerGoal'] = {
                    in: 'formData',
                    type: 'string',
                    required: false,
                    description: 'Career goal',
                    default: 'Trở thành chuyên gia về trí tuệ nhân tạo'
                }

                #swagger.parameters['gender'] = {
                    in: 'formData',
                    type: 'boolean',
                    required: false,
                    description: 'Gender, true is female, false is male',
                    default: true
                }

                #swagger.parameters['languageLevel'] = {
                    in: 'formData',
                    type: 'string',
                    required: false,
                    description: 'Language level',
                    default: 'Advanced'
                }

                #swagger.parameters['graduationTime'] = {
                    in: 'formData',
                    type: 'string',
                    required: false,
                    description: 'Graduation time',
                    default: '2024-06-30'
                }

                #swagger.parameters['hometown'] = {
                    in: 'formData',
                    type: 'string',
                    required: false,
                    description: 'Hometown',
                    default: 'Hà Nội'
                }

                #swagger.parameters['education'] = {
                    in: 'formData',
                    type: 'string',
                    required: false,
                    description: 'Education',
                    default: 'Đại học Bách Khoa Hà Nội'
                }

                #swagger.parameters['birthday'] = {
                    in: 'formData',
                    type: 'string',
                    required: false,
                    description: 'Birthday',
                    default: '2000-05-15'
                }

                #swagger.parameters['phoneNumber'] = {
                    in: 'formData',
                    type: 'string',
                    required: false,
                    description: 'Phone number',
                    default: '0123456789'
                }

                #swagger.parameters['email'] = {
                    in: 'formData',
                    type: 'string',
                    required: false,
                    description: 'Email address',
                    default: 'nguyenvana@example.com'
                }

                #swagger.parameters['studentId'] = {
                    in: 'formData',
                    type: 'string',
                    required: false,
                    description: 'Student ID',
                    default: '20184001'
                }

                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "message": "updated user successfully",
                        "statusCode": 200    
                    }
                }
            */
            if ((req as any)?.file) {
                const filename: string = (req as any).file?.filename;
                const fullpath: string = `uploads${req.url}/${filename}`;
                req.body.imagePath = fullpath;
            }

            const userId: string = (req as any).user?.userId;
            if (!userId)
                return res.status(400).json({error: 'Please check login status'})

            const updateData = req.body as any;
            const result = await this.userService.updateProfile(userId, updateData);

            return res.status(200).json(result)
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    }

    updateProfileCompany = async (req: Request<any, any, UpdateCompanyRequest>, res: Response): Promise<Response> => {
        try {
            // #swagger.tags = ['Companys']
            // #swagger.summary = 'Update company profile'
            // #swagger.description = 'Update company profile with some informations. The user id will be obtained based on the access token provided from authorization'
            /*
                #swagger.security = [{
                    "apiKeyAuth": []
                }] 
            */
            /*
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'some informations',
                    schema: {
                        "companyName": "Công ty TNHH ABC",
                        "industry": "Công nghệ thông tin",
                        "location": "Hà Nội",
                        "companySize": "100-200",
                        "address": "Số 123, Đường ABC, Quận XYZ, Hà Nội",
                        "website": "https://www.congtyabc.com",
                        "contactInfo": "contact@congtyabc.com"
                    }
                } 

                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "result": {
                            "message": "updated user successfully",
                            "statusCode": 200
                        }
                    }
                }
            */

            var userId: string = '';
            if ((req as any).user?.userId)
                userId = (req as any).user.userId;
            else
                return res.status(400).json({error: 'Please check login status'})

            const updateData = req.body as any;

            const result = await this.userService.updateProfile(userId, updateData);

            return res.status(200).json(result)
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    }

    changePassword = async (req: Request<any, any, ChangePasswordRequest>, res: Response): Promise<any> => {
        try {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Change password'
            // #swagger.description = 'Change password and get new token'
            /*
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'enter old and new pass word',
                    schema: {
                        "oldPassword": "123456",
                        "newPassword": "123123",
                    }
                } 

                #swagger.responses[200] = {
                    description: 'Successfully',
                    schema: {
                        "message": "Change pass successfully",
                        "statusCode": 200,
                        "data": {
                            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZhYjhjMzdmZWQ0ZmZkZGYyNTk1NWMiLCJpYXQiOjE3MTgyNzAyMzYsImV4cCI6MTcxODMwNjIzNn0.3-FC12nvzxdkn2fQygueJOSr4zFGbGa5Snd2MeWOQoU",
                            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZhYjhjMzdmZWQ0ZmZkZGYyNTk1NWMiLCJpYXQiOjE3MTgyNzAyMzYsImV4cCI6MTcxODMwNjIzNn0.FZjk64saVGh1ptlGzz8Ddxg5MeG0sr-qt_8EZymFiYA"
                        }  
                    }
                }
            */

            var userId: string = '';
            if ((req as any).user?.userId)
                userId = (req as any).user.userId;
            else
                return res.status(400).json({error: 'Please check login status'})

            const data = req.body;

            const result = await this.userService.changePassword(userId, data);

            return res.status(200).json(result)
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    }
    registerAccountEmployee = async (req: Request<any, any, CreateUserRequest>, res: Response) => {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Register account with username, password and name of employee'
        // #swagger.description = 'This API is used for company employee to create accounts on website'

        /* #swagger.security = [{
            "apiKeyAuth": []
        }] */

        /*
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'enter old and new pass word',
                schema: {
                    "fullname": "MTP Company",
                    "username": "mtpcompany",
                    "password": "123456"
                }
            }
        */

        try {
            // console.log("Request user: ", req.user);
            //Request user:  { companyId: new ObjectId('6673c5eb9d595d89fd369481') }

            const {username, password, fullname} = req.body;

            const companyId = req.user?.companyId;

            if (companyId == undefined) {
                // #swagger.responses[400] = { description: 'Error' }
                return res.status(StatusCodeEnums.BadRequest_400).json({error: 'API Key is invalid'})
            }

            const rolename = RoleEnums.RoleCompanyEmployee;

            const result = await this.userService.registerAccount({username, password, fullname, companyId}, rolename);

            // console.log(result);

            //#swagger.responses[201] = { description: 'Successfully' }
            return res.status(StatusCodeEnums.Created_201).json(result);
        } catch (error: any) {
            // #swagger.responses[500] = { description: 'Error' }
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }
    getProfileEmployeeById = async (req: Request<GetUserRequest, any, any>, res: Response): Promise<any> => {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Get user employee profile'
        // #swagger.description = 'Get information of the employee user by user id'

        /*
            #swagger.parameters['_id'] = {
                in: 'path',
                description: 'User id',
                required: true,
                type: 'string',
                example: '667299494ade6a7563b4c535'
            }
         */

        try {
            const {_id} = req.params;
            if (!_id)
                // #swagger.responses[400] = { description: 'Error' }
                return res.status(StatusCodeEnums.BadRequest_400).json({error: 'Invalid user id'});
            // console.log(_id);

            const result = await this.userService.getEmployeeProfile(_id);

            //#swagger.responses[200] = { description: 'Successfully' }
            return res.status(StatusCodeEnums.OK_200).json(result);

        } catch (error: any) {

            // #swagger.responses[500] = { description: 'Error' }
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }
    updateProfileEmployee = async (req: Request<UpdateProfileEmployee, any, UpdateCandidateRequest>, res: Response): Promise<any> => {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Update employee profile'
        /*
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Update employee profile',
                schema: {
                    "fullname": "X Company",
                    }
                }

            #swagger.parameters['_id'] = {
                in: 'path',
                description: 'User id',
                required: true,
                type: 'string',
                example: '667299494ade6a7563b4c535'
            }

         */

        try {
            const {_id} = req.params;
            const updateData = req.body;

            if (!_id)
                // #swagger.responses[400] = { description: 'Error' }
                return res.status(StatusCodeEnums.BadRequest_400).json({error: 'Invalid user id'});

            if (!updateData)
                // #swagger.responses[400] = { description: 'Error' }
                return res.status(StatusCodeEnums.BadRequest_400).json({error: 'Invalid update data'});

            const result = await this.userService.updateEmployeeProfile(_id, updateData);

            //#swagger.responses[200] = { description: 'Successfully' }
            return res.status(StatusCodeEnums.OK_200).json(result);

        } catch (error: any) {
            // #swagger.responses[500] = { description: 'Error' }
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }
    deleteEmployee = async (req: Request<DeleteEmployee, any, any>, res: Response): Promise<any> => {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Delete employee'
        // #swagger.description = 'Delete employee by user id'

        /*
            #swagger.parameters['_id'] = {
                in: 'path',
                description: 'User id',
                required: true,
                type: 'string',
                example: '667299494ade6a7563b4c535'
            }
         */
        try {
            const {_id} = req.params;

            if (!_id)
                // #swagger.responses[400] = { description: 'Error' }
                return res.status(StatusCodeEnums.BadRequest_400).json({error: 'Invalid user id'});

            const result = await this.userService.deleteUserById(_id);

            //#swagger.responses[200] = { description: 'Successfully' }
            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            // #swagger.responses[500] = { description: 'Error' }
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    getNewToken = async (req: Request, res: Response): Promise<any> => {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Get new access token'
        // #swagger.description = 'Get new access token'
        /*
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'refreshToken',
                schema: {
                    "refreshToken": "",
                }
            }
            
            #swagger.responses[200] = {
                description: 'Successfully',
                schema: {
                    "statusCode": 200,
                    "data": {
                        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjY3Mjk5NDk0YWRlNmE3NTYzYjRjNTM1IiwiaWF0IjoxNzE4ODgzMDEwLCJleHAiOjE3MTg5MTkwMTB9.lurzOYZnEwehvseo2_vZO5jbRf2KsCfl_iWh_-Hd2ls"
                    }
                }
            }
        */
        try {
            const refreshToken = req.body.refreshToken;
            if (!refreshToken)
                return res.status(401).send('Access Denied. No refresh token provided.');

            const result = await this.userService.getNewToken(refreshToken);
            // console.log(result)

            // #swagger.responses[200] = { description: 'Successfully'}
            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            // #swagger.responses[500] = { description: 'Error' }
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }
}