import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const HomeBase = () => {
  useEffect(() => {
    // Défilement vers le haut de la page au chargement
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="homebase">
      <div className="homebase-title">
        <h1>Gestion de la base de données</h1>
        <h3>
          <NavLink to="/PrivateRoute/HomeListeRecettesProtect">
            <i className="fa-solid fa-house"></i>
          </NavLink>
        </h3>
      </div>

      <div className="homebase-users">
        <h2>Gestion de la table utilisateurs</h2>
        <div className="title_plus">
          <h3>
            Ajout d'un utilisateur{" "}
            <NavLink to="/users/new">
              <i className="fa-solid fa-folder-plus"></i>
            </NavLink>
          </h3>
          <h3>
            Liste des utilisateurs{" "}
            <NavLink to="/users">
              <i className="fa-solid fa-table-list"></i>
            </NavLink>
          </h3>
        </div>
        {/* <UsersList /> */}
      </div>
      <div className="homebase-recipes">
        <h2>Gestion de la table des recettes</h2>
        <div className="title_plus">
          <h3>
            Liste des recettes{" "}
            <NavLink to="/recipes/admin">
              <i className="fa-solid fa-table-list"></i>
            </NavLink>
          </h3>
        </div>
        {/* <RecipesList /> */}
      </div>
      <div className="homebase-menus">
        <h2>Gestion de la table des menus</h2>
        <div className="title_plus">
          <h3>
            Liste des menus{" "}
            <NavLink to="/menus">
              <i className="fa-solid fa-table-list"></i>
            </NavLink>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HomeBase;
