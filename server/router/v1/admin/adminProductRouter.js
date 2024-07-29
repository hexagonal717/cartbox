const router = require('express').Router();
const {
  verifyToken,
} = require('../../../middleware/admin/adminAuthMiddleware');
const {
  getProductList,
  addProductList,
} = require('../../../controllers/admin/adminProductController');

router.post('/add-product-list', addProductList);
router.get('/get-product-list', getProductList);

module.exports = router;
