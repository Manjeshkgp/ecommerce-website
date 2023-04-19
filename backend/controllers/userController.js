import bcrypt from "bcrypt";
import userSchema from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import productSchema from "../models/productSchema.js";
import orderSchema from "../models/orderSchema.js";
import { instance } from "../server.js";
import crypto from "crypto"

export const registerUser = async (req, res) => {
  const userExist = await userSchema.findOne({
    email: req.body.email.toLowerCase(),
  });
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
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
  };
  try {
    const registerUser = new userSchema(requiredData);
    const saveUser = await registerUser.save();
    const token = jwt.sign(saveUser.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ user: saveUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const loginUser = async (req, res) => {
  const user = await userSchema.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (!user) {
    res.status(408).json({ message: "User Not Found" });
    return;
  }
  const matched = await bcrypt.compareSync(req.body.password, user.password);
  if (!matched) {
    res.status(410).json({ message: "Password is Incorrect" });
    return;
  }
  const token = jwt.sign(JSON.parse(JSON.stringify({_id:user._id,name:user.name,email:user.email,createdAt:user.createdAt})), process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  console.log(token.length);
  res.status(200).json({ user, token });
};

export const getProducts = async (req, res) => {
  let page = Number(req.query.page) || 1;
  let sort = Number(req.query.sort) || 0;
  let allProducts;
  if (page < 1) {
    page = 1;
  }
  const limit = 20;
  const skip = (page - 1) * limit;
  const totalDocs = await productSchema.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);
  if (sort === 0) {
    allProducts = await productSchema.find().skip(skip).limit(limit);
  } else {
    allProducts = await productSchema
      .find()
      .sort({ price: sort })
      .skip(skip)
      .limit(limit);
  }
  res.status(200).json({ allProducts, totalPages });
};

export const getAProduct = async (req, res) => {
  const _id = req.body._id;
  const product = await productSchema.findById(_id);
  res.status(200).json(product);
};

export const recentProducts = async (req, res) => {
  const products = await productSchema.find().sort({ date: -1 }).limit(8);
  res.status(200).json(products);
};

export const rateAProduct = async (req, res) => {
  if (req.body.rate > 5 || req.body.rate < 1) {
    res.status(432).json({ message: "Rating must be between 1 to 5" });
    return;
  }
  productSchema.findByIdAndUpdate(
    req.params.productId,
    {
      $addToSet: {
        rating: { email: req.body.email.toLowerCase(), rate: req.body.rate },
      },
    },
    (err) => {
      if (err) {
        console.log(err);
        res.status(405).json({ message: "Some Error Occured" });
      } else {
        res.status(200).json({ message: "Rating Added Successfully" });
      }
    }
  );
};

export const getUserData = async (req, res) => {
  const email = req.params.email.toLowerCase();
  userSchema.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(440).json({ message: "Some Error Occured" });
    } else if (!user) {
      res.status(441).json({ message: "User Not Found" });
    } else {
      res.status(200).json(user);
    }
  });
};

export const updateCart = async (req, res) => {
  const email = req.params.email.toLowerCase();
  const cart = req.body.cart;
  userSchema.findOneAndUpdate(
    { email: email },
    { $set: { cart: cart } },
    (err, user) => {
      if (err) {
        console.log(err);
        res.status(444).json({ message: "Error" });
      } else if (!user) {
        res.status(445).json({ message: "User Not Found" });
      } else {
        res.status(200).json({ message: "Cart Updated" });
      }
    }
  );
};

export const addAddress = async (req,res) => {
  const email = req.user.email.toLowerCase();
  const address = req.body.address;
  userSchema.findOneAndUpdate({email:email},{$addToSet:{addresses:address}},(err,result)=>{
    if(err){
      console.log(err)
      return res.status(470).json({message:"some error occured"});
    }
    res.status(200).json(result);
  })
}

export const updateWishlist = async (req,res) => {
  const email = req.user.email.toLowerCase();
  const wishlist = req.body.wishlist;
  userSchema.findOneAndUpdate(
    { email: email },
    { $set: { wishlist: wishlist } },
    (err, user) => {
      if (err) {
        console.log(err);
        res.status(444).json({ message: "Error" });
      } else if (!user) {
        res.status(445).json({ message: "User Not Found" });
      } else {
        res.status(200).json({ message: "Cart Updated" });
      }
    }
  );
}

export const searchProducts = async (req,res) => {
  const {search} = req.query;
  try {
  const products = await productSchema.find({title:{$regex:search, $options:"i"}}).exec()
  res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(505).json(err);
  }
}

export const searchBrandedProducts = async (req,res) => {
  const {brand} = req.query;
  try {
  const products = await productSchema.find({brand:{$regex:brand,$options:"i"}}).exec();
  res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(505).json(err);
  }
}

export const checkout = async (req, res) => {
  const productIDs = await req.body.products.flatMap((product)=>product._id);
  const numberOfProducts = await req.body.products.flatMap((product)=>product.numberOfProducts);
    let totalPrice = 0;
    try {
      // Fetch products from MongoDB based on productIDs
      const products = await productSchema.find({ _id: { $in: productIDs } });
  
      // Create a dictionary or Map to store products by ID
      const productMap = new Map();
      products.forEach(product => {
        productMap.set(product._id.toString(), product);
      });
  
      // Calculate total price
      for (let i = 0; i < productIDs.length; i++) {
        const productID = productIDs[i];
        const product = productMap.get(productID.toString());
        const numberOfProduct = numberOfProducts[i];
        totalPrice += product.price * numberOfProduct;
      }

    } catch (error) {
      console.error('Error calculating total price:', error);
      throw error;
    }
    console.log(totalPrice);
  const options = {
    amount: Number(totalPrice * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);
    res.status(200).json({ 
      success: true,
      order,
    });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, buyer, products, totalPrice } =
    req.body;

  const order_payment = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(order_payment.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here
    try {
      const addOrder = new orderSchema({
        buyer:buyer,
        products:products,
        totalPrice:totalPrice,
        date: new Date(),
        paymentId:razorpay_payment_id
      });
    const OrderSave = await addOrder.save();
    await userSchema.findOneAndUpdate(
      { email: buyer.email.toLowerCase()},
      { $addToSet: { orders: OrderSave._id } }
    );
    res.status(200).json({
      success:true,
    })
    } catch (error) {
      res.status(500).json({
        success:false,
        message:"Database Order Creation error"
      })
    }
    
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

export const getMyOrders = async(req,res) => {
  const email = await req.user.email.toLowerCase();
  try {
    const user = await userSchema.findOne({email:email});
    const OrderIDs = user.orders;
    if(OrderIDs.length<1){
      res.status(409).json("No Orders");
      return;
    }else{
      try {
        const Orders = await orderSchema.find({_id:{$in:OrderIDs}});
        res.status(200).json(Orders);
      } catch (err2) {
        console.log(err2);
        res.status(500).json("Error Occured during finding Orders")
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("Some Error occured during finding OrdersIDs")    
  }
}