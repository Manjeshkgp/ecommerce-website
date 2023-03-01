import { Router } from "express";
import { adminLogin } from "../controllers/adminController.js";

const router = Router();

router.route('/login').post(adminLogin)

export default router;