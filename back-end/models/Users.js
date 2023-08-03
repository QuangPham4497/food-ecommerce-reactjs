const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
