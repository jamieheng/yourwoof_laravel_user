import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.admin = null;
      localStorage.removeItem("admin");
    },
    authentication: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {},
});

export const { logOut, authentication } = authSlice.actions;
export default authSlice.reducer;
