import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: [Object],
  orders: [Object],
  purchased: [Object],
});

export default mongoose.model("Users",userSchema)