const router = require('express').Router();
const {
  verifyToken,
} = require('../../../middleware/superAdmin/superAdminAuthMiddleware');
const {
  putSuperAdminInfoByParams,
  deleteSuperAdminInfoByParams,
  getSuperAdminInfoByParams,
  /*insertAllData,
    deleteAllData,
    filterData,*/
} = require('../../../controllers/superAdmin/superAdminProfileController');

router.get(
  '/getSuperAdminInfoByParams/:id',
  verifyToken,
  getSuperAdminInfoByParams,
);

router.put(
  '/putSuperAdminInfoByParams/:id',
  verifyToken,
  putSuperAdminInfoByParams,
);

router.delete(
  '/deleteSuperAdminInfoByParams/:id',
  verifyToken,
  deleteSuperAdminInfoByParams,
);

/*router.post("/insertAllData", insertAllData);
router.delete("/deleteAllData", deleteAllData);
router.get("/filterData", filterData);*/
module.exports = router;
