import { Router } from "express";
import { registerUser,loginUser, getProducts, buyAProduct, getAProduct } from "../controllers/userController.js";

const router = Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);
router.route("/get-products").get(getProducts);
router.route("/get-a-product").post(getAProduct);
router.route("/buy-a-product").post(buyAProduct);

export default router;