import { Router } from "express";
import { adminLogin,forgetPassword,getBusinessData } from "../controllers/adminController.js";

const router = Router();

router.route('/login').post(adminLogin);
router.route('/forget-password').post(forgetPassword)
router.route('/business-data').get(getBusinessData);

export default router;