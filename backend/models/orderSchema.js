import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products:{type:Array,required:true},
    buyer:{type:String,required:true},
    date: {type:Date,required:true}
})

export default mongoose.model("order",orderSchema);