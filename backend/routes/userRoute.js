import { Router } from "express";
import { getUser,registerUser } from "../controllers/userController.js";

const router = Router();

router.route("/:id").get(getUser);
router.route("/create").post(registerUser);

export default router;