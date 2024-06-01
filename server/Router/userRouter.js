const router = require("express").Router();
const { verifyToken } = require("../verifyToken");
const {
  putUserInfoByParams,
  deleteUserInfoByParams,
  getUserInfoByParams,
  insertAllData,
  deleteAllData,
  filterData,
} = require("../AppController/userController");

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
module.exports = router;
