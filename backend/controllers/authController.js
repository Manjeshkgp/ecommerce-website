import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const authenticateGoogle = passport.authenticate("google", { scope: ["profile","email"] });

export const authenticateGoogleResult = async (req, res) => {
//   passport.authenticate("google", {
//     failureRedirect: "/failed",
//     successRedirect:process.env.FRONTEND_URL,
//     // session: false,
//   });
  
  const jwt_payload = Object(req.user);
  const token = jwt.sign(jwt_payload,process.env.JWT_SECRET,{expiresIn:"24h"});
  res.status(200).json({user:jwt_payload,token:token})
};

export const loginFailed = async (req, res) => {
  res.status(401).json({
    message: "Google Login Failed",
  });
};
