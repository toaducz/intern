import {hasPermission} from "../Middlewares/checkPermission";
// const authenMiddleware = require('../Middlewares/authMiddleware')
// import { User } from '../../Domain/Entities/UserEntites';
import UserController from '../Controllers/UserController';
import {authenticateMiddleware, checkApiKey} from '../Middlewares/authMiddleware';
import {upload} from '../Middlewares/upImageMiddleware';
import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const express = require('express');

const router = express.Router();
const userController = new UserController();

interface User {
    userId: string;
    companyId: String;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

router.post('/user/create-candidate', userController.registerAccountCandidate);
// router.post('/user/create-company', userController.registerAccountCompany);
router.post('/user/login', userController.login)
router.get('/user/profile/:id', userController.getProfileCandidateById);
router.put('/user/profile-candidate', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnProfile), upload.single('image'), userController.updateProfileCandidate)
router.put('/company/profile-company', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageCompanyProfile), userController.updateProfileCompany)
router.delete('/user/:id',authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageUser), userController.deleteUser);
router.post('/user/change-password', userController.changePassword);
router.post('/user/refresh-token', authenticateMiddleware, userController.getNewToken);

//Create account for company employee
router.post('/user/create-employee', checkApiKey, userController.registerAccountEmployee);
router.get('/user/profile-employee/:_id',authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageCompanyEmployee), userController.getProfileEmployeeById);
router.put('/user/profile-employee/:_id',authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageCompanyEmployee), userController.updateProfileEmployee);
router.delete('/user/employee/:_id',authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageCompanyEmployee), userController.deleteEmployee);

module.exports = router;