const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number /* required: true */}, // Uncomment if age is required
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: String, required: true, default: "user"},
    image: {type: String}
}, {timestamps: true});

module.exports = mongoose.model("UserInfo", UserInfoSchema);
