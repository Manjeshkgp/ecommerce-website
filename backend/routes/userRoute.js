import { Router } from "express";
import { registerUser,loginUser, getProducts, buyAProduct } from "../controllers/userController.js";

const router = Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);
router.route("/get-products").get(getProducts);
router.route("/buy-a-product").post(buyAProduct);

export default router;