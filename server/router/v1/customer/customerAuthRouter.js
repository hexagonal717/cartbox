const router = require("express").Router();
const {
  signup,
  login,
  forgotPassword,
  verifyOtp,
  changePassword,
} = require("../../../controllers/customer/customerAuthController");

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgotpassword", forgotPassword);

router.post("/verifyotp", verifyOtp);

router.post("/changepassword", changePassword);

module.exports = router;
