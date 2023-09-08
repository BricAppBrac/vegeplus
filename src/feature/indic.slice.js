import { createSlice } from "@reduxjs/toolkit";

export const indicSlice = createSlice({
  name: "indicators",
  initialState: {
    confDelete: null,
  },
  reducers: {
    setConfirmDelete: (state, { payload }) => {
      state.confDelete = payload;
    },
  },
});

export const { setConfirmDelete } = indicSlice.actions;
export default indicSlice.reducer;
