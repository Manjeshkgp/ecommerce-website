import bcrypt from "bcrypt";
import userSchema from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import productSchema from "../models/productSchema.js";
import adminSchema from "../models/adminSchema.js";
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
    const token = jwt.sign(saveUser.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ user: saveUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const loginUser = async (req, res) => {
  const user = await userSchema.findOne({ email: req.body.email });
  if (!user) {
    res.status(408).json({ message: "User Not Found" });
    return;
  }
  const matched = await bcrypt.compareSync(req.body.password, user.password);
  if (!matched) {
    res.status(410).json({ message: "Password is Incorrect" });
    return;
  }
  const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  res.status(200).json({ user, token });
};

export const getProducts = async(req,res) => {
  const allProducts = await productSchema.find();
  res.status(200).json({allProducts});
}

export const buyAProduct = async (req,res) => {
  const purchaseDetails = {
    userId:req.body.userId,
    productId:req.body.productId,
    date: new Date()
  }
  try {
  await adminSchema.updateOne({},{$addToSet:{sales:purchaseDetails}})
  res.status(200).json({message:"Product Purchased Successfully"})
  } catch (error) {
    console.log(error);
    res.status(400).json({error})
  }
}

export const getAProduct = async(req,res) => {
  const _id = req.body._id
  const product = await productSchema.findById(_id);
  res.status(200).json(product);
}

export const recentProducts = async (req,res) => {
  const products = await productSchema.find().sort({date:-1}).limit(8);
  res.status(200).json(products);
}