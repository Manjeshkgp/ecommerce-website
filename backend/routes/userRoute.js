import { Router } from "express";
import { registerUser,loginUser, getProducts, buyProduct, getAProduct, recentProducts, rateAProduct, getUserData, updateCart, addAddress, updateWishlist } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);
router.route("/get-products").get(getProducts); // no auth // pagination
router.route("/get-a-product").post(getAProduct); // no auth
router.route("/buy-product").post(auth,buyProduct);
router.route("/recent-products").get(recentProducts); // no auth
router.route("/rate-a-product/:productId").post(auth,rateAProduct);
router.route("/:email").get(auth,getUserData);
router.route("/:email/update-cart").post(auth,updateCart);
router.route("/add-address").post(auth,addAddress);
router.route("/update-wishlist").post(auth,updateWishlist);

export default router;