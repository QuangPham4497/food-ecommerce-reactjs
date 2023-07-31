const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: String,
  desc: String,
  img: String,
  color: String,
  id: Number,
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
