const router = require("express").Router();
const {verifyToken} = require("../../../middleware/customer/customerAuthMiddleware");
const {
    getProductInfoList
} = require("../../../controllers/customer/customerProductController");

router.get("/getProductInfoList", getProductInfoList);

module.exports = router;
