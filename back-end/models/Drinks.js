const mongoose = require("mongoose");

const DrinkSchema = new mongoose.Schema({
  title: String,

});

const DrinkModel = mongoose.model("drinks", DrinkSchema);

module.exports = DrinkModel;
