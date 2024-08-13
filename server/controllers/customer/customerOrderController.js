const Order = require('../../model/orderSchema');
const Product = require('../../model/productSchema');
const Customer = require('../../model/customerSchema');

const getOrder = async (req, res) => {
  console.log(req.params.id, 'FROM ORDERPAGE');

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
          orderItems, // Include orderItems in the payload
          products, // Include products in the payload
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
  console.log(customerId, items);

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
    const defaultAddress = customer.address.find(addr => addr.isDefault);

    // Use default address if no address is provided in the request
    let shippingAddress = req.body.shippingAddress || defaultAddress;
    let billingAddress = req.body.billingAddress || defaultAddress;

    // Check if we have default address to use
    if (!shippingAddress || !billingAddress) {
      return res.status(400).json({ error: 'Shipping and billing addresses are required' });
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
      status: 'pending', // Default status can be 'pending' or 'processing'
      shippingAddress,
      billingAddress,
    });

    await order.save();

    res.status(200).json({
      message: 'Order placed successfully',
      status: 'success',
      payload: order,
    });
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
