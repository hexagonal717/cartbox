const {
  addOrder,
  getOrder,
} = require('../../../controllers/customer/customerOrderController');
const router = require('express').Router();

router.get('/get-order/:id', getOrder);

router.post('/add-order/:id', addOrder);

module.exports = router;
