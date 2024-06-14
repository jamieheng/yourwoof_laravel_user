import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 user: localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : null,
 confirmationResult: null,
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
   state.user = null;
   state.confirmationResult = null;
   localStorage.removeItem("users");
  },
  authentication: (state, action) => {
   state.user = action.payload;
   localStorage.setItem("users", JSON.stringify(action.payload));
  },
  setConfirmationResult: (state, action) => {
   state.confirmationResult = action.payload;
  },
 },
 extraReducers: (builder) => {},
});

export const { logOut, authentication, setConfirmationResult } =
 authSlice.actions;
export default authSlice.reducer;