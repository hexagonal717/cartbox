const mongoose = require("mongoose");
const userInfo = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number /*required: true*/ },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model("userInfo", userInfo);
