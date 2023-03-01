import { Router } from "express";
import { adminLogin,getBusinessData } from "../controllers/adminController.js";

const router = Router();

router.route('/login').post(adminLogin);
router.route('/business-data').get(getBusinessData);

export default router;