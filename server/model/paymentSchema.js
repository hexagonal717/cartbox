const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'PayPal', 'UPI', 'Cash on Delivery'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    amount: { type: Number, required: true },
    transactionId: { type: String, unique: true },
    paymentDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Payment', paymentSchema);
