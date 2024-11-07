
// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: String,
// });

// export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);


// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  // Define other fields as necessary
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;
