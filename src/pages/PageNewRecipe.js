import React from "react";
import Footer from "../components/Footer";
import NavbarProtect from "../components/NavbarProtect";
import RecipeNew from "../components/RecipeNew";

const PageNewRecipe = () => {
  return (
    <div className="pagenewrecipe">
      <div className="new-navbar">
        <NavbarProtect />
      </div>
      <div className="new-content">
        <div className="new-text">
          <h1>Nouvelle Recette</h1>
          <RecipeNew />
        </div>
      </div>
      <div className="new-footer">
        <Footer />
      </div>
    </div>
  );
};

export default PageNewRecipe;
