import express from 'express';
import CVController from "../Controllers/CVController";
import {upload} from '../Middlewares/upDocsMiddleware';
import {authenticateMiddleware} from "../Middlewares/authMiddleware";
import {hasPermission} from "../Middlewares/checkPermission";
import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const router = express.Router();
const cvController = new CVController();

router.post("/cv/create", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnCV), upload.single('docs'), cvController.createCV);
router.get("/cv/get/:_id", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnCV), cvController.getCV);
router.get("/cv/getbyuser/:userId", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnCV), cvController.getCVByUserId);
router.get("/cv/getbyuser", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnCV), cvController.getCVByUser);
router.get("/cv/getall/", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnCV), cvController.getAllCV);
router.put("/cv/update/:_id", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnCV), upload.single('docs'), cvController.updateCV);
router.delete("/cv/delete/:_id", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnCV), cvController.deleteCV);

module.exports = router;