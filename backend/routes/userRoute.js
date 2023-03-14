import { Router } from "express";
import { registerUser,loginUser, getProducts, buyAProduct, getAProduct, recentProducts, rateAProduct, getUserData } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);
router.route("/get-products").get(getProducts);
router.route("/get-a-product").post(getAProduct);
router.route("/buy-a-product").post(auth,buyAProduct);
router.route("/recent-products").get(recentProducts);
router.route("/rate-a-product/:productId").post(rateAProduct);
router.route("/:email").get(auth,getUserData);

export default router;