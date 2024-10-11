import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cartState",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            item.id !== action.payload.productId &&
            item.variant.id !== action.payload.variantId
        ),
      };
    },
    updateQuantity: (state, action) => {
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.variant.id === action.payload.variantId) {
            return {
              ...item,
              quantity: action.payload.quantity,
              subTotal: action.payload.quantity * item.price,
            };
          }
          return item;
        }),
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        cart: [],
      };
    },
  },
});

export const countCartItems = (state) => state.cartState.cart.length;
export const selectCartItems = (state) => state.cartState.cart ?? [];
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
