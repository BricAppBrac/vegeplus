import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ListeRecettes from "../components/ListeRecettes";
import SignUp from "../components/SignUp";
import Login from "../feature/auth/Login";
import SortNavbar from "../components/SortNavbar";

const HomeListeRecettes = () => {
  useEffect(() => {
    // Défilement vers le haut de la page au chargement
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="homelisterecettes">
      <div className="nav-container">
        <Navbar />
        <SignUp />
        <Login />
      </div>
      <div className="homeliste-content">
        <div className="homeliste-text">
          <h1>Liste des Recettes</h1>
          <h2>pour la constitution des Menus</h2>
          <SortNavbar />
          <div className="recipescards-container">
            <ListeRecettes />
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default HomeListeRecettes;
