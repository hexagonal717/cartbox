const {
  addCartItem,
  getCart,
  getCartProductIds,
} = require('../../../controllers/customer/customerCartController');
const router = require('express').Router();

router.post('/add-cart-item', addCartItem);
router.get('/get-cart/:id', getCart);
router.get('/get-cart-product/:id', getCartProductIds);

module.exports = router;
