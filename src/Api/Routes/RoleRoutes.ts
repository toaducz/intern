import express from 'express';

import RoleController from "../Controllers/RoleController";
import {authenticateMiddleware} from "../Middlewares/authMiddleware";
import {hasPermission} from "../Middlewares/checkPermission";
import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const {authenticateToken} = require("../Middlewares/authMiddleware");
const router = express.Router();
const roleController = new RoleController();


router.post('/role/create', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageUser), roleController.createRole);
router.get('/role/all', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageUser), roleController.findAllRole);
router.put('/role/update/:roleId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageUser), roleController.updateRole);
router.get('/role/find/:roleId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageUser), roleController.findRoleById);
router.delete('/role/delete/:roleId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageUser), roleController.deleteRole);
router.get('/role/permission', roleController.getPermission);

//Claim permission for role
router.post('/role/claimPermission', roleController.claimPermission);
router.post('/role/revokePermission', roleController.revokePermission);

// //--------TEST-------//
// //Test hasPermission middleware with BitwisePermissionEnums.SubmitOwnCv
// router.get('/role/testPermission', authenticateMiddleware, hasPermission(BitwisePermissionEnums.SubmitOwnCv), (req: Request, res: Response) => {
//     //#swagger.tags = ['Roles']
//     // #swagger.description = 'Test hasPermission middleware with BitwisePermissionEnums.SubmitOwnCv'
//
//     res.status(200).json({message: 'You have permission to access this route'});
// });
//
// //test hasPermission middleware with BitwisePermissionEnums.ManageUser
// router.get('/role/testPermission2', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageUser), (req: Request, res: Response) => {
//     //#swagger.tags = ['Roles']
//     // #swagger.description = 'Test hasPermission middleware with BitwisePermissionEnums.ManageUser'
//     res.status(200).json({message: 'You have permission to access this route'});
// })


module.exports = router;