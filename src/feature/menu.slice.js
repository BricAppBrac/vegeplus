import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Créez une action asynchrone pour charger les données du menu depuis l'API
export const fetchMenuData = createAsyncThunk(
  "menu/fetchMenuData",
  async (_, { getState, dispatch }) => {
    const token = getState().auth.token;
    const response = await fetch("http://localhost:5000/menu", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données du menu.");
    }

    const data = await response.json();
    return data;
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuData: [],
    loading: false,
    error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.loading = false;
        state.menuData = action.payload;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getMenu, deleteMenu, editMenu } = menuSlice.actions;
export default menuSlice.reducer;
