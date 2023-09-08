import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarProtect from "../components/NavbarProtect";
import SignUp from "../components/SignUp";
import Login from "../feature/auth/Login";
import useAuth from "../hooks/useAuth";

const Contact = () => {
  const { username, isAdmin, isAbo, isInscrit } = useAuth();

  return (
    <div className="contact-container">
      {isAdmin || isAbo || isInscrit ? <NavbarProtect /> : <Navbar />}
      <SignUp />
      <Login />
      <div className="contact-footer">
        <button>Contactez-moi à l'adresse email bricappbrac@gmail.com</button>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
