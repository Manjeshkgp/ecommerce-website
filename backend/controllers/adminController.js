import adminSchema from "../models/adminSchema.js";
import userSchema from "../models/userSchema.js";
import sellerSchema from "../models/sellerSchema.js";

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

export const getBusinessData = async (req,res) => {
    const users = await userSchema.find();
    const sellers = await sellerSchema.find();
    const totalProducts = sellers.flatMap(seller => seller.products);
    const totalOrders = sellers.flatMap(seller => seller.customerOrders);
    res.status(200).json({
        totalUsers:users.length,
        totalSellers:sellers.length,
        totalProducts,
        totalOrders
    })
}