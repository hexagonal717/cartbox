const router = require("express").Router();
const {verifyToken} = require("../verifyToken");
const {
    putAdminInfoByParams,
    deleteAdminInfoByParams,
    getAdminInfoByParams,
    /*insertAllData,
    deleteAllData,
    filterData,*/
} = require("../appController/adminController");

router.get("/getAdminInfoByParams/:id", verifyToken, getAdminInfoByParams);

router.put("/putAdminInfoByParams/:id", verifyToken, putAdminInfoByParams);

router.delete(
    "/deleteAdminInfoByParams/:id",
    verifyToken,
    deleteAdminInfoByParams,
);

/*router.post("/insertAllData", insertAllData);
router.delete("/deleteAllData", deleteAllData);
router.get("/filterData", filterData);*/
module.exports = router;
