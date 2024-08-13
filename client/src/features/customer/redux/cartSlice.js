import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    localAddCartItem(state, action) {
      const { productId, price, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, price, quantity });
      }

      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },
    localRemoveCartItem(state, action) {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.productId !== productId);
      }
    },
    localIncreaseItemQuantity(state, action) {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += existingItem.price;
      }
    },
    localDecreaseItemQuantity(state, action) {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
      }
    },
  },
});

export const {
  localAddCartItem,
  localDecreaseItemQuantity,
  localRemoveCartItem,
  localIncreaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
