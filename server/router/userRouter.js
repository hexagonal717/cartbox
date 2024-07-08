const router = require("express").Router();
const {verifyToken} = require("../verifyToken");
const {
    putUserInfoByParams,
    deleteUserInfoByParams,
    getUserInfoByParams,
    insertAllData,
    deleteAllData,
    filterData, findAllUsers, findUserByAge,
} = require("../appController/userController");

router.get("/getUserInfoByParams/:id", verifyToken, getUserInfoByParams);

router.put("/putUserInfoByParams/:id", verifyToken, putUserInfoByParams);

router.delete(
    "/deleteUserInfoByParams/:id",
    verifyToken,
    deleteUserInfoByParams,
);

router.post("/insertAllData", insertAllData);
router.delete("/deleteAllData", deleteAllData);
router.get("/filterData", filterData);
router.get("/mongoQuery/findAllUsers", findAllUsers);
router.get("/mongoQuery/findUserByAge", findUserByAge);
module.exports = router;
