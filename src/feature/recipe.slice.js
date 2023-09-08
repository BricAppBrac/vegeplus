import { createSlice } from "@reduxjs/toolkit";

export const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipeData: [],
  },

  reducers: {
    createRecipe: (state, { payload }) => {
      // state.recipeData.push(payload);
      state.recipeData = payload;
    },

    editNewRecipe: (state, { payload }) => {
      state.recipeData = state.recipeData.map((recipe) => {
        return {
          // ...recipe,
          title: payload.title,
          author: payload.author,
          seasons: payload.seasons,
          ingredients: payload.ingredients,
          quantities: payload.quantities,
          categories: payload.categories,
          steps: payload.steps,
        };
      });
    },

    deleteNewRecipe: (state, { payload }) => {
      state.recipeData = state.recipeData.filter(
        (recipe) => recipe._id !== payload
      );
    },
  },
});

export const { createRecipe, deleteNewRecipe, editNewRecipe } =
  recipeSlice.actions;
export default recipeSlice.reducer;
