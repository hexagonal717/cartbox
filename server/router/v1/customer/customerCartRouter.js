const { addCartItem } = require('../../../controllers/customer/customerCartController');
const router = require("express").Router();

router.post("/addCartItem", addCartItem)

module.exports = router;