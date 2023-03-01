import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    sales:[Object],
    products:[Object],
    customerOrders:[Object]
})

export default new mongoose.model("Admin",adminSchema);