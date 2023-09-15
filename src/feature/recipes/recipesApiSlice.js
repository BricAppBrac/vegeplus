import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const recipesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = recipesAdapter.getInitialState();

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => "/recipe",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 60,
      transformResponse: (responseData) => {
        const loadedRecipes = responseData.map((recipe) => {
          recipe.id = recipe._id;
          return recipe;
        });
        return recipesAdapter.setAll(initialState, loadedRecipes);
      },
      providesTag: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Recipe", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Recipe", id })),
          ];
        } else return [{ type: "Recipe", id: "LIST" }];
      },
    }),
    addNewRecipe: builder.mutation({
      query: (initialRecipeData) => {
        const requestBody = {
          title: initialRecipeData.title,
          author: initialRecipeData.author,
          seasons: initialRecipeData.seasons,
          ingredients: initialRecipeData.ingredients,
          quantities: initialRecipeData.quantities,
          categories: initialRecipeData.categories,
          steps: initialRecipeData.steps,
        };
        // console.log("Request body sent to the server:", requestBody);

        return {
          url: "/recipe",
          method: "POST",
          body: requestBody,
        };
      },
      // onQueryStarted: () => {
      //   console.log("Mutation started: addNewRecipe");
      // },
      // onQuerySuccess: (response) => {
      //   console.log("Mutation succeeded: addNewRecipe");
      //   console.log("Response from server:", response);
      // },
      onQueryError: (error) => {
        console.error("Mutation failed: addNewRecipe", error);
      },
      // Forcer le cache à se mettre à jour:
      invalidatesTags: [{ type: "Recipe", id: "LIST" }],
    }),

    updateRecipe: builder.mutation({
      query: (updatedRecipeData) => {
        const requestBody = {
          ...updatedRecipeData,
        };
        // console.log("Request body sent to the server for update:", requestBody);
        // console.log(
        //   "Request body._id sent to the server for update:",
        //   updatedRecipeData._id
        // );

        return {
          url: `/recipe/${updatedRecipeData._id}`,
          method: "PUT",
          body: requestBody,
        };
      },
      // onQueryStarted: () => {
      //   console.log("Mutation started: updateRecipe");
      // },
      // onQuerySuccess: (response) => {
      //   console.log("Mutation succeeded: updateRecipe");
      //   console.log("Response from server:", response);
      // },
      onQueryError: (error) => {
        console.error("Mutation failed: updateRecipe", error);
      },
      // Forcer le cache à se mettre à jour:
      invalidatesTags: (result, error, arg) => [{ type: "Recipe", id: arg.id }],
    }),

    deleteRecipe: builder.mutation({
      query: ({ id }) => ({
        url: `/recipe/${id}`,
        method: "DELETE",
      }),
      // Forcer le cache à se mettre à jour:
      invalidatesTags: (result, error, arg) => [{ type: "Recipe", id: arg.id }],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useAddNewRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApiSlice;

// returns the query result object
export const selectRecipesResult =
  recipesApiSlice.endpoints.getRecipes.select();

// creates memoized selector
const selectRecipesData = createSelector(
  selectRecipesResult,
  (recipesResult) => recipesResult.data // normalizes state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllRecipes,
  selectById: selectRecipeById,
  selectIds: selectRecipeIds,
  // Pass in a selector that returns the recipes slice of state
} = recipesAdapter.getSelectors(
  (state) => selectRecipesData(state) ?? initialState
);
