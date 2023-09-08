import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeMenu from "./pages/HomeMenu";
import HomeBase from "./pages/HomeBase";
import HomeListeRecettes from "./pages/HomeListeRecettes";
import PageNewRecipe from "./pages/PageNewRecipe";
import HomeListeRecettesSecurisee from "./pages/HomeListeRecettesSecurisee";
import PageDetailsRecipe from "./pages/PageDetailsRecipe";
import PageDetailsEdit from "./pages/PageDetailsEdit";
import PageDetailsRecipeProtect from "./pages/PageDetailsRecipeProtect";
import MenusValides from "./pages/MenusValides";
import PageListeCourses from "./pages/PageListeCourses";
import EditUser from "./feature/users/EditUser";
import NewUserForm from "./feature/users/NewUserForm";
// import EditMenu from "./feature/menus/EditMenu";
// import NewMenu from "./feature/menus/NewMenu";
// import EditRecipe from "./feature/recipes/EditRecipe";
// import NewRecipe from "./feature/recipes/NewRecipe";
import UsersList from "./feature/users/UsersList";
import RecipesList from "./feature/recipes/RecipesList";
import MenusList from "./feature/menus/MenusList";
import Prefetch from "./feature/auth/Prefetch";
import PersistLogin from "./feature/auth/PersistLogin";
import Mentions from "./pages/Mentions";
import Contact from "./pages/Contact";
import RequireAuth from "./feature/auth/RequireAuth";
import { ROLES } from "./config/roles";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ***** Public routes pour utilisateur Inconnu*/}
        <Route path="/*" element={<HomeListeRecettes />} />

        <Route path="/mentions-legales" element={<Mentions />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/pagedetailsrecipe" element={<PageDetailsRecipe />} />

        {/* ***** Protected routes pour utilisateur Inscrit, Abonné et Administrateur*/}
        <Route element={<PersistLogin />}>
          {/* un seul rôle : ROLES.Abonné  ou tous les rôles ...Object.values(ROLES) */}
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              {/* *****  Protected routes pour utilisateur Inscrit compris*/}

              <Route
                path="/PrivateRoute/HomeListeRecettesProtect"
                element={<HomeListeRecettesSecurisee />}
              />

              <Route path="/homemenu" element={<HomeMenu />} />

              {/* *****  Protected routes pour utilisateur Abonné et Administrateur*/}
              <Route
                element={
                  <RequireAuth
                    allowedRoles={[ROLES.Administrateur, ROLES.Abonné]}
                  />
                }
              >
                <Route path="/menusvalides" element={<MenusValides />} />
                <Route path="/listecourses" element={<PageListeCourses />} />

                {/* *****  Protected routes de l'application pour utilisateur Administrateur seulement */}
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Administrateur]} />
                  }
                >
                  <Route
                    path="/PrivateRoute/pagenewrecipe"
                    element={<PageNewRecipe />}
                  />
                  <Route
                    path="/PrivateRoute/pagedetailsedit"
                    element={<PageDetailsEdit />}
                  />

                  <Route
                    path="/PrivateRoute/pagedetailsrecipeprotect"
                    element={<PageDetailsRecipeProtect />}
                  />
                  {/* Gestion Admin des Utilisateurs, des Recettes et des menus pour utilisateur Administrateur seulement*/}
                  <Route path="/PrivateRoute/homebase" element={<HomeBase />} />

                  <Route path="/users" element={<UsersList />} />
                  <Route path="/users/:id" element={<EditUser />} />
                  <Route path="/users/new" element={<NewUserForm />} />

                  <Route path="/recipes" element={<RecipesList />} />
                  <Route path="/recipes/admin" element={<RecipesList />} />
                  {/* <Route path="/recipes/:id" element={<EditRecipe />} /> */}
                  {/* <Route path="/recipes/new" element={<NewRecipe />} /> */}

                  <Route path="/menus" element={<MenusList />} />
                  {/* <Route path="/menus/:id" element={<EditMenu />} />
                    <Route path="/menus/new" element={<NewMenu />} /> */}
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/* End of Protected routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
