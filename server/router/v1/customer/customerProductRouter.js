const router = require('express').Router();
const {
  verifyToken,
} = require('../../../middleware/customer/customerAuthMiddleware');
const {
  getProductInfoList,
  getProductDetailByParams,
} = require('../../../controllers/customer/customerProductController');

router.get('/getProductInfoList', getProductInfoList);

router.get('/getProductDetailByParams/:id', getProductDetailByParams);

module.exports = router;
