import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarProtect from "../components/NavbarProtect";
import SignUp from "../components/SignUp";
import Login from "../feature/auth/Login";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import { useSendEmailMutation } from "../feature/auth/authApiSlice";
import { NavLink } from "react-router-dom";

const Contact = () => {
  const { username, isAdmin, isAbo, isInscrit } = useAuth();
  useTitle("Végé+ Contact");

  // State pour stocker les valeurs du formulaire
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const [sendEmail] = useSendEmailMutation();

  // State pour gérer les erreurs d'email
  const [emailError, setEmailError] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Fonction pour mettre à jour le state lorsque les champs du formulaire sont modifiés
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction pour vérifier si l'e-mail est valide
  const validateEmail = (email) => {
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return EMAIL_REGEX.test(email);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérifier si l'e-mail est valide
    if (!validateEmail(formData.email)) {
      setEmailError("Adresse e-mail invalide");
    } else {
      setEmailError(""); // Réinitialiser l'erreur si l'e-mail est valide

      // Vous pouvez ici envoyer les données du formulaire à votre serveur ou effectuer d'autres actions nécessaires.
      console.log("formData");
      console.log(formData);
      // Appeler la fonction handleSendEmail pour envoyer l'e-mail
      handleSendEmail();
    }
  };

  // Fonction pour envoyer l'e-mail
  const handleSendEmail = async () => {
    const emailData = {
      to: process.env.REACT_APP_EMAIL_USERNAME,
      subject: "Envoi d'un formulaire depuis la page Contact de Végé+",
      text: `${formData.email} : ${formData.message},`,
    };

    try {
      const response = await sendEmail(emailData);

      if (response.data.message === "E-mail envoyé avec succès") {
        console.log("E-mail envoyé avec succès");
        setConfirmationMessage("E-mail envoyé avec succès");
        // Réinitialisez les champs de saisie en vidant le formulaire
        setFormData({ email: "", message: "" });
      } else {
        console.error("Erreur lors de l'envoi de l'e-mail");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail", error);
    }
  };

  return (
    <div className="contact-container">
      {isAdmin || isAbo || isInscrit ? <NavbarProtect /> : <Navbar />}
      <SignUp />
      <Login />
      <div className="contact-form">
        <h2>Contactez-nous</h2>
        <h4>
          Une question? Vous abonner pour plus de fonctionnalités? Supprimer
          votre compte?{" "}
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Adresse Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              minLength={10}
              maxLength={250}
              rows={4}
              cols={25}
            />
          </div>
          <div className="form-button">
            <button type="submit">Envoyer</button>
          </div>
        </form>
        {confirmationMessage ? (
          <div className="form-message">{confirmationMessage}</div>
        ) : null}
        <div className="buy-me-a-coffee">
          <NavLink
            to="https://www.buymeacoffee.com/bricappbrac"
            id="buy-me-a-coffee"
          >
            <i className="fa-solid fa-mug-saucer"></i> Pour me soutenir: buy me
            a coffee! Merci!
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Contact;
