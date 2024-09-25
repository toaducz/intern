import {Job} from "../../Domain/Entities/JobEntities";
import {Notification} from "../../Domain/Entities/NotificationEntities";
import NotificationController from "../Controllers/NotificationController";
import NotificationRepository from "../../Infrastructure/Persistences/Respositories/NotificationRepository"; 
import NotificationService from "../../Application/Features/Notification/NotificationService";
import express from 'express';
import JobController from "../Controllers/JobController";
import JobRepository from "../../Infrastructure/Persistences/Respositories/JobRepository";
import JobService from "../../Application/Features/Job/JobService";
import {authenticateMiddleware} from '../Middlewares/authMiddleware';
import {hasPermission} from "../Middlewares/checkPermission";
import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums"; // lấy userId

declare global {
    namespace Express {
        interface Request {
            job?: typeof Job;
        }
    }
}

// const {authenticateToken, authorizationMiddleware} = require("../Middlewares/authMiddleware");

const router = express.Router();


const notiRepo = new NotificationRepository();
const notiService = new NotificationService(notiRepo);
const notificationController = new NotificationController(notiService)

const jobRepository = new JobRepository();
const jobService = new JobService(jobRepository);
const jobController = new JobController(jobService,notificationController);


// thêm authenticateMiddleware vào create để láy userId, chưa gắn hasPermission nên userId nào cũng tạo job được
router.post("/job/create", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnJob), jobController.CreateJob.bind(jobController));
router.get("/job/find/:id", jobController.GetJobById.bind(jobController));
router.put("/job/update/:id", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnJob), jobController.UpdateJobById.bind(jobController));
router.delete("/job/delete/:id", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnJob), jobController.DeleteJobById.bind(jobController));

//for admin
router.put("/job/changeStatus/:id",authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageJob), jobController.changeStatus.bind(jobController));

//for company
router.put("/job/changeStatusForCompany/:id",authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnJob), jobController.changeStatusForCompany.bind(jobController));

// ,authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageJob)
// getAlljob update thêm lấy theo status
router.get("/job/getAllForCandidate/:page", jobController.getAllJob.bind(jobController)); // getAllJobs
router.get("/job/findByCompany/:page", authenticateMiddleware,jobController.getJobByCompany.bind(jobController)); // get job  company(user) id login
router.get("/job/search/:page", jobController.searchJob.bind(jobController)); // search 

//gắn hasPermission vào sau
router.get('/admin/jobs/:page',authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageJob), jobController.getAllJobAdmin.bind(jobController));

//gắn hasPermission vào sau
router.post('/admin/jobs/:page', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageJob), jobController.findJobs.bind(jobController));
router.get('/job/getJobsByRole/:page', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageJob), jobController.getJobsByRole.bind(jobController));

module.exports = router;