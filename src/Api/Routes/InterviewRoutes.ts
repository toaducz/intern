import {interview} from "../../Domain/Entities/InterviewEntities";

import express from 'express';
import InterviewController from "../Controllers/InterviewController";
import InterviewRepository from "../../Infrastructure/Persistences/Respositories/InterviewRepository";
import InterviewService from "../../Application/Features/Interview/InterviewService";
import {authenticateMiddleware} from '../Middlewares/authMiddleware';
import {hasPermission} from "../Middlewares/checkPermission";
import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums"; // lấy userId

declare global {
    namespace Express {
        interface Request {
            interview?: typeof interview;
        }
    }
}

// const {authenticateToken, authorizationMiddleware} = require("../Middlewares/authMiddleware");

const router = express.Router();



const interviewRepository = new InterviewRepository();
const interviewService = new InterviewService(interviewRepository);
const interviewController = new InterviewController(interviewService);

router.post("/interview/create",authenticateMiddleware,  interviewController.CreateInterview.bind(interviewController));
router.get("/interview/find/:id", interviewController.GetInterviewById.bind(interviewController));
router.put("/interview/update/:id",  interviewController.UpdateInterviewById.bind(interviewController));
router.delete("/interview/delete/:id", interviewController.DeleteInterviewById.bind(interviewController));



module.exports = router;