import {Router} from "express";
import { registerSeller,loginSeller } from "../controllers/sellerController.js";

const router = Router();

router.route("/create").post(registerSeller)
router.route("/login").post(loginSeller)

export default router;