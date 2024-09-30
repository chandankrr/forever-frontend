import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "categoryState",
  initialState,
  reducers: {
    loadCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { loadCategories } = categorySlice.actions;
export default categorySlice.reducer;
