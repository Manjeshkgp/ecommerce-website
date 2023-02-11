import mongoose,{ Schema } from "mongoose";

const sellerSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    products:[Object],
    customerOrders:[Object]
});

export default mongoose.model("Sellers",sellerSchema);