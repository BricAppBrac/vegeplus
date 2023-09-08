import { createSlice } from "@reduxjs/toolkit";

export const signInUpSlice = createSlice({
  name: "displaySign",
  initialState: {
    displaySignUp: null,
    displaySignIn: null,
  },
  reducers: {
    setSignUp: (state, { payload }) => {
      state.displaySignUp = payload;
    },
    setCloseUp: (state, { payload }) => {
      state.closeSignUp = payload;
    },
    setSignIn: (state, { payload }) => {
      state.displaySignIn = payload;
    },
    setCloseIn: (state, { payload }) => {
      state.closeSignIn = payload;
    },
  },
});

export const { setSignUp, setCloseUp, setSignIn, setCloseIn } =
  signInUpSlice.actions;
export default signInUpSlice.reducer;
