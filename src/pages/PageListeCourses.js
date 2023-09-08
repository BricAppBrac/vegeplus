import React from "react";
import Footer from "../components/Footer";
import NavbarProtect from "../components/NavbarProtect";
import ShoppingCardsList from "../components/ShoppingCardsList";

const PageListeCourses = () => {
  return (
    <div className="pagelistecourses">
      <div className="nav-container">
        <NavbarProtect />
      </div>
      <div className="pagelistecourses-content">
        <div className="pagelistecourses-text">
          <h1>Liste de courses</h1>
          <h2>pour le Menu Choisi</h2>
          <h3> * * * * * * </h3>

          <div className="shoppingcards-container">
            <ShoppingCardsList />
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default PageListeCourses;
