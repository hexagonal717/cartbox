const router = require("express").Router();
const userInfo = require("../Model/userSchema");
const {response} = require("express");
const argon = require("argon2");

router.post("/signup", async (req, res) => {
    try {
        console.log(req.body);

        const {firstName, lastName, email, phone, password} = req.body;

        if (!firstName || !lastName || !email || !phone || !password) {

            console.log("All fields are required.")

            return res.status(400).json({error: "All fields are required."});

        }

        const existingUserEmail = await userInfo.findOne({email}, {}, {lean: true});
        const existingUserPhone = await userInfo.findOne({phone}, {}, {lean: true});
        if (existingUserEmail || existingUserPhone) {
            console.log("User already exists.")
            return res.status(400).json({error: "User already exists."});

        }


        const newUser = new userInfo({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: await argon.hash(req.body.password),
        })
        console.log(newUser)
        const savedUser = await newUser.save();
        res.status(200).json({success: savedUser})

    } catch (err) {

        console.error("Error during user signup:", err);
        res.status(500).json({error: "Server error. Please try again later."});

    }

});

router.post("/login", async (req, res) => {
    try {

        const {email, password} = req.body;

        if (!email || !password) {
            console.log("Email and Password is required.");
            res.status(400).json({error: "Email and Password is required."});

        }

        const dbExistingUser = await userInfo.findOne({email}, {}, {lean: true});
        console.log(dbExistingUser);
        if (!dbExistingUser) {
            res.status(400).json({error: "Email or Password is incorrect."});
        }

        const isPasswordValid = await argon.verify(dbExistingUser.password, password);


        if (dbExistingUser && isPasswordValid) {
            console.log("Login Successful.")
            res.status(200).json({success: true});
        }


    } catch (err) {
        console.log(err.message)
        res.status(500).json({error: "Server error. Please try again later."});
    }


})

router.get("/getAllUserInfo", async (req, res) => {

    try {


        const data = await userInfo.find();

        if (data.length === 0) {
            res.status(400).json({error: "User list is empty."});
        }


        res.status(200).json(data);
        console.log(data)

    } catch (err) {

        res.status(500).json({error: "Server error. Please try again later."});

    }

})

router.get("/getUserInfoByParams/:id", async (req, res) => {

    try {


        const data = await userInfo.findById(req.params.id);


        res.status(200).json(data);
        console.log(data)

    } catch (err) {

        res.status(500).json({error: "Server error. Please try again later."});

    }

})

router.get("/getUserInfoByQuery", async (req, res) => {

    try {


        const data = await userInfo.findOne({email: req.query.email}, {}, {lean: true});


        res.status(200).json(data);
        console.log(data)

    } catch (err) {

        res.status(500).json({error: "Server error. Please try again later."});

    }

})

module.exports = router;
