import { createSlice } from "@reduxjs/toolkit";

export const menurecipesSlice = createSlice({
  name: "menu recipes",
  initialState: {
    menuRecipesData: [],
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
});

export const {
  getMenuRecipes,
  createMenuRecipe,
  deleteMenuRecipe,
  editMenuRecipe,
  resetMenuRecipes,
} = menurecipesSlice.actions;
export default menurecipesSlice.reducer;
