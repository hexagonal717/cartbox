const router = require("express").Router();
const userInfo = require("../Model/userSchema");

router.post("/signup", async (req, res) => {
  console.log(req.body);
});

module.exports = router;
