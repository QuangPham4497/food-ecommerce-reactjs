const mongoose = require("mongoose");

const ProductsListByIdSchema = new mongoose.Schema({
  title: String,
  desc: String,
  img: String,
  price: Number,
  menuId: Number,
  options: [
    {
      title: String,
      additionalPrice: Number,
    },
  ],
});

const ProductsListByIdModel = mongoose.model(
  "listproducts",
  ProductsListByIdSchema
);

module.exports = ProductsListByIdModel;
