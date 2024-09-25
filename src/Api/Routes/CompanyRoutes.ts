import express from 'express';
import CompanyController from "../Controllers/CompanyController";
import {authenticateMiddleware, checkApiKey} from "../Middlewares/authMiddleware";
import {hasPermission} from "../Middlewares/checkPermission";
import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const router = express.Router();
const companyController = new CompanyController();

interface Company {
    companyId: string;
}

declare global {
    namespace Express {
        interface Request {
            Company?: Company;
        }
    }
}

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

router.post("/company/create", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageCompany), companyController.createCompany);
router.post("/company/status/:_id", authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageCompany), companyController.changeStatusCompany);
router.get('/company/get-company/:companyId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageCompany), companyController.getCompanyById);
router.put('/company/update-company/:companyId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageOwnProfile), companyController.update);
router.delete('/company/delete-company/:companyId', authenticateMiddleware, hasPermission(BitwisePermissionEnums.ManageCompany), companyController.delete);
router.get("/company", companyController.getAllCompany);
router.post('/config-slot', checkApiKey, companyController.configSlot)

module.exports = router;