const mongoose = require('mongoose');

const customerInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number /* required: true */ }, // Uncomment if age is required
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['customer', 'admin', 'superAdmin'],
      default: 'customer',
    },
    image: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Customer', customerInfoSchema);
