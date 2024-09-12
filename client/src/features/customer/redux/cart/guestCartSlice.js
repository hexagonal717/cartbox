import { createSlice } from '@reduxjs/toolkit';

const guestCartSlice = createSlice({
  name: 'guestCartSlice',
  initialState: {
    cart: { items: [], totalQuantity: 0, totalPrice: 0 },
  },
  reducers: {
    AddCartItem(state, action) {
      const { product } = action.payload;
      const { _id, price } = product;

      const existingItem = state.cart.items.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.items.push({ _id, price, quantity: 1 });
      }

      state.cart.totalQuantity = state.cart.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );

      state.cart.totalPrice += price;
    },
    RemoveCartItem(state, action) {
      const _id = action.payload;

      const existingItem = state.cart.items.find((item) => item._id === _id);

      if (existingItem) {
        state.cart.totalQuantity -= existingItem.quantity;
        state.cart.totalPrice -= existingItem.price * existingItem.quantity;
        state.cart.items = state.cart.items.filter((item) => item._id !== _id);
      }
    },
    IncreaseItemQuantity(state, action) {
      const _id = action.payload;
      const existingItem = state.cart.items.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity += 1;
        state.cart.totalQuantity += 1;
        state.cart.totalPrice += existingItem.price;
      }
    },
    DecreaseItemQuantity(state, action) {
      const _id = action.payload;
      const existingItem = state.cart.items.find((item) => item._id === _id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.cart.totalQuantity -= 1;
        state.cart.totalPrice -= existingItem.price;
      } else if (existingItem && existingItem.quantity === 1) {
        state.cart.items = state.cart.items.filter((item) => item._id !== _id);
        state.cart.totalQuantity -= 1;
        state.cart.totalPrice -= existingItem.price;
      }
    },
    ClearGuestCart(state) {
      state.cart = { items: [], totalQuantity: 0, totalPrice: 0 };
    },
  },
});

export const {
  AddCartItem,
  DecreaseItemQuantity,
  RemoveCartItem,
  IncreaseItemQuantity,
  ClearGuestCart,
} = guestCartSlice.actions;
export default guestCartSlice.reducer;
