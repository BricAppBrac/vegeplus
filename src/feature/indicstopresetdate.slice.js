import { createSlice } from "@reduxjs/toolkit";

export const indicstopresetdateSlice = createSlice({
  name: "indicstopresetdate",
  initialState: {
    stopResetDate: null,
  },
  reducers: {
    setStopResetDate: (state, { payload }) => {
      state.stopResetDate = payload;
    },
  },
});

export const { setStopResetDate } = indicstopresetdateSlice.actions;
export default indicstopresetdateSlice.reducer;
