import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignUp, setCloseUp } from "../feature/signInUp.slice";

const SignUp = () => {
  const dispatch = useDispatch();

  // Récupération de la demande d'ouverture du formulaire
  const displaySignUp = useSelector(
    (state) => state.displaySignUp.displaySignUp
  );

  // State de l'email
  const [userEmail, setUserEmail] = useState("");
  const [userPseudo, setUserPseudo] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRepeatPassword, setUserRepeatPassword] = useState("");

  const [message, setMessage] = useState(
    "-- Inscrivez-vous pour générer le Menu de la Semaine -- Votre Email sera utilisé pour la création du compte, et non communiqué à des tiers"
  );

  function checkEmail(userEmail) {
    let re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(userEmail);
  }

  function checkPassword(userPassword) {
    if (
      userPassword.match(/[0-9]/g) &&
      userPassword.match(/[A-Z]/g) &&
      userPassword.match(/[a-z]/g) &&
      userPassword.match(/[^a-zA-Z\d]/g) &&
      userPassword.length >= 8
    )
      return true;
    else return false;
  }

  const handleForm = async (e) => {
    e.preventDefault();

    // Contrôle de la structure de l'email

    if (!checkEmail(userEmail)) {
      setMessage("Email invalide");
      console.log("Email invalide : ");
      console.log(userEmail);

      return;
    }

    // Check mot de passe
    // if ((userPassword.length || userRepeatPassword.length) < 6) {
    //   setMessage("6 caractères min");
    //   console.log("Err 6 caractères min : ");
    //   console.log(userPassword);
    //   console.log(userRepeatPassword);
    //   return;
    // }

    if (!checkPassword(userPassword)) {
      setMessage(
        "Mot de passe invalide: 1 MAJ / 1 min / 1 chiffre / 1 car spécial / 8 car min"
      );
      console.log("Mot de passe invalide : ");

      return;
    }
    // Comparaison des mots de passe saisis
    else if (userPassword !== userRepeatPassword) {
      setMessage("les mots de passe ne sont pas égaux");
      console.log("Err mots de passe non égaux : ");
      console.log(userPassword);
      console.log(userRepeatPassword);
      return;
    } else {
      // Création d'un compte utilisateur dans la BDD
      // A FAIRE

      // Remise à zéro des inputs
      setUserEmail("");
      setUserPseudo("");
      setUserPassword("");
      setUserRepeatPassword("");
      setMessage("Email à envoyer pour valider l'inscription");
      return;
    }
  };

  const closeModal = async () => {
    await dispatch(setCloseUp(true));
    dispatch(setSignUp(false));
    setMessage(
      "-- Inscrivez-vous pour plus de fonctionnalités : Création de Menus, Liste de Courses --"
    );
  };

  return (
    <>
      {displaySignUp && (
        <div className="signin-and-up">
          <div className="sign-overlay">
            <div className="sign-absolute">
              <div className="sign-title">
                <h4>Inscription gratuite</h4>
                <button onClick={() => closeModal()}>x</button>
              </div>

              <form onSubmit={handleForm} className="signup-form">
                <div className="signup-input">
                  <label htmlFor="signupPseudo">Pseudo</label>
                  <input
                    name="pseudo"
                    required
                    type="text"
                    className="form-control"
                    id="signupPseudo"
                    maxLength={25}
                    value={userPseudo}
                    onChange={(e) => setUserPseudo(e.target.value)}
                  />
                </div>
                <div className="signup-input">
                  <label htmlFor="signupEmail">Email</label>
                  <input
                    name="email"
                    required
                    type=""
                    className="form-control"
                    id="signupEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <div className="signup-input">
                  <label htmlFor="signupPassword">Mot de passe</label>
                  <input
                    name="password"
                    required
                    type="password"
                    className="form-control"
                    id="signupPassword"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>
                <div className="signup-input">
                  <label htmlFor="signupPassword">Confirmer Mot de passe</label>
                  <input
                    name="password"
                    required
                    type="password"
                    className="form-control"
                    id="repeatPassword"
                    value={userRepeatPassword}
                    onChange={(e) => setUserRepeatPassword(e.target.value)}
                  />
                </div>
                <p className="espace-message">{message}</p>
                <button>Valider</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
