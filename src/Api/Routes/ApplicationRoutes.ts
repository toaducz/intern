import express from "express";
import {Application} from "../../Domain/Entities/ApplicationEntites";
import ApplicationController from "../Controllers/ApplicationController";
import {authenticateMiddleware} from '../Middlewares/authMiddleware';
import {hasPermission} from "../Middlewares/checkPermission";
import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

declare global {
    namespace Express {
        interface Request {
            application?: typeof Application;
        }
    }
}
const router = express.Router();

// const applicationRepository = new ApplicationRepository();
// const applicationService = new ApplicationService(applicationRepository);
// const applicationController = new ApplicationController(applicationService);
const applicationController = new ApplicationController();

router.post('/application/create', authenticateMiddleware, hasPermission(BitwisePermissionEnums.SubmitOwnCv), applicationController.createApplication);
router.get('/application/:applicationId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ViewOwnApplication), applicationController.getApplication);
router.get('/application/detail/:applicationId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ViewOwnApplication), applicationController.getDetailApplication);
router.get('/application/job/:jobId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnJobApplication), applicationController.getAllApplicationByJobId);
router.get('/application/getbyuser', authenticateMiddleware, applicationController.getAllApplicationState);
// router.get('/application/:applicationId', applicationController.watchApplication);
// router.put('/application/approved/:applicationId', applicationController.approvedCV);
router.get('/application/export-job/:jobId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnJobApplication), applicationController.getExportApplicationByJobId);
router.get('/applications', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnJobApplication), applicationController.getAllApplication);
router.get('/application/', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnJobApplication), applicationController.filterGetApplication);
router.get('/application/cv/:cvId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnJobApplication), applicationController.getApplicationByCvId);
router.put('/application/:applicationId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageApplication), applicationController.updateApplication);
router.delete('/application/:applicationId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageApplication), applicationController.deleteApplication);
router.put('/application/changestatus/:applicationId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageApplication), applicationController.changeStatusApplication);

// authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageApplication),

module.exports = router;