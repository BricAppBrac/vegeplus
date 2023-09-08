import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarProtect from "../components/NavbarProtect";
import RecipeDetails from "../components/RecipeDetails";
import SignUp from "../components/SignUp";
import Login from "../feature/auth/Login";
import useAuth from "../hooks/useAuth";

const PageDetailsRecipe = () => {
  const { username, isAdmin, isAbo, isInscrit } = useAuth();

  return (
    <div className="pagedetailsrecipe">
      <div className="details-navbar">
        {isAdmin || isAbo || isInscrit ? <NavbarProtect /> : <Navbar />}
        <SignUp />
        <Login />
      </div>
      <div className="details-content">
        <div className="details-text">
          <h1>Détails de la Recette</h1>
          <RecipeDetails />
        </div>
      </div>
      <div className="details-footer">
        <Footer />
      </div>
    </div>
  );
};

export default PageDetailsRecipe;
