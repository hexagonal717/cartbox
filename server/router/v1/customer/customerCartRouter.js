const {
  addCartItem,
  getCart,
  removeCartItem,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
} = require('../../../controllers/customer/customerCartController');
const router = require('express').Router();

router.post('/add-cart-item', addCartItem);
router.post('/remove-cart-item', removeCartItem);
router.get('/get-cart/:id', getCart);

router.patch('/increase-cart-item-quantity', increaseCartItemQuantity);
router.patch('/decrease-cart-item-quantity', decreaseCartItemQuantity);

module.exports = router;
