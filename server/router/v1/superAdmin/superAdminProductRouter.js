const router = require('express').Router();
const {
  verifyToken,
} = require('../../../middleware/superAdmin/superAdminAuthMiddleware');
const {
  getProductList,
  addProductList,
  addProduct,
  putProduct,
  deleteProduct,
} = require('../../../controllers/superAdmin/superAdminProductController');

router.post('/add-product-list', addProductList);
router.post('/add-product/:id', addProduct);
router.get('/get-product-list', getProductList);
router.put('/put-product/:id', putProduct);
router.delete('/delete-product/:id', deleteProduct);

module.exports = router;
