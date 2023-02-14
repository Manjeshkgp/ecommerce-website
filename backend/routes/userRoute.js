import { Router } from "express";
import { registerUser,loginUser } from "../controllers/userController.js";

const router = Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);

export default router;