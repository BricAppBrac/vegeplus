import React from "react";
import Footer from "../components/Footer";
import NavbarProtect from "../components/NavbarProtect";
import ListeRecettesProtect from "../components/ListeRecettesProtect";
import SortNavbarProtect from "../components/SortNavbarProtect";
import useAuth from "../hooks/useAuth";
import SortNavbar from "../components/SortNavbar";
import ListeRecettes from "../components/ListeRecettes";

const HomeListeRecettesSecurisee = () => {
  const { username, isAdmin, isAbo } = useAuth();

  return (
    <div className="homelisterecettes">
      <div className="nav-container">
        <NavbarProtect />
      </div>
      <div className="homeliste-content">
        <div className="homeliste-text">
          <h1>Liste des Recettes</h1>
          <h2>pour la constitution des Menus</h2>
          {isAdmin ? <SortNavbarProtect /> : <SortNavbar />}
          <div className="recipescards-container">
            {isAdmin ? <ListeRecettesProtect /> : <ListeRecettes />}
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default HomeListeRecettesSecurisee;
