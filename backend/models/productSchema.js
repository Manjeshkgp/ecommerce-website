import { Schema,model } from "mongoose";

const productSchema = new Schema({
    title:String,
    description:String,
    shortDescription:String,
    price:Number,
    rating:[Object],
    ram:Number,
    processor:String,
    brand:String,
    images:Array,
    primaryImage:String,
    sellerId:{type:String,required:true},
})

export default model("Product",productSchema);