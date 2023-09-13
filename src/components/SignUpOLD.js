import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignUp, setCloseUp } from "../feature/signInUp.slice";
import {
  useAddNewUserMutation,
  // useGetUsersQuery,
} from "../feature/users/usersApiSlice";

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
  const [userRole, setUserRole] = useState("Inscrit");
  const [userActive, setUserActive] = useState(true);
  const [userRepeatPassword, setUserRepeatPassword] = useState("");

  const [messageInfo, setMessageInfo] = useState(
    "-- Inscrivez-vous pour pouvoir créer le Menu de la Semaine -- Email utilisé pour créer votre compte, et non communiqué à des tiers --"
  );

  const USER_REGEX = /^[A-Za-z0-9]{4,25}$/;
  const PWD_REGEX = /^[A-z0-9!*#$%]{8,12}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  // const { refetch } = useGetUsersQuery();

  function checkPseudo(userPseudo) {
    return USER_REGEX.test(userPseudo);
  }

  function checkEmail(userEmail) {
    // let re =
    //   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(userEmail);
    return EMAIL_REGEX.test(userEmail);
  }

  function checkPassword(userPassword) {
    if (
      userPassword.match(/[0-9]/g) &&
      userPassword.match(/[A-Z]/g) &&
      userPassword.match(/[a-z]/g) &&
      userPassword.match(/[^a-zA-Z\d]/g) &&
      userPassword.length > 7 &&
      userPassword.length < 13
    )
      return true;
    else return false;
    // return PWD_REGEX.test(userPassword);
  }

  const handleCreateUser = async () => {
    console.log("handleCreateUser début");

    try {
      const result = await addNewUser({
        username: userPseudo,
        password: userPassword,
        email: userEmail,
        role: userRole,
        active: userActive,
      });
      if (result.error) {
        setMessageInfo(result.error.data.message);
      } else {
        handleSendEmail();
      }

      // refetch();
    } catch (error) {
      // Gérer l'erreur ici si nécessaire
      console.log("Une erreur s'est produite");
      console.log(error);
    }

    console.log("handleCreateUser fin");
  };

  const handleSendEmail = async () => {
    console.log("handleSendEmail");
    // Envoyer un email à l'adresse userEmail pour confirmer existence de cette adresse

    // Selon retour du serveur, valider ou non l'iscription
    // setMessageInfo(
    //   "Inscription effectuée, vous pouvez vous connecter à votre Espace perso"
    // );
    // console.log(
    //   "Inscription effectuée, vous pouvez vous connecter à votre Espace perso"
    // );
  };

  const handleForm = async (e) => {
    e.preventDefault();

    // Contrôle de la structure du Pseudo

    if (!checkPseudo(userPseudo)) {
      setMessageInfo("Pseudo invalide");
      console.log("Pseudo invalide: car 4-25 / AZaz09");
      console.log(userPseudo);

      return;
    }

    // Contrôle de la structure de l'email

    if (!checkEmail(userEmail)) {
      setMessageInfo("Email invalide");
      console.log("Email invalide : ");
      console.log(userEmail);

      return;
    }

    if (!checkPassword(userPassword)) {
      setMessageInfo(
        "Mot de passe invalide: 1 MAJ / 1 min / 1 chiffre / !*#$% / car: 8-12"
      );
      console.log("Mot de passe invalide");

      return;
    }
    // Comparaison des mots de passe saisis
    else if (userPassword !== userRepeatPassword) {
      setMessageInfo("les mots de passe ne sont pas égaux");
      console.log("Err mots de passe non égaux");

      return;
    } else {
      // Création d'un compte utilisateur dans la BDD
      handleCreateUser();

      // Remise à zéro des inputs
      setUserEmail("");
      setUserPseudo("");
      setUserPassword("");
      setUserRepeatPassword("");
      setMessageInfo(
        "Inscription effectuée, vous pouvez vous connecter à votre Espace perso"
      );
      return;
    }
  };

  const closeModal = async () => {
    await dispatch(setCloseUp(true));
    dispatch(setSignUp(false));
    setMessageInfo(
      "-- Inscrivez-vous pour pouvoir créer le Menu de la Semaine -- Email utilisé pour créer votre compte, et non communiqué à des tiers --"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
                    onChange={(e) => setUserRepeatPassword(e.target.value)}
                  />
                </div>
                <p className="espace-message">{messageInfo}</p>
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
