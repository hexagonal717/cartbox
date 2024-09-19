const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.env' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.local' });
}

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
const superAdminProductRouter = require('./router/v1/superAdmin/superAdminProductRouter');
const superAdminClientRouter = require('./router/v1/superAdmin/superAdminClientRouter');

const app = express();
app.use(
  cors({
    origin: process.env.VITE_CARTBOX_API_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }),
);
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  });
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
app.use('/api/super-admin/product', superAdminProductRouter);
app.use('/api/super-admin/client', superAdminClientRouter);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {});
