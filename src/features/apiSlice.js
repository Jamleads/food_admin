import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
};

const apiSlice = createSlice({
  name: "allData",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setCategories, setProducts } = apiSlice.actions;
export default apiSlice.reducer;
