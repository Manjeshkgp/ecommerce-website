import adminSchema from "../models/adminSchema.js";
import userSchema from "../models/userSchema.js";
import sellerSchema from "../models/sellerSchema.js";
import productSchema from "../models/productSchema.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import auth from "../middlewares/auth.js";

export const adminLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const admin = await adminSchema.findOne({ email: email });
  if (admin === null || !admin) {
    return res
      .status(420)
      .json({ adminVerified: false, message: "email is wrong" });
  } else if (admin.password === password) {
    const token = jwt.sign(admin.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({
      adminVerified: true,
      message: "Admin Login Success",
      token
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
    // Removed filtration since only one admin is there, single vendor
    {},

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
          res.status(330).json({
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
  const products = await productSchema.find();
  const admin = await adminSchema.findOne({});
  const sales = admin.sales;
  // const totalProducts = sellers.flatMap((seller) => seller.products);
  // const totalOrders = sellers.flatMap((seller) => seller.customerOrders);
  res.status(200).json({
    totalUsers: users,
    totalSellers: sellers,
    totalProducts: products,
    totalSales: sales,
  });
};

export const addProduct = async (req, res) => {
  const files = await req.files;
  let images;
  let primaryImage;
  if (files === null || files === undefined) {
    images = [];
    primaryImage = "";
  }
  if (files?.files !== undefined && files?.files !== null) {
    images = files?.files?.map((file) => file.path);
  }
  if (files?.primaryImage !== undefined && files?.primaryImage !== null) {
    primaryImage = files?.primaryImage[0]?.path;
  }
  const product = {
    title: req.body.title,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    brand: req.body.brand || "Unknown",
    rating: req.body.rating || [],
    price: req.body.price,
    images: images,
    primaryImage: primaryImage,
    sellerId: "Admin",
  };

  try {
    const newProduct = new productSchema(product);
    const saveProduct = await newProduct.save();
    res
      .status(200)
      .json({ product: saveProduct, message: "Product Saved Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const deleteProduct = async (req, res) => {
  const _id = req.body._id;
  const theProduct = await productSchema.findById(_id);
  if (theProduct === null || theProduct === undefined) {
    res.status(350).json({ message: "Product Already Unavailable" });
    return;
  }
  var allImages = [...theProduct?.images];
  var primaryImage = theProduct?.primaryImage;
  allImages.push(primaryImage);
  allImages.forEach((image) => {
    // Not used Array.from due to some Symbol.Iterable problems
    fs.unlink(String(image), (err) => {
      console.log(err);
    });
  });
  productSchema.findByIdAndDelete(_id, (err, deletedDoc) => {
    if (err) {
      // Handle the error
      console.error(err);
      res.status(400).json({ message: "Some Error Occured" });
    } else {
      // Log the deleted document
      console.log(deletedDoc);
      res.status(200).json({ message: "Product and All Images Deleted" });
    }
  });
};

export const updateProduct = async (req, res) => {
  const _id = req.params._id;
  const productDetails = req.body;
  try {
    await productSchema.findByIdAndUpdate(_id, productDetails);
    res.status(200).json({ message: "Updated the product" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Some Error Occured" });
  }
};

export const getUsers = async (req, res) => {
  const allUsers = await userSchema.find();
  res.status(200).json(allUsers);
};

export const removeUser = async (req, res) => {
  const { _id } = req.params;
  try {
    await userSchema.findByIdAndDelete(_id);
    res.status(200).json({ message: "Deleted The User" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Some Error Occured" });
  }
};

export const getSellers = async (req, res) => {
  const allSellers = await sellerSchema.find();
  res.status(200).json(allSellers);
};

export const removeSeller = async (req, res) => {
  const { _id } = req.params;
  try {
    await sellerSchema.findByIdAndDelete(_id);
    res.status(200).json({ message: "Deleted The Seller" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Some Error Occured" });
  }
};

export const salesGraph = async (req, res) => {
  let days;
  if (
    isNaN(Number(req.params.days)) ||
    req.params.days === undefined ||
    req.params.days === null
  ) {
    days = 7;
  } else if (Number(req.params.days) <= 0) {
    days = 7;
  } else {
    days = req.params.days;
  }
  const daysNumber = days - 1;
  const lastXDays = []; // IF daysNumber = 6, THEN last7Days LIST
  let ordersByDate = {};
  const admin = await adminSchema.findOne({});
  const sales = admin.sales;
  // FIRST GETTING THE ARRAY OF DATES OF LAST X NUMBER OF DAYS IF X = 6, THEN 7 DAYS DATA, IF 30 THEN 31 DAYS DATA
  for (let i = daysNumber; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    lastXDays.push(date.toISOString().substr(0, 10));
  }
  // CREATING OBJECT FOR NUMBER OF ORDERS BY DATE AS KEYS AND NUMBER OF ORDERS AS VALUES
  sales.forEach((order) => {
    const orderDate = order.date.toISOString().substr(0, 10);
    if (lastXDays.includes(orderDate)) {
      if (ordersByDate[orderDate]) {
        ordersByDate[orderDate]++;
      } else {
        ordersByDate[orderDate] = 1;
      }
    }
  });
  // CONVERTING THE OBJECT INTO ARRAY
  const graphData = Object.keys(ordersByDate).map((date) => {
    return { date, orders: ordersByDate[date] };
  });
  // IF NO ORDERS HAPPENED ON A PARTICULAR DATE THEN NO OBJECT IS MADE, SO MAKING OBJECT FOR 0 ORDERS ON A DATE
  // AND ADDING THOSE OBJECTS INTO THE graphData ARRAY
  lastXDays.forEach((date) => {
    if (!graphData.some((order) => order.date === date)) {
      graphData.push({ date: date, orders: 0 });
    }
  });
  // NOW SORTING THE ARRAY BY DATES
  graphData.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });
  res.status(200).json(graphData);
};
