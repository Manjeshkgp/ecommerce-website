import bcrypt from "bcrypt";
import sellerSchema from "../models/sellerSchema.js";


export const registerSeller = async (req, res) => {
  const sellerExist = await sellerSchema.findOne({ email: req.body.email });
  if (sellerExist) {
    res.status(409).json({
      message: "Seller already exists",
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
    const registerSeller = new sellerSchema(requiredData);
    const saveUser = await registerSeller.save();
    console.log(saveUser);
    res.status(200).json({ message: "Seller Registered Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const loginSeller = async (req,res) => {
    const seller = await sellerSchema.findOne({email:req.body.email});
    if(!seller){
        res.status(408).json({message:"Seller Not Found"});
        return;
    }
    const matched = await bcrypt.compareSync(req.body.password, seller.password);
    if(!matched){
        res.status(407).json({message:"Password is Incorrect"});
        return;
    }
    res.status(200).json({message:"Login Successfull"})
}