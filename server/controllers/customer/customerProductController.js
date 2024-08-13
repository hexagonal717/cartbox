const Product = require('../../model/productSchema');

const getProductList = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
      query = {
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { category: searchRegex },
          { subCategory: searchRegex },
        ],
      };
    }

    const products = await Product.find(query);

    // Send success response with fetched products
    res.status(200).json({
      type: 'success',
      payload: products,
    });
  } catch (err) {
    console.error('Error Fetching Product List:', err.message);
    res.status(500).json({
      type: 'error',
      message: 'Failed to fetch product list',
      error: err.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    // Fetch a product from the database by ID
    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      return res.status(404).json({
        type: 'error',
        message: 'Product not found',
      });
    }

    // Send success response with fetched product
    res.status(200).json({
      type: 'success',
      payload: product,
    });
  } catch (err) {
    // Log the error details with more context
    console.error('Error Fetching Product:', err.message);

    // Respond with error details
    res.status(500).json({
      type: 'error',
      message: 'Failed to fetch product data',
      error: err.message,
    });
  }
};

const getProductListByCategory = async (req, res) => {
  try {
    const { category, subCategory } = req.query;

    // Build the query object
    const query = {};
    if (category) {
      query.category = category;
    }
    if (subCategory) {
      query.subCategory = subCategory;
    }

    // Fetch the filtered products from the database
    const filteredProducts = await Product.find(query);

    // Send success response with filtered products
    res.status(200).json({
      type: 'success',
      payload: filteredProducts,
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
  getProductList,
  getProduct,
  getProductListByCategory,
};
