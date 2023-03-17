import { Router } from "express";
import { registerUser,loginUser, getProducts, buyProduct, getAProduct, recentProducts, rateAProduct, getUserData, updateCart } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);
router.route("/get-products").get(getProducts); // no auth
router.route("/get-a-product").post(getAProduct); // no auth
router.route("/buy-product").post(auth,buyProduct);
router.route("/recent-products").get(recentProducts); // no auth
router.route("/rate-a-product/:productId").post(rateAProduct); // auth
router.route("/:email").get(auth,getUserData);
router.route("/:email/update-cart").post(auth,updateCart);

export default router;