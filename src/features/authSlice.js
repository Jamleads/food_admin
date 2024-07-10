import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const token = JSON.parse(localStorage.getItem("token"));
console.log(user, token);

const initialState = {
  user: user ?? null,
  token: token ?? "",
  isAuthenticated: (!!token && !!user) ?? false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setAuthState, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
