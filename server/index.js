const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const customerAuthRouter = require("./router/v1/customer/customerAuthRouter");
const customerProfileRouter = require("./router/v1/customer/customerProfileRouter");
const adminAuthRouter = require("./router/v1/admin/adminAuthRouter");
const adminProfileRouter = require("./router/v1/admin/adminProfileRouter");
const superAdminAuthRouter = require("./router/v1/superAdmin/superAdminAuthRouter");
const superAdminProfileRouter = require("./router/v1/superAdmin/superAdminProfileRouter");


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URL).then(() => {

    console.log("MongoDB Connected.");

});


// Define routes
app.use("/api/customer", customerProfileRouter);
app.use("/api/customer/auth", customerAuthRouter);
app.use("/api/admin", adminProfileRouter);
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/superAdmin", superAdminProfileRouter);
app.use("/api/superAdmin/auth", superAdminAuthRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});