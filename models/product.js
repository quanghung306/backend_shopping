
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Object, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

exports.product = product;