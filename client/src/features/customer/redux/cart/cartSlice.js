import { createSlice } from '@reduxjs/toolkit';
import {
  addCartItem,
  getCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeCartItem,
} from '@/api/v1/customer/cart/cartActions.js';

// Create the slice
const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cart: { items: [], totalQuantity: 0, totalPrice: 0 },
    loading: false,
    error: null,
  },
  reducers: {
    AddCartItem(state, action) {

      const { items, totalPrice, totalQuantity } = action.payload;

      // Push each item individually into the state
      items.forEach((item) => {
        const existingItem = state.cart.items.find(
          (cartItem) => cartItem.productId === item.productId,
        );

        if (existingItem) {
          // Update existing item quantity and price
          existingItem.quantity += item.quantity;
        } else {
          // Add new item
          state.cart.items.push({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
          });
        }
      });

      // Update total quantity and price based on the payload
      state.cart.totalQuantity = totalQuantity;
      state.cart.totalPrice = totalPrice;
    },
    RemoveCartItem(state, action) {
      const productId = action.payload;
      const existingItem = state.cart.items.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        // Update totals
        state.cart.totalQuantity -= existingItem.quantity;
        state.cart.totalPrice -= existingItem.price * existingItem.quantity;
        // Remove the item from the cart
        state.cart.items = state.cart.items.filter(
          (item) => item.productId !== productId,
        );
      }
    },
    IncreaseItemQuantity(state, action) {
      const productId = action.payload;
      const existingItem = state.cart.items.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        // Increase item quantity and update totals
        existingItem.quantity += 1;
        state.cart.totalQuantity += 1;
        state.cart.totalPrice += existingItem.price;
      }
    },
    DecreaseItemQuantity(state, action) {
      const productId = action.payload;
      const existingItem = state.cart.items.find(
        (item) => item.productId === productId,
      );

      if (existingItem && existingItem.quantity > 1) {
        // Decrease item quantity and update totals
        existingItem.quantity -= 1;
        state.cart.totalQuantity -= 1;
        state.cart.totalPrice -= existingItem.price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        console.log('getCart pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        console.log('getCart fulfilled', payload);

        // Destructure payload safely
        const { cart, cartItems } = payload.payload || {};

        // Ensure cart is always initialized before assigning values
        state.cart = state.cart || { items: [cartItems], totalQuantity: 0, totalPrice: 0 };

        // Assign the cart items, total quantity, and total price from the payload
        state.cart.items = cartItems || []; // Set cart items safely
        state.cart.totalQuantity = cart?.totalQuantity || 0; // Use optional chaining for cart properties
        state.cart.totalPrice = cart?.totalPrice || 0; // Safely set totalPrice
      })
      .addCase(getCart.rejected, (state, { payload }) => {
        console.log('getCart rejected');
        state.loading = false;
        state.error = payload;
      })
      .addCase(addCartItem.pending, (state) => {
        console.log('addCartItem pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, { payload }) => {
        console.log('addCartItem fulfilled');
        const cart = payload.payload;
        state.loading = false;
        state.cart = cart; // Adjust based on the actual payload structure
      })
      .addCase(addCartItem.rejected, (state, { payload }) => {
        console.log('addCartItem rejected');
        state.loading = false;
        state.error = payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        console.log('removeCartItem pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, { payload }) => {
        console.log('removeCartItem fulfilled');
        state.loading = false;
        state.cart = payload.cart; // Adjust based on the actual payload structure
      })
      .addCase(removeCartItem.rejected, (state, { payload }) => {
        console.log('removeCartItem rejected');
        state.loading = false;
        state.error = payload;
      })
      .addCase(increaseCartItemQuantity.pending, (state) => {
        console.log('increaseCartItemQuantity pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseCartItemQuantity.fulfilled, (state, { payload }) => {
        console.log('increaseCartItemQuantity fulfilled');
        state.loading = false;
        state.cart = payload.cart; // Adjust based on the actual payload structure
      })
      .addCase(increaseCartItemQuantity.rejected, (state, { payload }) => {
        console.log('increaseCartItemQuantity rejected');
        state.loading = false;
        state.error = payload;
      })
      .addCase(decreaseCartItemQuantity.pending, (state) => {
        console.log('decreaseCartItemQuantity pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(decreaseCartItemQuantity.fulfilled, (state, { payload }) => {
        console.log('decreaseCartItemQuantity fulfilled');
        state.loading = false;
        state.cart = payload.cart; // Adjust based on the actual payload structure
      })
      .addCase(decreaseCartItemQuantity.rejected, (state, { payload }) => {
        console.log('decreaseCartItemQuantity rejected');
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  AddCartItem,
  DecreaseItemQuantity,
  RemoveCartItem,
  IncreaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
