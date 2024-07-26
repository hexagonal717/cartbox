const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number /*required: true*/},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true, unique: true},
    password: {type: String, required: true},
    userType: {type: String, required: true, default: "admin"},
    image: {type: String},
});

module.exports =  mongoose.model("Admin", adminSchema)