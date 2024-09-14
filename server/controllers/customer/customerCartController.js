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
    const product = await Product.findById(productId, {}, { lean: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Find the customer's existingCart or create one if it doesn't exist
    let existingCart = await Cart.findOne({ customerId }, {}, {});
    if (!existingCart) {
      existingCart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        customerId,
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      });
    }

    // Check if the product already exists in the existingCart's items
    const itemIndex = existingCart.items.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );
    if (itemIndex !== -1) {
      // Update existing item
      existingCart.items[itemIndex].quantity += quantity;
      existingCart.items[itemIndex].price = product.price;
      existingCart.items[itemIndex].updatedAt = new Date(); // Update timestamp
    } else {
      // Create a new existingCart item
      const newItem = {
        _id: new mongoose.Types.ObjectId(),
        productId,
        quantity,
        price: product.price,
      };
      existingCart.items.push(newItem);
    }

    // Recalculate total quantity and price
    existingCart.totalQuantity = existingCart.items.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    existingCart.totalPrice = existingCart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    // Save the existingCart
    const cart = await existingCart.save();

    res.status(200).json({
      message: 'Item added to existingCart successfully',
      status: 'success',
      payload: cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { customerId, productId } = req.body;

    // Ensure required fields are provided
    if (!customerId || !productId) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Find the customer's cart
    let cart = await Cart.findOne({ customerId }, {}, {});
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the index of the item to be removed
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Recalculate total quantity and price
    cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      message: 'Item removed from cart successfully',
      status: 'success',
      cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

const increaseCartItemQuantity = async (req, res) => {
  try {
    const { customerId, productId } = req.body;

    // Ensure required fields are provided
    if (!customerId || !productId) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Find the customer's cart
    let cart = await Cart.findOne({ customerId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the index of the item to increase quantity
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    // Increase the quantity of the item
    cart.items[itemIndex].quantity += 1;

    // Recalculate total quantity and price
    cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      message: 'Item quantity increased successfully',
      status: 'success',
      cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to increase item quantity' });
  }
};

const decreaseCartItemQuantity = async (req, res) => {
  try {
    const { customerId, productId } = req.body;

    // Ensure required fields are provided
    if (!customerId || !productId) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Find the customer's cart
    let cart = await Cart.findOne({ customerId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the index of the item to decrease quantity
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    // Decrease the quantity of the item
    cart.items[itemIndex].quantity -= 1;

    // If quantity is 0 or less, remove the item from the cart
    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    // Recalculate total quantity and price
    cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      message: 'Item quantity decreased successfully',
      status: 'success',
      cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to decrease item quantity' });
  }
};

const getCart = async (req, res) => {
  try {
    const { id: customerId } = req.params;

    let cartData = await Cart.findOne(
      { customerId: customerId },
      {},
      { lean: true },
    );

    if (cartData) {
      const items =
        cartData.items && cartData.items.length > 0 ? cartData.items : [];

      const cart = cartData;

      const cartItems = cartData.items;

      const productIds = cartData.items.map((item) => item.productId.toString());

      const products = await Promise.all(
        productIds.map((productId) =>
          Product.find({ _id: productId }, {}, { lean: true }),
        ),
      ).then((result) => result.flat());

      res.status(200).json({
        status: 'success',
        message: 'Cart retrieved successfully',
        payload: {
          cart,
          cartItems,
          products,
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

const clearCart = async (req, res) => {
  try {
    const { id:customerId } = req.params;

    // Ensure required fields are provided
    if (!customerId) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Find the customer's cart
    let cartItems = await Cart.findOne({ customerId });
    if (!cartItems) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Clear the cart by setting items to an empty array and resetting totals
    cartItems.items = [];
    cartItems.totalQuantity = 0;
    cartItems.totalPrice = 0;

    // Save the updated cart
    const cart = await cartItems.save();

    res.status(200).json({
      message: 'Cart items have been successfully removed.',
      status: 'success',
      payload: cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to clear the cart' });
  }
};



module.exports = {
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  getCart,
  clearCart
};
