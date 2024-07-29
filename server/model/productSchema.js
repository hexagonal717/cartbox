const mongoose = require('mongoose');

const validSubCategories = {
  electronics: [
    'mobiles',
    'laptops',
    'headphones',
    'smartwatches',
    'televisions',
  ],
  grocery: ['vegetables', 'fruits', 'dairy', 'snacks', 'beverages'],
  fashion: ['men', 'women', 'kids', 'accessories'],
  books: ['fiction', 'nonFiction', 'educational', 'comics'],
};

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: Object.keys(validSubCategories),
    },
    subCategory: {
      type: String,
      required: true,
      validate: {
        validator: function (subCategory) {
          // Access the document instance directly
          return (
            validSubCategories[this.category] &&
            validSubCategories[this.category].includes(subCategory)
          );
        },
        message: function (props) {
          // Use the context of 'this' directly if needed
          return `${props.value} is not a valid subCategory for category ${props.instance ? props.instance.category : 'unknown'}`;
        },
      },
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
