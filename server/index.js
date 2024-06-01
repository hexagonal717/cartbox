const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./Router/userRouter");
const authRouter = require("./Router/authRouter");

app.use(cors());
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database connected.");
});

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log(`Port connected.`);
});
