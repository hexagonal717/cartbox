const router = require('express').Router();
const { verifyToken } = require('../../../middleware/admin/adminAuthMiddleware');
const {
  getProductList,
  addProductList,
  addProduct,
  putProduct,
  deleteProduct,
} = require('../../../controllers/admin/adminProductController');

router.post('/add-product-list', addProductList);
router.post('/add-product/:id', addProduct);
router.get('/get-product-list/:id', getProductList);
router.put('/put-product/:id', putProduct);
router.delete('/delete-product/:id', deleteProduct);

module.exports = router;
