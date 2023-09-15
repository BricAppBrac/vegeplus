import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignUp, setCloseUp } from "../feature/signInUp.slice";
import {
  useAddNewUserMutation,
  useCheckDuplicateEmailQuery,
  useCheckDuplicateUsernameQuery,
} from "../feature/users/usersApiSlice";
import { useSendEmailMutation } from "../feature/auth/authApiSlice";

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

  const [
    addNewUser,
    {
      isLoading: addUserLoading,
      isSuccess: addUserSuccess,
      isError: isAddUserError,
      error: addUserError,
    },
  ] = useAddNewUserMutation();

  const [
    checkDuplicateUsername,
    {
      isLoading: checkUsernameLoading,
      isSuccess: checkUsernameSuccess,
      isError: isCheckUsernameError,
      error: checkUsernameError,
    },
  ] = useCheckDuplicateUsernameQuery();

  const [
    checkDuplicateEmail,
    {
      isLoading: checkEmailLoading,
      isSuccess: checkEmailSuccess,
      isError: checkEmailError,
      error: isCheckEmailError,
    },
  ] = useCheckDuplicateEmailQuery();

  const [sendEmail] = useSendEmailMutation();

  // Initialiser une variable pour suivre les erreurs de handleForm
  let hasError = false;

  // const [formSubmitted, setFormSubmitted] = useState(false);

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
      // Remise à zéro des inputs
      setUserEmail("");
      setUserPseudo("");
      setUserPassword("");
      setUserRepeatPassword("");
      console.log(
        "Inscription effectuée, vous pouvez vous connecter à votre Espace perso"
      );
      setMessageInfo(
        "Inscription effectuée, vous pouvez vous connecter à votre Espace perso"
      );
    }

    console.log("handleCreateUser fin");
  };

  const handleSendEmail = async () => {
    console.log("handleSendEmail début");
    // Envoyer un email à l'adresse userEmail pour confirmer existence de cette adresse

    // A compléter
    const emailData = {
      to: userEmail,
      subject: "Finalisation de votre inscription à l'application VG+",
      text: "Bienvenue! Votre inscription gratuite est validée. Vous pourrez-vous désinscrire dans votre espace perso",
    };

    console.log("***** emailData ********");
    console.log(emailData);

    const response = await sendEmail(emailData);
    console.log("response");
    console.log(response);

    if (
      response.data.message &&
      response.data.message === "E-mail envoyé avec succès"
    ) {
      // L'envoi de l'email a réussi
      handleCreateUser();
    } else {
      // L'envoi de l'email n'a pas abouti
      setMessageInfo("Pb lors de la vérification de votre email");
      console.log("Email inexistant ?");
      console.log("response");
      console.log(response);
      console.log("response.error");
      console.log(response.error);
    }

    console.log("handleSendEmail fin");
  };

  const handleCheckPseudo = async () => {
    // Contrôle de la structure du Pseudo
    console.log("handleCheckPseudo");
    if (!checkPseudo(userPseudo)) {
      setMessageInfo("Pseudo invalide");
      console.log("Pseudo invalide: car 4-25 / AZaz09");
      console.log(userPseudo);
      hasError = true;
    }
  };

  const handleCheckEmail = async () => {
    // Contrôle de la structure de l'email
    console.log("handleCheckEmail");
    if (!checkEmail(userEmail)) {
      setMessageInfo("Email invalide");
      console.log("Email invalide : ");
      console.log(userEmail);
      hasError = true;
    }
  };

  const handleCheckDuplicateUsername = async () => {
    console.log("handleCheckDuplicateUsername");
    const dataUsername = await checkDuplicateUsername({
      username: userPseudo,
    });

    if (dataUsername.error) {
      setMessageInfo(
        "Une erreur s'est produite lors de la vérification du pseudo."
      );
      console.log("Error checking duplicate username:", dataUsername.error);
      hasError = true;
    } else if (dataUsername && dataUsername.exists) {
      setMessageInfo("Pseudo déjà utilisé");
      hasError = true;
    }
  };

  const handleCheckDuplicateEmail = async () => {
    console.log("handleCheckDuplicateEmail");
    const dataEmail = await checkDuplicateEmail({
      email: userEmail,
    });

    if (dataEmail.error) {
      setMessageInfo(
        "Une erreur s'est produite lors de la vérification de l' email."
      );
      console.log("Error checking duplicate email:", dataEmail.error);
      hasError = true;
    } else if (dataUsername && dataEmail.exists) {
      setMessageInfo("Email déjà utilisé");
      hasError = true;
    }
  };

  const handleCheckPassword = async () => {
    console.log("handleCheckPassword");
    // Contrôle du mot de passe
    if (!checkPassword(userPassword)) {
      setMessageInfo(
        "Mot de passe invalide: 1 MAJ / 1 min / 1 chiffre / !*#$% / car: 8-12"
      );
      console.log("Mot de passe invalide");
      hasError = true;
    }

    // Comparaison des mots de passe saisis
    if (userPassword !== userRepeatPassword) {
      setMessageInfo("les mots de passe ne sont pas égaux");
      console.log("Err mots de passe non égaux");
      hasError = true;
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    console.log("handleForm - début");

    // Contrôle de la structure du Pseudo
    await handleCheckPseudo();

    // Contrôle de la structure de l'email
    await handleCheckEmail();

    // Check for duplicate username
    await handleCheckDuplicateUsername();

    // Check for duplicate email
    await handleCheckDuplicateEmail();

    // Contrôle du mot de passe
    await handleCheckPassword();

    if (!hasError) {
      // Si aucune erreur n'a été détectée, appeler handleSendEmail
      console.log("Pas d'erreur, envoi de l'email");
      handleSendEmail();
    }

    console.log("handleForm - fin");
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
                    onChange={(e) => {
                      setUserPseudo(e.target.value);
                    }}
                    // onChange={(e) => {
                    //   if (!formSubmitted) {
                    //     setUserPseudo(e.target.value);
                    //   }
                    // }}
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
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                    // onChange={(e) => {
                    //   if (!formSubmitted) {
                    //     setUserEmail(e.target.value);
                    //   }
                    // }}
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
                <button type="submit">Valider</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
