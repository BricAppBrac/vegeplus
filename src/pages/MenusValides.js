import React, { useEffect } from "react";
import Footer from "../components/Footer";
import NavbarProtect from "../components/NavbarProtect";
import ListeMenus from "../components/ListeMenus";
import SortNavbarMenus from "../components/SortNavbarMenus";

const MenusValides = () => {
  useEffect(() => {
    // Défilement vers le haut de la page au chargement
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="menusvalides">
      <div className="nav-container">
        <NavbarProtect />
      </div>
      <div className="menusvalides-content">
        <div className="menusvalides-text">
          <h1>Liste des Menus Validés</h1>
          <SortNavbarMenus />

          <div className="menusvalides-container">
            <ListeMenus />
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default MenusValides;
