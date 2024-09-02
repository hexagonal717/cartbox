const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const customerAuthRouter = require('./router/v1/customer/customerAuthRouter');
const customerProfileRouter = require('./router/v1/customer/customerProfileRouter');
const customerProductRouter = require('./router/v1/customer/customerProductRouter');
const customerCartRouter = require('./router/v1/customer/customerCartRouter');
const customerOrderRouter = require('./router/v1/customer/customerOrderRouter');
const adminAuthRouter = require('./router/v1/admin/adminAuthRouter');
const adminProfileRouter = require('./router/v1/admin/adminProfileRouter');
const adminProductRouter = require('./router/v1/admin/adminProductRouter');
const superAdminAuthRouter = require('./router/v1/superAdmin/superAdminAuthRouter');
const superAdminProfileRouter = require('./router/v1/superAdmin/superAdminProfileRouter');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => {});

// Define routes

// Customer routes
app.use('/api/customer/auth', customerAuthRouter);
app.use('/api/customer/profile', customerProfileRouter);
app.use('/api/customer/product', customerProductRouter);
app.use('/api/customer/cart', customerCartRouter);
app.use('/api/customer/order', customerOrderRouter);

// Admin routes

app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/admin/profile', adminProfileRouter);
app.use('/api/admin/product', adminProductRouter);

// SuperAdmin routes

app.use('/api/super-admin/auth', superAdminAuthRouter);
app.use('/api/super-admin/profile', superAdminProfileRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
