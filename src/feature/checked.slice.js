import { createSlice } from "@reduxjs/toolkit";

export const checkedSlice = createSlice({
  name: "checked",
  initialState: {
    checkedRecipe: [],
  },
  reducers: {
    setChecked: (state, { payload }) => {
      state.checkedRecipe = payload;
    },
  },
});

export const { setChecked } = checkedSlice.actions;
export default checkedSlice.reducer;
