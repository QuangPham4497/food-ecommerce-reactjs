const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();
const ProductModel = require("./models/Products");
const DrinkModel = require("./models/Drinks");
const ProductsListModel = require("./models/ProductsList");
// const ProductsListByIdModel = require("./models/ProductsListById");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/getProducts", async (req, res) => {
  try {
    const foods = await ProductModel.find();
    const drinks = await DrinkModel.find();
    const data = {
      foods: foods,
      drinks: drinks,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/getList", (req, res) => {
  ProductsListModel.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

// app.get("/getList/:id", async (req, res) => {
//   const menuId = req.params.id;

//   try {
//     const data = await ProductsListModel.findById(menuId);
//     res.json(data);
//   } catch (error) {

//     res.status(500).json({ message: "Server error" });
//   }
// });

//get product List

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
