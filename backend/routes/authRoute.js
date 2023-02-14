import { Router } from "express";
import passport from "passport";
import { authenticateGoogle,authenticateGoogleResult,loginFailed,getUserData } from "../controllers/authController.js";

const router = Router();

router.route("/google").get(authenticateGoogle);
router.route("/google/callback").get(passport.authenticate("google", {
    failureRedirect: "/failed",
    // successRedirect:process.env.FRONTEND_URL,
    // session: false,
  }),authenticateGoogleResult)
router.route("/google/callback/failed").get(loginFailed);
router.route("/google/get-user-data").get(passport.authenticate("jwt",{session:false}),getUserData)

export default router;