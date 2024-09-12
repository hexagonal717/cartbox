const Order = require('../../model/orderSchema');
const Product = require('../../model/productSchema');
const Customer = require('../../model/customerSchema');
const Cart = require('../../model/cartSchema');

const getOrder = async (req, res) => {
  try {
    const { id: customerId } = req.params;

    const customer = Customer.findById(customerId);

    if (!customer) {
      res.status(404).json({
        status: 'error',
        message: 'No Customer was found for the given customerId',
      });
    }

    // Find orders for the given customerId
    let orders = await Order.find({ customerId: customerId }, {}, { lean: true });

    if (orders && orders.length > 0) {
      // Extract productIds from order items
      const productIds = orders.flatMap((order) =>
        order.items.map((item) => item.productId.toString()),
      );

      // Fetch product details for all productIds in the orders
      const products = await Product.find(
        { _id: { $in: productIds } },
        {},
        { lean: true },
      );

      // Extract order items
      const orderItems = orders.flatMap((order) => order.items);

      res.status(200).json({
        status: 'success',
        message: 'Orders retrieved successfully',
        payload: {
          orders,
          orderItems,
          products,
        },
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'No orders found for the given customerId',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while retrieving the orders',
      error: error.message,
      success: false,
    });
  }
};

const addOrder = async (req, res) => {
  const { id: customerId } = req.params;
  const { items } = req.body;

  try {
    // Ensure required fields are provided
    if (!customerId || !items || !items.length) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Fetch the customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Find the default address
    const defaultAddress = customer.address.find((addr) => addr.isDefault);

    // Use default address if no address is provided in the request
    let shippingAddress = req.body.shippingAddress || defaultAddress;
    let billingAddress = req.body.billingAddress || defaultAddress;

    // Check if we have default addresses to use
    if (!shippingAddress || !billingAddress) {
      return res
        .status(400)
        .json({ error: 'Shipping and billing addresses are required' });
    }

    let totalQuantity = 0;
    let totalPrice = 0;

    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId, {}, { lean: true });
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        const quantity = item.quantity;
        const price = product.price;

        totalQuantity += quantity;
        totalPrice += quantity * price;

        // Ensure there's enough stock
        if (product.stockQuantity < quantity) {
          throw new Error(`Not enough stock for product ID ${item.productId}`);
        }

        // Decrease stock quantity
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stockQuantity: -quantity },
        });

        return {
          productId: product._id,
          quantity,
          price,
        };
      }),
    );

    // Generate a unique 6-digit order number
    const orderNumber = await generateOrderNumber();

    // Create the new order
    const order = new Order({
      customerId,
      orderNumber,
      items: orderItems,
      totalQuantity,
      totalPrice,
      status: 'pending',
      shippingAddress,
      billingAddress,
    });

    await order.save();

    const paymentSuccess = Math.random() < 0.9;

    if (paymentSuccess) {
      order.status = 'processing';
      await order.save();

      // Clear the customer's cart
      await Cart.findOneAndUpdate(
        { customerId },
        { $set: { items: [], totalQuantity: 0, totalPrice: 0 } },
        { new: true }
      );

      res.status(200).json({
        message: 'Order placed successfully',
        status: 'success',
        payload: order,
      });
    } else {
      // Payment failed, restore the stock quantity
      await Promise.all(
        orderItems.map(async (item) => {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stockQuantity: item.quantity },
          });
        }),
      );

      order.status = 'pending';

      res.status(200).json({
        message: 'Payment failed',
        status: 'pending',
        payload: order,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

const generateOrderNumber = async () => {
  let orderNumber;
  let orderExists = true;

  while (orderExists) {
    orderNumber = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number

    const existingOrder = await Order.findOne({ orderNumber });
    orderExists = !!existingOrder;
  }

  return orderNumber;
};
module.exports = {
  getOrder,
  addOrder,
};
