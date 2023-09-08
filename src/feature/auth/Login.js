import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setSignIn, setCloseIn } from "../../feature/signInUp.slice";

import { setCredentials } from "./auth.slice";
import { useLoginMutation } from "./authApiSlice";

// usePersist incorporé au composant car erreur
// import usePersist from "../../hooks/usePersist";

const usePersist = () => {
  const persistedValue = localStorage.getItem("persist");
  console.log("Persisted Value:", persistedValue);

  const [persistState, setPersistState] = useState(
    persistedValue ? JSON.parse(persistedValue) : false
  );
  console.log("Persist State inside usePersist:", persistState);

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
  console.log("Persist State:", persistState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Récupération de la demande d'ouverture du formulaire
  const displaySignIn = useSelector(
    (state) => state.displaySignIn.displaySignIn
  );

  const [login, { isLoading }] = useLoginMutation();

  const [errMsg, setErrMsg] = useState(
    "-- Connectez-vous pour plus de fonctionnalités : Création de Menus, Liste de Courses --"
  );

  const errClass = errMsg ? "errmsg" : "offscreen";

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setErrMsg("");
    console.log("useEffect changement userEmail ou userPassword");
  }, [userEmail, userPassword]);

  const handleFormIn = async (e) => {
    e.preventDefault();
    console.log("handleFormIn");

    try {
      console.log("Email try catch:", userEmail); // Vérifiez la valeur de userEmail
      console.log("Password try catch:", userPassword); // Vérifiez la valeur de userPassword
      const { accessToken } = await login({
        email: userEmail,
        password: userPassword,
      }).unwrap();
      console.log("Access Token:", accessToken); // Afficher le token d'accès renvoyé
      dispatch(setCredentials({ accessToken }));
      setUserEmail("");
      setUserPassword("");
      console.log("Login OK");
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
    console.log("closeModal");
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
                <p>Loading...</p>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
