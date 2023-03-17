import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: String,
    description: String,
    shortDescription: String,
    price: Number,
    rating: [Object],
    brand: String,
    images: Array,
    primaryImage: String,
    sellerId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Product", productSchema);
