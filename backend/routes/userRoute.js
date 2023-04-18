import { Router } from "express";
import { registerUser,loginUser, getProducts, getAProduct, recentProducts, rateAProduct, getUserData, updateCart, addAddress, updateWishlist, searchProducts, searchBrandedProducts, checkout, paymentVerification } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);
router.route("/get-products").get(getProducts); // no auth // pagination
router.route("/get-a-product").post(getAProduct); // no auth
router.route("/buy-product").post(auth,checkout);
router.route("/paymentverification").post(paymentVerification);
router.route("/recent-products").get(recentProducts); // no auth
router.route("/rate-a-product/:productId").post(auth,rateAProduct);
router.route("/add-address").post(auth,addAddress);
router.route("/update-wishlist").post(auth,updateWishlist);
router.route("/search").get(searchProducts);
router.route("/brands").get(searchBrandedProducts);
router.route("/:email").get(auth,getUserData);
router.route("/:email/update-cart").post(auth,updateCart);

export default router;