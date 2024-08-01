const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({

  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('CartItem', cartItemSchema);