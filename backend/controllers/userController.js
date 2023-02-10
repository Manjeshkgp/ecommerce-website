import bcrypt from "bcrypt";
import userSchema from "../models/userSchema.js";


export const registerUser = async (req, res) => {
  const userExist = await userSchema.findOne({ email: req.body.email });
  if (userExist) {
    res.status(409).json({
      message: "User already exists",
    });
    return;
  }
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const requiredData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };
  try {
    const registerUser = new userSchema(requiredData);
    const saveUser = await registerUser.save();
    console.log(saveUser);
    res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req,res) => {
    const user = await userSchema.findOne({email:req.body.email});
    if(!user){
        res.status(408).json({message:"User Not Found"});
        return;
    }
    const matched = await bcrypt.compareSync(req.body.password, user.password);
    if(!matched){
        res.status(407).json({message:"Password is Incorrect"});
        return;
    }
    res.status(200).json({message:"Login Successfull"})
}