const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    phone: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    landmark: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
    type: { type: String, enum: ['home', 'work'], default: 'home' },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const customerInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, },
    password: { type: String, required: true },
    address: [addressSchema],
    role: {
      type: String,
      enum: ['customer', 'admin', 'superAdmin'],
      default: 'customer',
    },
    image: { type: String },
  },
  { timestamps: true },
);

customerInfoSchema.index(
  { phone: 1 },
  { unique: true, partialFilterExpression: { phone: { $ne: null } } }
);

module.exports = mongoose.model('Customer', customerInfoSchema);
