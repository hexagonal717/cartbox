const router = require("express").Router();
const userInfo = require("../Model/userSchema");

router.post("/signup", async (req, res) => {
    try {
        console.log(req.body);
        const {firstName, lastName, email, phone, password} = req.body;

        if (!firstName || !lastName || !email || !phone || !password) {

            console.log("All fields are required.")

            return res.status(400).json({error: "All fields are required."});

        }

        const existingUser = await userInfo.findOne({email}, "_id", {lean: true});
        if (existingUser) {
            console.log("User already exists.")
            return res.status(400).json({error: "User already exists."});

        }

        const newUser = new userInfo({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
        })
        console.log(newUser)
        await newUser.save();

    } catch (err) {

        console.error("Error during user signup:", err);
        res.status(500).json({error: "Server error. Please try again later."});

    }

});

module.exports = router;
