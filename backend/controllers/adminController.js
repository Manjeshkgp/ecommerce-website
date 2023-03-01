import adminSchema from "../models/adminSchema.js";
import userSchema from "../models/userSchema.js";
import sellerSchema from "../models/sellerSchema.js";
import mongoose from "mongoose";

export const adminLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const admin = await adminSchema.findOne({ email: email });
  if (admin === null || !admin) {
    return res
      .status(420)
      .json({ adminVerified: false, message: "email is wrong" });
  } else if (admin.password === password) {
    res.status(200).json({
      adminVerified: true,
      message: "Admin Login Success",
    });
  } else {
    res.status(440).json({
      adminVerified: false,
      message: "Admin Login Unsuccessful",
    });
  }
};

export const forgetPassword = async (req, res) => {
  if (!req.body.newPassword || req.body.newPassword === undefined) {
    return res
      .status(451)
      .json({ message: "New Password can't be null or undefined" });
  }
  adminSchema.updateOne(
    // Filter to find the document to update
    { email: req.body.email },

    // Update to apply to the document
    { $set: { password: req.body.newPassword } },

    // Callback function
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ err });
      } else {
        console.log(result);
        if (result.modifiedCount !== 0) {
          res.status(200).json({ message: "Password Changed Successfully" });
        } else {
          res
            .status(330)
            .json({
              message: "Password Not Changed due to some unknown errors",
            });
        }
      }
    }
  );
};

export const getBusinessData = async (req, res) => {
  const users = await userSchema.find();
  const sellers = await sellerSchema.find();
  const totalProducts = sellers.flatMap((seller) => seller.products);
  const totalOrders = sellers.flatMap((seller) => seller.customerOrders);
  res.status(200).json({
    totalUsers: users.length,
    totalSellers: sellers.length,
    totalProducts,
    totalOrders,
  });
};

export const addProduct = async (req, res) => {
  const files = req.files;
  const email = req.body.email;
  const product = {
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    ram:req.body.ram,
    processor:req.body.processor || "Unknown",
    brand:req.body.brand || "Unknown",
    rating: req.body.rating || [],
    price: req.body.price,
    images: files.map((file) => file.path),
  };
  adminSchema.updateOne(
    { email: email },
    { $addToSet: { products: product } },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ err });
      } else {
        console.log(result);
        if (result.modifiedCount !== 0) {
          res
            .status(200)
            .json({ message: "Products and Images added successfully" });
        } else {
          res
            .status(330)
            .json({
              message:
                "Products or Images not added due to some errors we don't know as of now",
            });
        }
      }
    }
  );
};
