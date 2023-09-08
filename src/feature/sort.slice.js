import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sorts",
  initialState: {
    sortSelected: ["Croissant", null, null],
  },
  reducers: {
    setSort: (state, { payload }) => {
      state.sortSelected = payload;
    },
  },
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;
