import { configureStore } from "@reduxjs/toolkit";
import signInUpReducer from "../feature/signInUp.slice";
import recipeReducer from "../feature/recipe.slice";
import listeReducer from "../feature/liste.slice";
import sortReducer from "../feature/sort.slice";
import sortmenusReducer from "../feature/sortmenus.slice";
import checkedReducer from "../feature/checked.slice";
import indicReducer from "../feature/indic.slice";
import prefReducer from "../feature/pref.slice";
import menusReducer from "../feature/menusliste.slice";
import menurecipesReducer from "../feature/menurecipes.slice";
import menucompoReducer from "../feature/menucompo.slice";
import indicstopresetReducer from "../feature/indicstopreset.slice";
import indicstopresetdateReducer from "../feature/indicstopresetdate.slice";
import listecoursesReducer from "../feature/listecourses.slice";
import authReducer from "../feature/auth/auth.slice";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    displaySignUp: signInUpReducer,
    displaySignIn: signInUpReducer,
    newRecipe: recipeReducer,
    listeRecipes: listeReducer,
    sortSelect: sortReducer,
    checkedRec: checkedReducer,
    confDelete: indicReducer,
    prefSelect: prefReducer,
    menuRecipes: menurecipesReducer,
    menuCompo: menucompoReducer,
    indicStopReset: indicstopresetReducer,
    indicStopResetDate: indicstopresetdateReducer,
    listeMenus: menusReducer,
    sortSelectMenus: sortmenusReducer,
    listeCourses: listecoursesReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Intégration du reducer de apiSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});

setupListeners(store.dispatch);

export default store;
