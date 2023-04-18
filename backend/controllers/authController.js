import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const authenticateGoogle = passport.authenticate("google", { scope: ["profile","email"] });

export const authenticateGoogleResult = async (req, res) => {
  const jwt_payload = JSON.parse(JSON.stringify(req.user));
  console.log(jwt_payload)
  const token = jwt.sign(jwt_payload,process.env.JWT_SECRET,{expiresIn:"1d"});
  res.redirect(`${process.env.FRONTEND_URL}/auth-with-google/${token}`)
};

export const loginFailed = async (req, res) => {
  res.status(401).json({
    message: "Google Login Failed",
  });
};

export const getUserData = async (req,res) => {
  if(req.user){
    const user = JSON.parse(JSON.stringify(req.user));
    res.status(200).json(user);
  }
}