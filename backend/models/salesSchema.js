import mongoose, { Schema } from "mongoose";

const salesSchema = new Schema({
    products:{type:Array,required:true},
    buyer:{type:String,required:true},
    date: {type:Date,required:true},
    saleDate: {type:Date,required:true}
})

export default mongoose.model("sales",salesSchema);