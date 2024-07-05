const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./Router/userRouter");
const userAuthRouter = require("./Router/userAuthRouter");
const adminRouter = require("./Router/adminRouter");
const adminAuthRouter = require("./Router/adminAuthRouter");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URL).then(() => {

    console.log("MongoDB Connected.");

});


// Define routes
app.use("/api/user", userRouter);
app.use("/api/user/auth", userAuthRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin/auth", adminAuthRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});