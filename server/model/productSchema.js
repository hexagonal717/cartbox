const mongoose = require('mongoose');

const validSubCategories = {
  electronics: [
    'mobiles',
    'laptops',
    'tablets',
    'headphones',
    'smartwatches',
    'televisions',
    'cameras',
    'gaming_consoles',
    'speakers',
    'wearable_tech',
    'computer_accessories',
    'drones',
    'home_appliances',
  ],
  fashion: [
    'clothing_men',
    'shoes_men',
    'accessories_men',
    'clothing_women',
    'shoes_women',
    'accessories_women',
    'clothing_kids',
    'shoes_kids',
    'accessories_kids',
    'hats',
    'socks',
    'gloves',
    'sunglasses',
    'tracksuits',
    'activewear',
    'lingerie',
    'underwear',
  ],
  grocery: [
    'vegetables',
    'fruits',
    'dairy',
    'snacks',
    'beverages',
    'grains',
    'meat_seafood',
    'frozen_food',
    'condiments_spices',
  ],
  books: [
    'fiction',
    'non_fiction',
    'educational',
    'comics',
    'self_help',
    'children',
    'mystery',
    'science_fiction',
    'fantasy',
  ],
  furniture: [
    'living_room',
    'bedroom',
    'dining_room',
    'office',
    'kitchen',
    'outdoor',
    'storage',
  ],
  home_appliances: [
    'cookware',
    'bedding',
    'furniture',
    'home_decor',
    'kitchen_appliances',
    'storage_solutions',
    'lighting',
    'cleaning_supplies',
  ],
  beauty_and_health: [
    'skincare',
    'haircare',
    'makeup',
    'fragrances',
    'personal_care',
    'supplements',
    'fitness_equipment',
  ],
  sports_and_outdoors: [
    'sports_equipment',
    'outdoor_gear',
    'fitness',
    'camping_hiking',
    'cycling',
    'water_sports',
    'winter_sports',
    'team_sports',
  ],
  toys_and_games: [
    'action_figures',
    'puzzles',
    'board_games',
    'dolls',
    'remote_control_toys',
    'educational_toys',
    'video_games',
    'outdoor_toys',
  ],
  automotive: [
    'car_accessories',
    'motorcycle_accessories',
    'car_electronics',
    'tires_wheels',
    'car_care',
    'tools_equipment',
    'batteries_chargers',
  ],
  pet_supplies: [
    'dog_supplies',
    'cat_supplies',
    'bird_supplies',
    'fish_aquatic_supplies',
    'reptile_supplies',
    'small_animal_supplies',
  ],
  tools: [
    'hand_tools',
    'power_tools',
    'gardening_tools',
    'mechanic_tools',
    'painting_tools',
    'safety_gear',
    'tool_storage',
    'workbenches',
    'measuring_tools',
    'drills',
    'saws',
    'wrenches',
    'screwdrivers',
    'hammers',
    'pliers',
  ],
};

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
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
          const categorySubCategories = validSubCategories[this.category];
          return (
            categorySubCategories &&
            (Array.isArray(categorySubCategories)
              ? categorySubCategories.includes(subCategory)
              : Object.values(categorySubCategories).flat().includes(subCategory))
          );
        },
        message: function (props) {
          return `${props.value} is not a valid subCategory for category ${this.category}`;
        },
      },
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    image: [
      {
        type: String,
        validate: {
          validator: function (v) {
            // Simple URL validation regex
            return /^(http|https):\/\/[^ "]+$/.test(v);
          },
          message: 'Invalid image URL',
        },
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    stock: {
      type: Boolean,
      default: function () {
        return this.stockQuantity > 0;
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
