import adminSchema from "../models/adminSchema.js";
import userSchema from "../models/userSchema.js";
import sellerSchema from "../models/sellerSchema.js";
import productSchema from "../models/productSchema.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import orderSchema from "../models/orderSchema.js";
import salesSchema from "../models/salesSchema.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const adminLogin = async (req, res) => {
  const email = req.body.email.toLowerCase();
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
      token,
    });
  } else {
    res.status(440).json({
      adminVerified: false,
      message: "Admin Login Unsuccessful",
    });
  }
};

export const verifyMe = async (req, res) => {
  adminSchema.findOne({ email: req.body.email.toLowerCase() }, (err, admin) => {
    if (err) {
      console.log(err);
      res.status(430).json({ message: "Some Error Occurred" });
    } else if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(440).json({ message: "May be admin not found" });
    }
  });
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
  const users = await userSchema.countDocuments({});
  const sales = await salesSchema.countDocuments({});
  const products = await productSchema.countDocuments({});
  const orders = await orderSchema.countDocuments({});
  // const totalProducts = sellers.flatMap((seller) => seller.products);
  // const totalOrders = sellers.flatMap((seller) => seller.customerOrders);
  res.status(200).json({
    totalUsers: users,
    totalSales: sales,
    totalProducts: products,
    totalOrders: orders,
  });
};

export const addProduct = async (req, res) => {
  const files = await req.files;
  let images=[];
  let primaryImage="";
  let imagesPublicIds=[];
  if (files === null || files === undefined) {
    images = [];
    primaryImage = "";
  }
  if (files?.files !== undefined && files?.files !== null) {
    images = await Promise.all(files.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);
      fs.unlink(file.path,(err)=>{
        if(err) throw err;
      });
      imagesPublicIds.push(result.public_id);
      return result.url;
    }));
  }
  if (files?.primaryImage !== undefined && files?.primaryImage !== null) {
    const primaryImageFile = await cloudinary.uploader.upload(files.primaryImage[0].path);
    fs.unlink(files.primaryImage[0].path,(err)=>{
      if(err) throw err;
    });
    primaryImage = primaryImageFile.url;
    imagesPublicIds.push(primaryImageFile.public_id);
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
    imagesPublicIds:imagesPublicIds,
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
    res.status(350).json({ message: "Product Unavailable" });
    return;
  }
  const imagesPublicIds = theProduct.imagesPublicIds;
  imagesPublicIds.forEach(async(public_id)=>{
  await cloudinary.uploader.destroy(public_id,(error, result)=>{
    if (error) {
      console.error('Error deleting image:', error);
    } else {
      console.log('Image deleted successfully:', result);
    }
  })
  })
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
  let page = Number(req.query.page) || 1;
  if (page < 1) {
    page = 1;
  }
  const limit = 20;
  const skip = (page - 1) * limit;
  const totalDocs = await userSchema.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);
  const allUsers = await userSchema.find().skip(skip).limit(limit);
  res.status(200).json({ allUsers, totalPages });
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
  const lastXDaysDate = [];
  let lastXDays = []; // IF daysNumber = 6, THEN last7Days LIST
  let salesByDate = {};
  // FIRST GETTING THE ARRAY OF DATES OF LAST X NUMBER OF DAYS IF X = 6, THEN 7 DAYS DATA, IF 30 THEN 31 DAYS DATA
  for (let i = daysNumber; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    lastXDaysDate.push(date.toISOString());
  }
  const firstDay = lastXDaysDate[0];
  const lastDay = lastXDaysDate[lastXDaysDate.length - 1];
  const sales = await salesSchema.find({
    $and: [{ saleDate: { $gte: firstDay } }, { saleDate: { $lte: lastDay } }],
  });
  lastXDays = lastXDaysDate.map((date) => date.substr(0, 10));
  const salesDateArr = sales.map((sale) =>
    sale.saleDate.toISOString().substr(0, 10)
  );
  salesDateArr.forEach((date) => {
    if (lastXDays.includes(date)) {
      if (
        !salesByDate[date] ||
        salesByDate[date] === null ||
        salesByDate[date] === undefined
      ) {
        salesByDate[date] = 1;
      } else {
        salesByDate[date]++;
      }
    }
  });
  lastXDays.forEach((date) => {
    if (salesDateArr.includes(date)) {
      return;
    } else {
      salesByDate[date] = 0;
    }
  });
  const arrOfSalesObj = Object.entries(salesByDate).map((entry) => ({
    date: entry[0],
    sales: entry[1],
  }));
  arrOfSalesObj.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });
  res.status(200).json(arrOfSalesObj);
};

export const getOrders = async (req, res) => {
  // Orders are sorted by date:-1 to get latest orders first
  let page = Number(req.query.page) || 1;
  if (page < 1) {
    page = 1;
  }
  const limit = 20;
  const skip = (page - 1) * limit;
  const totalDocs = await orderSchema.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);
  orderSchema
    .find()
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .exec((err, orders) => {
      if (err) {
        console.error(err);
        res.status(403).json({ message: "Some error occured" });
      } else {
        res.status(200).json({ orders, totalPages });
      }
    });
};

export const orderToSale = async (req, res) => {
  const _id = req.params._id;
  // the lean method is converting the mongodb document to a javascript object, even the _id i.e. ObjectId("something-something") is also converted into normal string
  const order = await orderSchema.findById(_id).lean();
  if (!order || order === null || order === undefined) {
    res
      .status(434)
      .json({ message: "No Order Found, may be already converted" });
    return;
  }
  let saleObj = order;
  saleObj["saleDate"] = new Date();
  const newSale = new salesSchema(saleObj);
  try {
    let saveNewSale = await newSale.save();
    await userSchema.findOneAndUpdate(
      { email: order.buyer.toLowerCase() },
      {
        $pull: { orders: { _id: mongoose.Types.ObjectId(order._id) } },
        $addToSet: { purchased: saveNewSale },
      }
    );
    await orderSchema.findByIdAndDelete(_id);
    res.status(200).json({ message: "The Order Converted to Sale" });
  } catch (error) {
    console.log(error);
    res.status(444).json({ message: "Some Error Occured" });
  }
};

export const orderCancel = async (req, res) => {
  const _id = req.params._id;
  const order = await orderSchema.findById(_id);
  try {
    await orderSchema.findByIdAndDelete(_id);
    await userSchema.findOneAndUpdate(
      { email: order.buyer.toLowerCase() },
      {
        $pull: { orders: { _id: mongoose.Types.ObjectId(order._id) } },
      }
    );
    res.status(200).json({ message: "Order Canceled" });
  } catch (error) {
    console.log(error);
    res.status(420).json({ message: "Some error occured" });
  }
};

export const allOrdersGraph = async (req, res) => {
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
  const lastXDaysDate = [];
  let lastXDays = []; // IF daysNumber = 6, THEN last7Days LIST
  let ordersByDate = {};
  // FIRST GETTING THE ARRAY OF DATES OF LAST X NUMBER OF DAYS IF X = 6, THEN 7 DAYS DATA, IF 30 THEN 31 DAYS DATA
  for (let i = daysNumber; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    lastXDaysDate.push(date.toISOString());
  }
  const firstDay = lastXDaysDate[0];
  const lastDay = lastXDaysDate[lastXDaysDate.length - 1];
  const OrderInsales = await salesSchema.find({
    $and: [{ date: { $gte: firstDay } }, { date: { $lte: lastDay } }],
  });
  const orders = await orderSchema.find({
    $and: [{ date: { $gte: firstDay } }, { date: { $lte: lastDay } }],
  });
  const TotalOrders = orders.concat(OrderInsales);
  lastXDays = lastXDaysDate.map((date) => date.substr(0, 10));
  const ordersDateArr = TotalOrders.map((order) =>
    order.date.toISOString().substr(0, 10)
  );
  ordersDateArr.forEach((date) => {
    if (lastXDays.includes(date)) {
      if (
        !ordersByDate[date] ||
        ordersByDate[date] === null ||
        ordersByDate[date] === undefined
      ) {
        ordersByDate[date] = 1;
      } else {
        ordersByDate[date]++;
      }
    }
  });
  lastXDays.forEach((date) => {
    if (ordersDateArr.includes(date)) {
      return;
    } else {
      ordersByDate[date] = 0;
    }
  });
  const arrOfOrdersObj = Object.entries(ordersByDate).map((entry) => ({
    date: entry[0],
    orders: entry[1],
  }));
  arrOfOrdersObj.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });
  res.status(200).json(arrOfOrdersObj);
};

export const getTotalRevenue = async (req, res) => {
  salesSchema
    .aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ])
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(449).json({ message: "Some Error Occured" });
      } else {
        console.log(result);
        res.status(200).json({ totalRevenue: result[0].totalRevenue });
      }
    });
};

export const totalRevenueAccordingToDate = async (req, res) => {
  const { date1, date2 } = req.params;
  let Date1 = new Date(date1);
  let Date2 = new Date(date2);
  let startDate;
  let endDate;
  if (Date1 > Date2) {
    startDate = Date2;
    endDate = Date1;
  } else {
    startDate = Date1;
    endDate = Date2;
  }
  salesSchema
    .aggregate([
      {
        $match: {
          saleDate: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ])
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(449).json({ message: "Some Error Occured" });
      } else {
        console.log(result);
        res.status(200).json({ totalRevenue: result[0]?.totalRevenue || 0 });
      }
    });
};

export const getRevenueByMonth = async (req, res) => {
  // This is Under Construction for later
  const { year } = req.params;
  const startDate = new Date(year, 0, 1); // start of the year
  const endDate = new Date(year, 11, 31); // end of the year

  const result = await salesSchema.aggregate([
    {
      $match: {
        saleDate: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$saleDate" },
          month: { $month: "$saleDate" },
        },
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);
  console.log(result);
  return;
};

export const mostSellingProductsAccordingToDate = async (req, res) => {
  const { date1, date2 } = req.params;
  let Date1 = new Date(date1);
  let Date2 = new Date(date2);
  let startDate;
  let endDate;
  if (Date1 > Date2) {
    startDate = Date2;
    endDate = Date1;
  } else {
    startDate = Date1;
    endDate = Date2;
  }
  salesSchema
    .aggregate([
      { $match: { saleDate: { $gte: startDate, $lte: endDate } } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.title",
          soldQuantity: { $sum: "$products.numberOfProducts" },
        },
      },
    ])
    .then((result) => {
      // Sort products by soldQuantity in descending order
      const sortedProducts = result.sort(
        (a, b) => b.soldQuantity - a.soldQuantity
      );

      // Create a new array with the first 5 products
      const top5Products = sortedProducts.slice(0, 5);

      // Calculate the total sold quantity for other products
      const otherProductsSoldQuantity = sortedProducts
        .slice(5)
        .reduce((acc, cur) => acc + cur.soldQuantity, 0);

      // Create a new object for other products
      const otherProducts = {
        _id: "otherProducts",
        soldQuantity: otherProductsSoldQuantity,
      };

      // Return an array with the top 5 products and the other products object
      res.status(200).json([...top5Products, otherProducts]);
    })
    .catch((error) => {
      console.error(error);
      res.status(444).json({ error: error });
    });
};
