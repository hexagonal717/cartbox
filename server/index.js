const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const customerAuthRouter = require('./router/v1/customer/customerAuthRouter');
const customerProfileRouter = require('./router/v1/customer/customerProfileRouter');
const customerProductRouter = require('./router/v1/customer/customerProductRouter');
const customerCartRouter = require('./router/v1/customer/customerCartRouter');
const adminAuthRouter = require('./router/v1/admin/adminAuthRouter');
const adminProfileRouter = require('./router/v1/admin/adminProfileRouter');
const superAdminAuthRouter = require('./router/v1/superAdmin/superAdminAuthRouter');
const superAdminProfileRouter = require('./router/v1/superAdmin/superAdminProfileRouter');
const superAdminProductRouter = require('./router/v1/superAdmin/superAdminProductRouter');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('MongoDB Connected.');
});

// Define routes

// Customer routes
app.use('/api/customer/auth', customerAuthRouter);
app.use('/api/customer', customerProfileRouter);
app.use('/api/customer/product', customerProductRouter);
app.use('/api/customer/cart', customerCartRouter);

// Admin routes

app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/admin', adminProfileRouter);

// SuperAdmin routes

app.use('/api/superAdmin/auth', superAdminAuthRouter);
app.use('/api/superAdmin', superAdminProfileRouter);
app.use('/api/superAdmin/product', superAdminProductRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
