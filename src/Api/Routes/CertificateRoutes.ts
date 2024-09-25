import express from 'express';
import CertificateController from "../Controllers/CertificateController";
import { upload } from '../Middlewares/upDocsMiddleware';
import {authenticateMiddleware} from "../Middlewares/authMiddleware";
import {hasPermission} from "../Middlewares/checkPermission";
import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const router = express.Router();
const certificateController = new CertificateController();

router.post("/certificate/create",authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnProfile) ,upload.single('docs'), certificateController.createCertificate);
router.get("/certificate/get/:_id",authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnProfile), certificateController.getCertificate);
router.get("/certificate/getbyuser/:userId",authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnProfile), certificateController.getAllCertificateByUserId);
router.get("/certificate/getall/",authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnProfile), certificateController.getAllCertificate);
router.put("/certificate/update/:_id",authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnProfile),upload.single('docs'), certificateController.updateCertificate);
router.delete("/certificate/delete/:_id",authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnProfile), certificateController.deleteCertificate);

module.exports = router;