import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Créez une action asynchrone pour obtenir la liste de menus depuis la base de données
export const fetchListeMenus = createAsyncThunk(
  "listemenus/fetchListeMenus",
  async () => {
    try {
      const response = await fetch(
        "/votre-endpoint-api-pour-la-liste-de-menus"
      );
      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de la récupération des menus."
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const menuslisteSlice = createSlice({
  name: "listemenus",
  initialState: {
    menusData: [],
    status: "idle", // État initial de la requête
    error: null, // Stocke les erreurs en cas d'échec
  },
  reducers: {
    getListeMenus: (state, { payload }) => {
      state.menusData = payload;
    },
    editListeMenus: (state, { payload }) => {
      state.menusData = state.menusData.map((menu) => {
        if (menu._id === payload[1]) {
          return {
            ...menu,
            prefNbJ: payload[0].prefNbJ,
            prefNbMeal: payload[0].prefNbMeal,
            prefDayOne: payload[0].prefDayOne,
            menuJ: payload[0].menuJ,
          };
        } else {
          return menu;
        }
      });
    },
    deleteListeMenu: (state, { payload }) => {
      state.menusData = state.menusData.filter((menu) => menu._id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListeMenus.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchListeMenus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menusData = action.payload;
      })
      .addCase(fetchListeMenus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getListeMenus, deleteListeMenu, editListeMenu } =
  menuslisteSlice.actions;
export default menuslisteSlice.reducer;
