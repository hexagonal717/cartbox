const {
  addCartItem,
  getCart,
} = require('../../../controllers/customer/customerCartController');
const router = require('express').Router();

router.post('/add-cart-item', addCartItem);
router.get('/get-cart/:id', getCart);

module.exports = router;
