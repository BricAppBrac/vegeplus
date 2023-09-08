import { createSlice } from "@reduxjs/toolkit";

export const indicstopresetSlice = createSlice({
  name: "indicstopreset",
  initialState: {
    stopReset: null,
  },
  reducers: {
    setStopReset: (state, { payload }) => {
      state.stopReset = payload;
    },
  },
});

export const { setStopReset } = indicstopresetSlice.actions;
export default indicstopresetSlice.reducer;
