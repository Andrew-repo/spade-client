import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      state.cart = [...state.cart, payload];
    },
    deleteCartItem: (state, { payload }) => {
      state.cart = state?.cart.filter((item) => item._id !== payload);
    },
    updateCartItem: (state, { payload }) => {
      const { _id, ...rest } = payload;

      state.cart = state?.cart?.map((item) => {
        if (item._id === _id) {
          return { ...item, ...rest };
        }
        return item;
      });
    },
    emptyCart: (state, { payload }) => {
      state.cart = payload;
    },
    setTotalprice: (state, { payload }) => {
      state.totalPrice = payload;
    },
    resetTotalPrice: (state) => {
      state.totalPrice = 0;
    },
  },
});

const { reducer, actions } = cartSlice;

export const {
  setCart,
  deleteCartItem,
  updateCartItem,
  emptyCart,
  setTotalprice,
  resetTotalPrice,
} = actions;

export default reducer;
