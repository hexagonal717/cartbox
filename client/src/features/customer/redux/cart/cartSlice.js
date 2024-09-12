import { createSlice } from '@reduxjs/toolkit';
import {
  addCartItem,
  getCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeCartItem,
  clearCart,
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

    ClearCart(state) {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        // Destructure payload safely
        const { cart, cartItems } = payload.payload || {};
        state.loading = false;
        state.cart = state.cart || {
          items: [cartItems],
          totalQuantity: 0,
          totalPrice: 0,
        };
        state.cart.items = cartItems || [];
        state.cart.totalQuantity = cart?.totalQuantity || 0;
        state.cart.totalPrice = cart?.totalPrice || 0;
      })
      .addCase(getCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, { payload }) => {
        const cart = payload.payload;
        state.loading = false;
        state.cart = cart; // Adjust based on the actual payload structure
      })
      .addCase(addCartItem.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = payload.cart; // Adjust based on the actual payload structure
      })
      .addCase(removeCartItem.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(increaseCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseCartItemQuantity.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = payload.cart; // Adjust based on the actual payload structure
      })
      .addCase(increaseCartItemQuantity.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(decreaseCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decreaseCartItemQuantity.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = payload.cart; // Adjust based on the actual payload structure
      })
      .addCase(decreaseCartItemQuantity.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = payload.cart;
      })
      .addCase(clearCart.rejected, (state, { payload }) => {
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
  ClearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
