import { createSlice } from "@reduxjs/toolkit";

export const sortmenusSlice = createSlice({
  name: "sortmenus",
  initialState: {
    sortSelectedMenus: ["Croissant", null],
  },
  reducers: {
    setSortMenus: (state, { payload }) => {
      state.sortSelectedMenus = payload;
    },
  },
});

export const { setSortMenus } = sortmenusSlice.actions;
export default sortmenusSlice.reducer;
