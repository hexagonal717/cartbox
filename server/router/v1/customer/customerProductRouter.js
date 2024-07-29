const router = require('express').Router();
const {
  verifyToken,
} = require('../../../middleware/customer/customerAuthMiddleware');
const {
  getProductList,
  getProduct,
} = require('../../../controllers/customer/customerProductController');

router.get('/get-product-list', getProductList);

router.get('/get-product/:id', getProduct);

module.exports = router;
