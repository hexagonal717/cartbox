const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    fullName: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    landmark: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
    type: { type: String, enum: ['home', 'work'], default: 'home' },
  },
  { _id: false },
);

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number },
  },
  { timestamps: true },
);

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    items: [orderItemSchema],
    totalQuantity: { type: Number },
    totalPrice: { type: Number },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: { type: addressSchema, required: true },
    billingAddress: { type: addressSchema, required: true },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);
