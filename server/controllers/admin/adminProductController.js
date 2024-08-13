const Product = require('../../model/productSchema');

const addProductList = async (req, res) => {
  // Validate that the request body is an array
  if (!Array.isArray(req.body)) {
    return res.status(400).json({
      type: 'error',
      message: 'Request body must be an array of products.',
    });
  }

  // Validate each product in the array
  const requiredFields = [
    'category',
    'subCategory',
    'name',
    'description',
    'image',
    'price',
  ];
  for (const product of req.body) {
    for (let field of requiredFields) {
      if (!product[field]) {
        return res.status(400).json({
          type: 'error',
          message: `Missing required field: ${field} in one of the products`,
        });
      }
    }
  }

  try {
    // Insert multiple products into the database
    const result = await Product.insertMany(req.body);

    // Respond with success
    res.status(200).json({
      type: 'success',
      payload: result,
    });
  } catch (err) {
    // Log the error details
    console.error('Error Saving Products:', err);

    // Respond with error details
    res.status(500).json({
      type: 'error',
      message: 'Failed to insert data',
      error: err.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, image, price, category, subCategory } = req.body;

    // Basic validation checks
    if (!name || !price || !category || !subCategory) {
      return res.status(400).json({
        status: 'fail',
        message: 'All fields are required',
      });
    }

    const existingProduct = await Product.findOne({ name: name });

    if (existingProduct) {
      return res.status(400).json({
        status: 'fail',
        message: 'Product already exists',
      });
    }

    // Create and save the product
    const product = new Product({
      name: name,
      description: description,
      image: image,
      price: price,
      category: category,
      subCategory: subCategory,
    });

    await product.save();

    // Respond with a success status and the created product data
    res.status(200).json({
      status: 'success',
      payload: product,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error adding product:', error); // Log the error for debugging purposes
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while adding the product.',
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findByIdAndDelete(req.params.id);

    if (!existingProduct) {
      return res.status(400).json({
        status: 'fail',
        message: 'Product does not exist.',
      });
    }

    // Respond with a success status
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error deleting product:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while deleting the product.',
    });
  }
};

const getProductList = async (req, res) => {
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
module.exports = {
  addProduct,
  deleteProduct,
  addProductList,
  getProductList,
};
