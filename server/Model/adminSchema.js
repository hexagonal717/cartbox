const mongoose = require("mongoose");

const AdminInfoSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number /*required: true*/},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: String, required: true, default: "admin"},
    image: {type: String},
});

module.exports = {
    AdminInfoSchema: mongoose.model("AdminInfo", AdminInfoSchema),
};