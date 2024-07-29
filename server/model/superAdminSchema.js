const mongoose = require('mongoose');

const superAdminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number /*required: true*/ },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['customer', 'admin', 'superAdmin'],
    default: 'superAdmin',
  },
  image: { type: String },
});

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
