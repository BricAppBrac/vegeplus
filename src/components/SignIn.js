import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignIn, setCloseIn } from "../feature/signInUp.slice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../feature/auth/auth.slice";
// import { useLoginMutation } from "../";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRef = useRef();
  const errRef = useRef();

  // const [login, { isLoading }] = useLoginMutation;

  // if (isLoading) return <p>Loading...</p>;

  // Récupération de la demande d'ouverture du formulaire
  const displaySignIn = useSelector(
    (state) => state.displaySignIn.displaySignIn
  );

  // State
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [message, setMessage] = useState(
    "-- Connectez-vous pour plus de fonctionnalités : Création de Menus, Liste de Courses --"
  );

  const handleFormIn = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUserEmail("");
      setUserPassword("");
      navigate("/PrivateRoute/HomeListeRecettes");
    } catch (err) {
      if (!err.status) {
        setMessage("Pas de réponse du serveur");
      } else if (err.status === 400) {
        setMessage("Email ou mot de passe manquant");
      } else if (err.status === 401) {
        setMessage("Accès non autorisé");
      } else {
        setMessage(err.data?.message);
      }
      errRef.current.focus();
    }

    // return;
  };

  const closeModal = async () => {
    await dispatch(setCloseIn(true));
    dispatch(setSignIn(false));
    setMessage(
      "-- Connectez-vous pour plus de fonctionnalités : Création de Menus, Liste de Courses --"
    );
  };

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setMessage("");
  }, [userEmail, userPassword]);

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

              <form onSubmit={handleFormIn} className="signup-form">
                <div className="signup-input">
                  <label htmlFor="signupEmail">Email</label>
                  <input
                    name="email"
                    required
                    type=""
                    className="form-control"
                    id="signinEmail"
                    ref={userRef}
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
                    id="signinPassword"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>

                <p ref={errRef} className="espace-message">
                  {message}
                </p>
                <button>Valider</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
