const router = require('express').Router();
const { verifyToken } = require('../../../middleware/admin/adminAuthMiddleware');
const {
  getProductList,
  addProductList,
  addProduct,
  deleteProduct,
} = require('../../../controllers/admin/adminProductController');

router.post('/add-product-list', addProductList);
router.post('/add-product', addProduct);
router.get('/get-product-list', getProductList);
router.delete('/delete-product/:id', deleteProduct);

module.exports = router;
