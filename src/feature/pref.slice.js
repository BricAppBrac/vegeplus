import { createSlice } from "@reduxjs/toolkit";

export const prefSlice = createSlice({
  name: "prefs",
  initialState: {
    prefSelected: ["7", "2", null],
  },
  reducers: {
    setPref: (state, { payload }) => {
      state.prefSelected = payload;
    },
    resetPref: (state, { payload }) => {
      state.prefSelected = [null, null, null];
    },
  },
});

export const { setPref, resetPref } = prefSlice.actions;
export default prefSlice.reducer;
