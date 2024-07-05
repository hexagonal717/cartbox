const router = require("express").Router();
const {signup, login} = require("../AppController/adminAuthController");

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
