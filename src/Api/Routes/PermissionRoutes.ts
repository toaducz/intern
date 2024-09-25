import express from "express";
import PermissionsController from "../Controllers/PermissionController";
const router = express.Router();
const permissionController = new PermissionsController();

router.post('/permission/create', permissionController.createPermission);
router.get('/permission/all', permissionController.findAllPermission);
router.put('/permission/update/:permissionId', permissionController.updatePermission);
router.get('/permission/find/:permissionId', permissionController.findPermissionById);
router.delete('/permission/delete/:permissionId', permissionController.deletePermission);

module.exports = router;