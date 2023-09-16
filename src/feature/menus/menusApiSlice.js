import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const menusAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.prefDayOne.localeCompare(b.prefDayOne),
});

const initialState = menusAdapter.getInitialState();

export const menusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => ({
        url: "/menu",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      // Sans subscription dans UsersList dans ce temps imparti, on repart sur Loading - 60 secondes par défaut
      // keepUnusedDataFor: 60,

      transformResponse: (responseData) => {
        if (Array.isArray(responseData)) {
          const loadedMenus = responseData.map((menu) => {
            menu.id = menu._id;
            return menu;
          });
          return menusAdapter.setAll(initialState, loadedMenus);
        } else {
          // Gérer le cas où responseData n'est pas un tableau
          const loadedMenus = "Pas de Menus Sauvegardés";
          return initialState;
        }
      },
      providesTag: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Menu", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Menu", id })),
          ];
        } else return [{ type: "Menu", id: "LIST" }];
      },
    }),
    addNewMenu: builder.mutation({
      query: (initialMenuData) => {
        const requestBody = {
          user: initialMenuData.user,
          prefNbJ: initialMenuData.prefNbJ,
          prefNbMeal: initialMenuData.prefNbMeal,
          prefDayOne: initialMenuData.prefDayOne,
          menuJ: initialMenuData.menuJ,
        };
        // console.log("Request body sent to the server:", requestBody);

        return {
          url: "/menu",
          method: "POST",
          body: requestBody,
        };
      },
      // onQueryStarted: () => {
      //   console.log("Mutation started: addNewMenu");
      // },
      // onQuerySuccess: (response) => {
      //   console.log("Mutation succeeded: addNewMenu");
      //   console.log("Response from server:", response);
      // },
      // onQueryError: (error) => {
      //   console.error("Mutation failed: addNewMenu", error);
      // },
      // Forcer le cache à se mettre à jour:
      invalidatesTags: [{ type: "Menu", id: "LIST" }],
      // query: (initialMenuData) => ({
      //   url: "/menu",
      //   method: "POST",
      //   body: {
      //     ...initialMenuData,
      //   },
      // }),
      // // Forcer le cache à se mettre à jour:
      // invalidatesTags: [{ type: "Menu", id: "LIST" }],
    }),
    updateMenu: builder.mutation({
      query: (initialMenuData) => ({
        url: "/menu",
        method: "PATCH",
        body: {
          ...initialMenuData,
        },
      }),
      // Forcer le cache à se mettre à jour:
      invalidatesTags: (result, error, arg) => [{ type: "Menu", id: arg.id }],
    }),
    deleteMenu: builder.mutation({
      query: ({ id }) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),
      // Forcer le cache à se mettre à jour:
      invalidatesTags: (result, error, arg) => [{ type: "Menu", id: arg.id }],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useAddNewMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menusApiSlice;

// returns the query result object
export const selectMenusResult = menusApiSlice.endpoints.getMenus.select();

// creates memoized selector
const selectMenusData = createSelector(
  selectMenusResult,
  (menusResult) => menusResult.data // normalizes state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllMenus,
  selectById: selectMenuById,
  selectIds: selectMenuIds,
  // Pass in a selector that returns the menus slice of state
} = menusAdapter.getSelectors(
  (state) => selectMenusData(state) ?? initialState
);
