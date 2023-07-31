const mongoose = require("mongoose");

const ProductsListSchema = new mongoose.Schema({
  title: String,
  desc: String,
  img: String,
  price: Number,
  options: [
    {
      title: String,
      additionalPrice: Number,
    },
  ],
});

const ProductsListModel = mongoose.model("listproducts", ProductsListSchema);

module.exports = ProductsListModel;
