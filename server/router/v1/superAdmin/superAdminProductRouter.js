const router = require("express").Router();
const {verifyToken} = require("../../../middleware/superAdmin/superAdminAuthMiddleware");
const {
    addProductInfoList,
    getProductInfoList
} = require("../../../controllers/superAdmin/superAdminProductController");


router.post("/addProductInfoList", addProductInfoList);
router.get("/getProductInfoList", getProductInfoList);

module.exports = router;
