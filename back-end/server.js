const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const mongoose = require("mongoose");
const ProductModel = require("./models/Products");
const DrinkModel = require("./models/Drinks");
const ProductsListModel = require("./models/ProductsList");
const UserModel = require("./models/Users");

const cors = require("cors");
const salt = bcrypt.genSaltSync(10);
const secret = "kashasoshfoashf";

const app = express();
const PORT = process.env.PORT | 5000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// get menu
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

//get limit products list
app.get("/getProducts/:id", async (req, res) => {
  const id = req.params.id;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const searchKey = req.query.searchKey;

  const skip = (page - 1) * limit;
  try {
    let query = { menuId: id };
    // filter search
    if (searchKey) {
      query.$and = [{ title: { $regex: searchKey, $options: "i" } }];
    }

    const products = await ProductsListModel.find(query)
      .skip(skip)
      .limit(limit);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu từ MongoDB" });
  }
});

//get product detail
app.get("/getProductDetail/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await ProductsListModel.findById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//post users (register)
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // check existed
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Existed username" });
  } else {
    await UserModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json({ message: "Đăng ký thành công" });
  }
});
//post user (login)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // check existed
  const existingUser = await UserModel.findOne({ username });

  const passOk = bcrypt.compareSync(password, existingUser.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: existingUser._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: existingUser._id,
        username,
      });
    });
  } else {
    res.status(400).json("Password or Username is wrong!");
  }
});

// check logged
app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Token không tồn tại." });
  }
  jwt.verify(token, secret, {}, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ." });
    }
    const { username } = decodedToken;
    res.json({ username });
  });
});

// log out
app.post("/logout", (req, res) => {
  // res.cookie("token", "").json("ok");
  res.clearCookie("token");
});

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
