const mongoose = require('mongoose');
const Cart = require('../../model/cartSchema');
const Product = require('../../model/productSchema');

const addCartItem = async (req, res) => {
  try {
    const { customerId, productId, quantity } = req.body;

    // Ensure required fields are provided
    if (!customerId || !productId || !quantity) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Find the product to get its price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Find the customer's cart or create one if it doesn't exist
    let cart = await Cart.findOne({ customerId });
    if (!cart) {
      cart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        customerId,
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      });
    }

    // Check if the product already exists in the cart's items
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );
    if (itemIndex !== -1) {
      // Update existing item
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price = product.price;
      cart.items[itemIndex].updatedAt = new Date(); // Update timestamp
    } else {
      // Create a new cart item
      const newItem = {
        _id: new mongoose.Types.ObjectId(),
        productId,
        quantity,
        price: product.price,
      };
      cart.items.push(newItem);
    }

    // Recalculate total quantity and price
    cart.totalQuantity = cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    // Save the cart
    await cart.save();

    res.status(200).json({
      message: 'Item added to cart successfully',
      success: true,
      cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

const getCart = async (req, res) => {
  try {
    const { id: customerId } = req.params;

    console.log('cart customer id', customerId);

    let cart = await Cart.findOne(
      { customerId: customerId },
      {},
      { lean: true },
    );

    console.log(cart, 'cart value');

    if (cart) {
      const items = cart.items && cart.items.length > 0 ? cart.items : [];

      console.log(items, 'fddddddddd');

      res.status(200).json({
        status: 'success',
        message: 'Cart retrieved successfully',
        payload: {
          ...cart,
          items,
        },
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Cart not found for the given customerId',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while retrieving the cart',
      error: error.message,
      success: false,
    });
  }
};

const getCartProductIds = async (req, res) => {
  try {
    const { id: customerId } = req.params;

    console.log('cart customer id', customerId);

    let cart = await Cart.findOne(
      { customerId: customerId },
      {},
      { lean: true },
    );

    console.log(cart, 'cart value');

    if (cart) {
      const items = cart.items && cart.items.length > 0 ? cart.items : [];

      const cartItems = cart.items;

      const productIds = cart.items.map((item) => item.productId.toString());

      const abc = await Promise.all(
        productIds.map((productId) =>
          Product.find({ _id: productId }, {}, { lean: true }),
        ),
      );

      console.log(items, 'fddddddddd');

      res.status(200).json({
        status: 'success',
        message: 'Cart retrieved successfully',
        payload: {
          abc,
          cartItems,
        },
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Cart not found for the given customerId',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while retrieving the cart',
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  addCartItem,
  getCart,
  getCartProductIds,
};
