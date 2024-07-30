const Product = require('../../model/productSchema');

const getProductInfoList = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Send success response with fetched products
    res.status(200).json({
      type: 'success',
      payload: products,
    });
  } catch (err) {
    // Log the error details
    console.error('Error Fetching Products:', err);

    // Respond with error details
    res.status(500).json({
      type: 'error',
      message: 'Failed to fetch data',
      error: err.message,
    });
  }
};

const getProductDetailByParams = async (req, res) => {
  try {
    // Fetch a product from the database
    const product = await Product.find(
      { _id: req.params.id },
      {},
      { lean: true },
    );

    console.log(product, 'dsdsds');

    // Send success response with fetched product
    res.status(200).json({
      type: 'success',
      payload: product,
    });
  } catch (err) {
    // Log the error details
    console.error('Error Fetching Products:', err);

    // Respond with error details
    res.status(500).json({
      type: 'error',
      message: 'Failed to fetch data',
      error: err.message,
    });
  }
};

module.exports = {
  getProductInfoList,
  getProductDetailByParams,
};
