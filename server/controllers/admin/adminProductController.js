const Product = require('../../model/productSchema');
const Admin = require('../../model/adminSchema');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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
    'stockQuantity', // Added stockQuantity field
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
    const adminId = req.params.id;
    const { name, description, image, price, category, subCategory, stockQuantity } =
      req.body;

    // Basic validation checks
    if (
      !name ||
      !price ||
      !category ||
      !subCategory ||
      stockQuantity === undefined
    ) {
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
      adminId: adminId,
      description: description,
      image: image,
      price: price,
      category: category,
      subCategory: subCategory,
      stockQuantity: stockQuantity,
      // Added stockQuantity field
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

const putProduct = async (req, res) => {
  try {
    // Fetch the product from the database
    const existingProduct = await Product.findById(req.params.id);
    const existingUser = await Admin.findById(existingProduct.adminId);

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let imagePaths = [...existingProduct.image]; // Copy existing image URLs

    if (req.file) {
      // Construct the folder path based on the product's category and ID
      const uploadPath = `cartbox/${existingUser.role}/${existingUser._id}/products/${existingProduct._id}/images`;

      // Upload the image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: uploadPath,
        public_id: req.file.originalname.split('.')[0], // Filename without extension
        overwrite: true,
      });

      // Add the new image URL to the imagePaths array
      imagePaths.push(uploadedImage.secure_url);
    }

    // Prepare the fields to be updated
    const updateFields = {
      category: req.body.category,
      subCategory: req.body.subCategory,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      image: imagePaths, // Use the updated image array
      ...req.body,
    };

    // Update the product in the database
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true },
    );

    res.status(200).json({
      status: 'success',
      payload: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
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
  const adminId = req.params.id;

  try {
    const adminIdString = adminId.toString();
    const products = await Product.find(
      {
        adminId: new mongoose.Types.ObjectId(adminIdString),
      },
      {},
      { lean: true },
    );

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
  putProduct: [upload.single('image'), putProduct],
  deleteProduct,
  addProductList,
  getProductList,
};
