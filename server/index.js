const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./Router/userRouter");

app.use(cors());
mongoose.connect(process.env.mongoUrl).then(() => {
  console.log("Database connected.");
});

app.use(express.json());
app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("Port connected.");
});
