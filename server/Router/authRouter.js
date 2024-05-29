const router = require("express").Router();
const userInfo = require("../Model/userSchema");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    console.log("***************************", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Email and Password is required.");
      res.status(400).json({ error: "Email and Password is required." });
    }

    const dbExistingUser = await userInfo.findOne(
      { email },
      {},
      { lean: true },
    );
    console.log(dbExistingUser);
    if (!dbExistingUser) {
      res.status(401).json({ error: "Email or Password is incorrect." });
    }

    const isPasswordValid = await argon.verify(
      dbExistingUser.password,
      password,
    );

    !isPasswordValid && res.status(401).json("not matched")``;
    if (dbExistingUser && isPasswordValid) {
      console.log("LogInPage Successful.");
      const accessToken = jwt.sign(
        {
          id: dbExistingUser.id,
        },
        process.env.jwtseckey,
      );

      res
        .status(200)
        .json({ success: true, userId: dbExistingUser._id, accessToken });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);

    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      console.log("All fields are required.");

      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUserEmail = await userInfo.findOne(
      { email },
      {},
      { lean: true },
    );
    const existingUserPhone = await userInfo.findOne(
      { phone },
      {},
      { lean: true },
    );
    if (existingUserEmail || existingUserPhone) {
      console.log("User already exists.");
      return res.status(400).json({ error: "User already exists." });
    }

    const newUser = new userInfo({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: await argon.hash(req.body.password),
    });
    console.log(newUser);
    const savedUser = await newUser.save();
    res.status(200).json({ success: savedUser });
  } catch (err) {
    console.error("Error during user signup:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;
