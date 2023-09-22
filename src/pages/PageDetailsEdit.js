import React, { useEffect } from "react";
import Footer from "../components/Footer";
import NavbarProtect from "../components/NavbarProtect";
import DetailsEdit from "../components/DétailsEdit";

const PageDetailsEdit = () => {
  useEffect(() => {
    // Défilement vers le haut de la page au chargement
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pagenewrecipe">
      <div className="new-navbar">
        <NavbarProtect />
      </div>
      <div className="new-content">
        <div className="new-text">
          <h1>Modification de la Recette</h1>
          <DetailsEdit />
        </div>
      </div>
      <div className="new-footer">
        <Footer />
      </div>
    </div>
  );
};

export default PageDetailsEdit;
