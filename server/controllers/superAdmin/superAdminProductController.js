const Product = require("../../model/productSchema");

const addProductInfoList = async (req, res) => {
    console.log("Request Body:", req.body);

    // Validate that the request body is an array
    if (!Array.isArray(req.body)) {
        return res.status(400).json({
            type: "error",
            message: "Request body must be an array of products."
        });
    }

    // Validate each product in the array
    const requiredFields = ['category', 'subCategory', 'name', 'description', 'image', 'price'];
    for (const product of req.body) {
        for (let field of requiredFields) {
            if (!product[field]) {
                return res.status(400).json({
                    type: "error",
                    message: `Missing required field: ${field} in one of the products`
                });
            }
        }
    }

    try {
        // Insert multiple products into the database
        const result = await Product.insertMany(req.body);

        console.log("Product Instances:", result);

        // Respond with success
        res.status(200).json({
            type: "success",
            payload: result
        });
    } catch (err) {
        // Log the error details
        console.error("Error Saving Products:", err);

        // Respond with error details
        res.status(500).json({
            type: "error",
            message: "Failed to insert data",
            error: err.message
        });
    }
};


const getProductInfoList = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // Send success response with fetched products
        res.status(200).json({
            type: "success",
            payload: products
        });
    } catch (err) {
        // Log the error details
        console.error("Error Fetching Products:", err);

        // Respond with error details
        res.status(500).json({
            type: "error",
            message: "Failed to fetch data",
            error: err.message
        });
    }
};
module.exports = {
    addProductInfoList,
    getProductInfoList
};
