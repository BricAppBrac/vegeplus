import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setSignIn, setCloseIn } from "../../feature/signInUp.slice";

import { setCredentials } from "./auth.slice";
import { useLoginMutation, useSendEmailMutation } from "./authApiSlice";
import { PulseLoader } from "react-spinners";

// usePersist incorporé au composant car erreur
// import usePersist from "../../hooks/usePersist";

const usePersist = () => {
  const persistedValue = localStorage.getItem("persist");
  // console.log("Persisted Value:", persistedValue);

  const [persistState, setPersistState] = useState(
    persistedValue ? JSON.parse(persistedValue) : false
  );
  // console.log("Persist State inside usePersist:", persistState);

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persistState));
  }, [persistState]);

  return [persistState, setPersistState];
};

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [persistState, setPersistState] = usePersist();
  // console.log("Persist State:", persistState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sendEmail] = useSendEmailMutation();

  // Récupération de la demande d'ouverture du formulaire
  const displaySignIn = useSelector(
    (state) => state.displaySignIn.displaySignIn
  );

  const [login, { isLoading }] = useLoginMutation();

  const [errMsg, setErrMsg] = useState(
    "-- Connectez-vous pour plus de fonctionnalités : Création de Menus, Liste de Courses --"
  );

  const errClass = errMsg ? "errmsg" : "offscreen";

  const handleForgottenPwd = async (userEmail) => {
    // console.log("handleForgottenPwd début");

    if (!userEmail) {
      setErrMsg("Veuillez saisir votre email");
    } else {
      // Envoyer un email à l'adresse bricappbrac-contact@yahoo.com pour demande de nouveau mot de passe

      try {
        // console.log("***** process.env ********");
        // console.log(process.env.REACT_APP_EMAIL_USERNAME);

        const emailData = {
          to: process.env.REACT_APP_EMAIL_USERNAME,
          subject: "VG+ Demande de mot de passe",
          text: `Réinitialiser mot de passe de ${userEmail}`,
        };

        console.log("***** emailData ********");
        console.log(emailData);

        const response = await sendEmail(emailData);
        console.log("response");
        console.log(response);

        if (
          !response.error &&
          response.data.message &&
          response.data.message === "E-mail envoyé avec succès"
        ) {
          // L'envoi de l'email a réussi
          console.log("envoi de l'email reinit mdp OK");
          setErrMsg(
            "Demande envoyée, vous serez informé de son traitement par mail"
          );
        } else {
          // L'envoi de l'email n'a pas abouti
          setErrMsg("Pb lors de l'envoi du mail de reinitialisation mdp");
          console.log("response");
          console.log(response);
          console.log("response.error");
          console.log(response.error);
        }

        // refetch();
      } catch (error) {
        // Gérer l'erreur ici si nécessaire
        console.log("Une erreur s'est produite reinit mdp");
        console.log(error);
      }
    }
    console.log("handleForgottenPwd fin");
  };

  const handleUnsubscription = async (userEmail) => {
    console.log("handleUnsubscription début");

    if (!userEmail) {
      setErrMsg("Veuillez saisir votre email");
    } else {
      // Envoyer un email à l'adresse bricappbrac-contact@yahoo.com pour demande de nouveau mot de passe

      try {
        // A compléter
        console.log("***** process.env ********");
        console.log(process.env.REACT_APP_EMAIL_USERNAME);

        const emailData = {
          to: process.env.REACT_APP_EMAIL_USERNAME,
          subject: "VG+ Demande de desinscription",
          text: `Supprimer compte de ${userEmail}`,
        };

        console.log("***** emailData ********");
        console.log(emailData);

        const response = await sendEmail(emailData);
        console.log("response");
        console.log(response);

        if (
          !response.error &&
          response.data.message &&
          response.data.message === "E-mail envoyé avec succès"
        ) {
          // L'envoi de l'email a réussi
          console.log("envoi de l'email de désinscription OK");
          setErrMsg(
            "Demande envoyée, vous serez informé de la suppression de votre compte par mail"
          );
        } else {
          // L'envoi de l'email n'a pas abouti
          setErrMsg("Pb lors de l'envoi du mail de désinscription");
          console.log("response");
          console.log(response);
          console.log("response.error");
          console.log(response.error);
        }

        // refetch();
      } catch (error) {
        // Gérer l'erreur ici si nécessaire
        console.log("Une erreur s'est produite email de desinscription");
        console.log(error);
      }
    }
    console.log("handleUnsubscription fin");
  };

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setErrMsg("");
    // console.log("useEffect changement userEmail ou userPassword");
  }, [userEmail, userPassword]);

  const handleFormIn = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({
        email: userEmail,
        password: userPassword,
      }).unwrap();
      // console.log("Access Token:", accessToken); // Afficher le token d'accès renvoyé
      dispatch(setCredentials({ accessToken }));
      setUserEmail("");
      setUserPassword("");
      // console.log("Login OK");
      closeModal();
      navigate("/PrivateRoute/HomeListeRecettesProtect");
    } catch (err) {
      if (!err.status) {
        setErrMsg("Pas de réponse du serveur");
        console.log("err.data : ");
        console.log(err.data);
      } else if (err.status === 400) {
        setErrMsg("Email ou mot de passe manquant");
      } else if (err.status === 401) {
        setErrMsg("Accès non autorisé");
      } else {
        setErrMsg(err.data?.message);
      }

      errRef.current.focus();
    }

    return;
  };

  const closeModal = async () => {
    // console.log("closeModal");
    await dispatch(setCloseIn(true));
    dispatch(setSignIn(false));
    setUserEmail("");
    setUserPassword("");
    setErrMsg(
      "-- Connectez-vous pour plus de fonctionnalités : Création de Menus, Liste de Courses --"
    );
  };

  return (
    <>
      {displaySignIn && (
        <div className="signin-and-up">
          <div className="sign-overlay">
            <div className="sign-absolute">
              <div className="sign-title">
                <h4>Espace perso</h4>
                <button onClick={() => closeModal()}>x</button>
              </div>
              {isLoading ? (
                <div>
                  <PulseLoader color="#FFF" />
                </div>
              ) : (
                <form onSubmit={handleFormIn} className="signin-form">
                  <div className="signin-input">
                    <label htmlFor="signinEmail">Email</label>
                    <input
                      name="email"
                      required
                      type=""
                      className="form-control"
                      id="signinEmail"
                      ref={userRef}
                      value={userEmail}
                      autoComplete="off"
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <div className="signin-input">
                    <label htmlFor="signinPassword">Mot de passe</label>
                    <input
                      name="password"
                      required
                      type="password"
                      className="form-control"
                      id="signinPassword"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                  </div>

                  <p
                    ref={errRef}
                    className="err-class espace-message"
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <button>Valider</button>

                  <div className="signin-persist">
                    <label htmlFor="signin-persist">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        id="signin-persist"
                        checked={persistState}
                        onChange={(e) => setPersistState((prev) => !prev)}
                      />
                      Rester connecté?
                    </label>
                  </div>
                </form>
              )}
              <div className="sign-link1">
                <h6>Mot de passe oublié</h6>
                <button onClick={() => handleForgottenPwd(userEmail)}>
                  <i className="fa-solid fa-key"></i>
                </button>
              </div>
              <div className="sign-link2">
                <h6>Se désinscrire</h6>
                <button onClick={() => handleUnsubscription(userEmail)}>
                  <i className="fa-solid fa-heart-crack"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
