import express, {Request, Response} from 'express';
import LogController from "../Controllers/LogController";
import {authenticateMiddleware} from "../Middlewares/authMiddleware";
import {hasPermission} from "../Middlewares/checkPermission";
import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";


const {authenticateToken} = require("../Middlewares/authMiddleware");
const router = express.Router();
const logController = new LogController();

// router.post('/log/create',authenticateMiddleware,hasPermission(BitwisePermissionEnums.ViewLog), logController.createLog);
router.get('/log/find/:logId',authenticateMiddleware,hasPermission(BitwisePermissionEnums.ViewLog), logController.findLogById);
router.get('/log/all',authenticateMiddleware,hasPermission(BitwisePermissionEnums.ViewLog), logController.findAllLog);
// router.put('/log/update/:logId',authenticateMiddleware,hasPermission(BitwisePermissionEnums.ViewLog), logController.updateLog);
// router.delete('/log/delete/:logId',authenticateMiddleware,hasPermission(BitwisePermissionEnums.ViewLog), logController.deleteLog);




module.exports = router;