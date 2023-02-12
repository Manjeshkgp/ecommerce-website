import { Router } from "express";
import passport from "passport";
import { authenticateGoogle,authenticateGoogleResult,loginFailed } from "../controllers/authController.js";

const router = Router();

router.route("/google").get(authenticateGoogle);
router.route("/google/callback",passport.authenticate("google", {
    failureRedirect: "/failed",
    successRedirect:process.env.FRONTEND_URL,
    // session: false,
  })).get(authenticateGoogleResult);
router.route("/google/callback/failed").get(loginFailed);

export default router;