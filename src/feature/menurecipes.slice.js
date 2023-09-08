import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Créez une action asynchrone pour obtenir la liste de recettes de menu depuis la base de données
export const fetchMenuRecipes = createAsyncThunk(
  "menuRecipes/fetchMenuRecipes",
  async () => {
    try {
      const response = await fetch(
        "/votre-endpoint-api-pour-les-recettes-de-menu"
      );
      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de la récupération des recettes de menu."
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const menurecipesSlice = createSlice({
  name: "menu-recipes",
  initialState: {
    menuRecipesData: [],
    status: "idle", // État initial de la requête
    error: null, // Stocke les erreurs en cas d'échec
  },
  reducers: {
    getMenuRecipes: (state, { payload }) => {
      state.menuRecipesData = payload;
    },
    createMenuRecipe: (state, { payload }) => {
      state.menuRecipesData.push(payload);
    },
    editMenuRecipe: (state, { payload }) => {
      state.menuRecipesData = state.menuRecipesData.map((recipe) => {
        if (recipe._id === payload[1]) {
          return {
            ...recipe,
            _id: payload[0]._id,
            title: payload[0].title,
            author: payload[0].author,
            seasons: payload[0].seasons,
            ingredients: payload[0].ingredients,
            quantities: payload[0].quantities,
            categories: payload[0].categories,
            steps: payload[0].steps,
          };
        } else {
          return recipe;
        }
      });
    },
    deleteMenuRecipe: (state, { payload }) => {
      state.menuRecipesData = state.menuRecipesData.filter(
        (recipe) => recipe._id !== payload
      );
    },
    resetMenuRecipes: (state) => {
      state.menuRecipesData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMenuRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menuRecipesData = action.payload;
      })
      .addCase(fetchMenuRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  getMenuRecipes,
  createMenuRecipe,
  deleteMenuRecipe,
  editMenuRecipe,
  resetMenuRecipes,
} = menurecipesSlice.actions;
export default menurecipesSlice.reducer;
