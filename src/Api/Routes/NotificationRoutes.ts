import {Notification} from "../../Domain/Entities/NotificationEntities";
import express from 'express';
import NotificationController from "../Controllers/NotificationController";
import NotificationRepository from "../../Infrastructure/Persistences/Respositories/NotificationRepository"; 
import NotificationService from "../../Application/Features/Notification/NotificationService";
import {authenticateMiddleware} from "../Middlewares/authMiddleware";

declare global {
    namespace Express {
        interface Request {
            notification?: typeof Notification;
        }
    }
}


const router = express.Router();    

const notiRepository = new NotificationRepository();
const notiService = new NotificationService(notiRepository);
const notiController = new NotificationController(notiService);

// chỉ admin tạo thông báo? - UserId mặc định trong Entity
router.post("/notification/create", notiController.CreateNoti.bind(notiController));
router.get("/notification/find/:id", notiController.GetNotiById.bind(notiController));
router.put("/notification/update/:id", notiController.UpdateNotiById.bind(notiController));
router.delete("/notification/delete/:id", notiController.DeleteNotiById.bind(notiController));
// lấy thông báo theo userID đang login
router.get("/notification/getAllByUser/:page", authenticateMiddleware, notiController.GetNotiByUserId.bind(notiController)); 
//update isRead == true
router.put("/notification/isRead/:id", notiController.updateIsRead.bind(notiController));



module.exports = router;