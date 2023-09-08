import { createSlice } from "@reduxjs/toolkit";

export const listeSlice = createSlice({
  name: "liste",
  initialState: {
    listeData: [],
  },
  reducers: {
    getListe: (state, { payload }) => {
      state.listeData = payload;
    },
    editRecipe: (state, { payload }) => {
      state.listeData = state.listeData.map((recipe) => {
        if (recipe._id === payload[1]) {
          return {
            ...recipe,
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
    deleteRecipe: (state, { payload }) => {
      state.listeData = state.listeData.filter(
        (recipe) => recipe._id !== payload
      );
    },
  },
});

export const { getListe, deleteRecipe, editRecipe } = listeSlice.actions;
export default listeSlice.reducer;
