import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuData: [],
  },
  reducers: {
    // getMenu: (state, { payload }) => {
    getMenu: (state, { payload }) => {
      state.menuData = payload;
    },
    editMenu: (state, { payload }) => {
      state.menuData = state.menuData.map((menu) => {
        if (menu._id === payload[1]) {
          return {
            ...menu,
            dayone: payload[0].dayone,
          };
        } else {
          return menu;
        }
      });
    },
    deleteMenu: (state, { payload }) => {
      state.menuData = state.menuData.filter((menu) => menu._id !== payload);
    },
  },
});

// export const { getMenu, deleteMenu, editMenu } = menuSlice.actions;
export const { getMenu, deleteMenu, editMenu } = menuSlice.actions;
export default menuSlice.reducer;
