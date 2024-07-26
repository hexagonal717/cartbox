const router = require("express").Router();
const {verifyToken} = require("../../../middleware/customer/customerAuthMiddleware");
const {
    putCustomerInfoByParams,
    deleteCustomerInfoByParams,
    getCustomerInfoByParams,
    insertAllData,
    deleteAllData,
    filterData, findAllUsers, findUserByAge,
} = require("../../../controllers/customer/customerProfileController");

router.get("/getCustomerInfoByParams/:id", verifyToken, getCustomerInfoByParams);

router.put("/putCustomerInfoByParams/:id", verifyToken, putCustomerInfoByParams);

router.delete(
    "/deleteCustomerInfoByParams/:id",
    verifyToken,
    deleteCustomerInfoByParams,
);

router.post("/insertAllData", insertAllData);
router.delete("/deleteAllData", deleteAllData);
router.get("/filterData", filterData);
router.get("/mongoQuery/findAllUsers", findAllUsers);
router.get("/mongoQuery/findUserByAge", findUserByAge);
module.exports = router;
