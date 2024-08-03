const Cart = require('../../model/cartSchema');
const CartItem = require('../../model/cartItemSchema');
const Product = require('../../model/productSchema');

const addCartItem = async (req, res) => {
  try {
    const { customerId, productId, quantity } = req.body;

    // Find the product to get its price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Find an existing CartItem for the given productId and customerId
    let cartItem = await CartItem.findOne(
      {
        customerId,
        productId,
      },
      {},
      {},
    );

    const price = product.price;

    console.log(price, 'PRICEEEEEEE');

    if (cartItem) {
      // If the CartItem exists, update the quantity
      cartItem.quantity += quantity;
      cartItem.price = product.price; // Ensure price is up-to-date
      await cartItem.save();
    } else {
      // Create a new CartItem if it doesn't exist
      cartItem = new CartItem({
        customerId,
        productId,
        quantity,
        price: product.price, // Assuming `price` is a field in Product schema
      });
      await cartItem.save();
    }

    // Find the customer's cart or create one if it doesn't exist
    let cart = await Cart.findOne({ customerId });
    if (!cart) {
      cart = new Cart({
        customerId,
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      });
    }

    // Update the cart with the new or updated cartItem
    const existingItemIndex = cart.items.indexOf(cartItem._id);
    if (existingItemIndex === -1) {
      cart.items.push(cartItem._id);
    }

    // Calculate total quantity and price
    cart.totalQuantity = await CartItem.aggregate([
      { $match: { _id: { $in: cart.items } } },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$quantity' },
          totalPrice: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
    ]).then((result) => result[0]?.totalQuantity || 0);

    cart.totalPrice = await CartItem.aggregate([
      { $match: { _id: { $in: cart.items } } },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
    ]).then((result) => result[0]?.totalPrice || 0);

    // Ensure totalPrice is a valid number
    if (isNaN(cart.totalPrice)) {
      cart.totalPrice = 0;
    }

    await cart.save();

    res.status(201).json({
      message: 'Item added to cart successfully',
      cartItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

module.exports = {
  addCartItem,
};
