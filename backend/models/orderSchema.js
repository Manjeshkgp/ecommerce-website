import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products:{type:Array,required:true},
    buyer:{type:Object,required:true},
    totalPrice:{type:Number,required:true},
    date: {type:Date,required:true}
})

export default mongoose.model("order",orderSchema);