import { useState, useEffect } from "react";
import { useAddNewUserMutation, useGetUsersQuery } from "./usersApiSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-Za-z0-9]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!*#$%]{4,12}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const NewUserForm = () => {
  // console.log("NewUserForm");

  // Statut apès appel de la fonction useAddNewUserMutation()
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const { refetch } = useGetUsersQuery();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [role, setRole] = useState("Inscrit");
  // const [validRole, setValidRole] = useState(false);

  const [active, setActive] = useState(false);

  const [canSave, setCanSave] = useState(false);

  const [messageInfo, setMessageInfo] = useState("");

  useEffect(() => {
    // console.log("*************** UseEffect username ************");
    // setValidUsername(USER_REGEX.test(username));
    handleCanSave();
  }, [username]);

  useEffect(() => {
    // console.log("*************** UseEffect password ************");
    // setValidPassword(PWD_REGEX.test(password));
    handleCanSave();
  }, [password]);

  useEffect(() => {
    // console.log("*************** UseEffect email ************");
    // setValidEmail(EMAIL_REGEX.test(email));
    handleCanSave();
  }, [email]);

  useEffect(() => {
    // console.log("*************** UseEffect canSave ************");
    console.log(canSave);
  }, [canSave]);

  useEffect(() => {
    // console.log("*************** UseEffect isSuccess navigate ************");
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setEmail("");
      setRole("");
      navigate("/PrivateRoute/homebase");
    }
  }, [isSuccess, navigate]);

  const handleCheckEmail = (checkedEmail) => {
    // console.log("-------------- handleCheckEmail DEBUT --------------");
    // Contrôle des données inchangées pour maj indicateurs
    setValidUsername(USER_REGEX.test(username));

    // Si erreur, alimentation messageInfo
    if (EMAIL_REGEX.test(checkedEmail)) {
      setMessageInfo("");
      // refetch();
    } else {
      setMessageInfo("Email invalide");
    }

    // MAJ state Email pour déclencher useEffect de contrôle
    // console.log("email : " + checkedEmail);

    setEmail(checkedEmail);
    setValidEmail(EMAIL_REGEX.test(checkedEmail));
    // console.log("-------------- handleCheckEmail FIN --------------");
  };

  const handleCheckUsername = (checkedUsername) => {
    // console.log("-------------- handleCheckUsername DEBUT --------------");
    // Contrôle des données inchangées pour maj indicateurs
    setValidEmail(EMAIL_REGEX.test(email));

    // Si erreur, alimentation messageInfo
    if (USER_REGEX.test(checkedUsername)) {
      setMessageInfo("");
    } else {
      setMessageInfo("Pseudo invalide");
    }
    // MAJ state Username pour déclencher useEffect de contrôle
    // console.log("username : " + checkedUsername);
    setUsername(checkedUsername);
    setValidUsername(USER_REGEX.test(checkedUsername));
    // console.log("-------------- handleCheckUsername FIN --------------");
  };

  const handleCheckPassword = (checkedPassword) => {
    // console.log("-------------- handleCheckPassword DEBUT --------------");
    // Contrôle des données inchangées pour maj indicateurs
    setValidEmail(EMAIL_REGEX.test(email));
    setValidUsername(USER_REGEX.test(username));

    // Si erreur, alimentation messageInfo
    if (PWD_REGEX.test(checkedPassword)) {
      setMessageInfo("");
    } else {
      setMessageInfo("Mot de passe invalide");
    }
    // MAJ state Password pour déclencher useEffect de contrôle
    setPassword(checkedPassword);
    setValidPassword(PWD_REGEX.test(checkedPassword));
    // console.log("-------------- handleCheckPassword FIN --------------");
  };

  const handleCanSave = () => {
    // console.log("-------------- handleCanSave DEBUT --------------");

    const newCanSave =
      [validPassword, validUsername, validEmail].every(Boolean) && !isLoading;
    setCanSave(newCanSave);
    // console.log("validRole : " + validRole);
    // console.log("validUsername : " + validUsername);
    // console.log("validEmail : " + validEmail);
    // console.log("validPassword : " + validPassword);
    // console.log("canSave : " + newCanSave);

    // console.log("-------------- handleCanSave FIN --------------");
  };

  // const onUsernameChanged = (e) => setUsername(e.target.value);

  const onUsernameChanged = (e) => {
    // console.log("-------------- onUsernameChanged DEBUT --------------");
    // console.log("e.target.value");
    // console.log(e.target.value);
    setUsername(e.target.value);
    handleCheckUsername(e.target.value);
    // console.log("-------------- onUsernameChanged FIN --------------");
  };

  // const onPasswordChanged = (e) => setPassword(e.target.value);
  const onPasswordChanged = (e) => {
    // console.log("-------------- onPasswordChanged DEBUT --------------");
    // console.log("e.target.value");
    // console.log(e.target.value);
    setPassword(e.target.value);
    handleCheckPassword(e.target.value);
    // console.log("-------------- onPasswordChanged FIN --------------");
  };

  // const onEmailChanged = (e) => setEmail(e.target.value);
  const onEmailChanged = (e) => {
    // console.log("-------------- onEmailChanged DEBUT --------------");
    // console.log("e.target.value");
    // console.log(e.target.value);
    setEmail(e.target.value);
    handleCheckEmail(e.target.value);
    // console.log("-------------- onEmailChanged FIN --------------");
  };

  // const onRoleChanged = (e) => setRole(e.target.value);
  const onRoleChanged = (e) => {
    // console.log("-------------- onRoleChanged DEBUT --------------");
    // console.log("e.target.value");
    // console.log(e.target.value);
    setRole(e.target.value);
    handleCanSave(); // rôle toujours OK car select
    // console.log("-------------- onRoleChanged FIN --------------");
  };

  // const onActiveChanged = (e) => setActive((prev) => !prev);
  const onActiveChanged = (e) => {
    // console.log("-------------- onActiveChanged DEBUT --------------");

    setActive((prev) => !prev);
    handleCanSave(); // statut toujours OK car checkbox
    // console.log("-------------- onActiveChanged FIN --------------");
  };

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    // console.log("-------------- onSaveUserClicked DEBUT --------------");

    try {
      if (canSave) {
        const result = await addNewUser({ username, password, email, role });
        if (result.error) {
          setMessageInfo(result.error.data.message);
        } else {
          setMessageInfo("");
        }
      }

      refetch();
    } catch (error) {
      // Gérer l'erreur ici si nécessaire
      console.log("Une erreur s'est produite");
    }

    // console.log("-------------- onSaveUserClicked FIN --------------");
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validEmailClass = !validEmail ? "form__input--incomplete" : "";
  // const validRoleClass = !validRole ? "form__input--incomplete" : "";

  const content = (
    <>
      <form className="newuserform" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>Ajouter un nouvel Utilisateur</h2>
          <div className="form__action-buttons">
            <div>
              <h3>Enregistrer</h3>
              <button className="icon-button" title="Save" disabled={!canSave}>
                <i className="fa-solid fa-floppy-disk"></i>
              </button>
            </div>
            <div>
              <h3>Accueil</h3>
              <h4>
                <NavLink to="/PrivateRoute/HomeListeRecettesProtect">
                  <i className="fa-solid fa-house"></i>
                </NavLink>
              </h4>
            </div>
          </div>
        </div>
        <div className="form__content">
          {/* // PSEUDO */}
          <label className="form__label" htmlFor="username">
            Pseudo: <span className="nowrap">[3-20 lettres]</span>
          </label>
          <input
            className={`form__input ${validUserClass}`}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />
          {/* // MOT DE PASSE */}
          <label className="form__label" htmlFor="password">
            Mot de passe: <span className="nowrap">[4-12 car avec !*#$%]</span>
          </label>
          <input
            className={`form__input ${validPwdClass}`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
          />
          {/* // EMAIL */}
          <label className="form__label" htmlFor="email">
            Email: <span className="nowrap">[xxx@xxx.xxx]</span>
          </label>
          <input
            className={`form__input ${validEmailClass}`}
            id="email"
            name="email"
            type="text"
            autoComplete="off"
            value={email}
            onChange={onEmailChanged}
          />
          {/* // ACTIVE */}
          <label
            className="form__label form__checkbox-container"
            htmlFor="user-active"
          >
            Statut: <span className="nowrap">[Actif si coché]</span>
            <input
              className="form__checkbox"
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
            />
          </label>
          {/* // ROLE */}
          <label className="form__label" htmlFor="role">
            Role:
          </label>
          <select
            // className={`form__input ${validRoleClass}`}
            id="role"
            name="role"
            size="3"
            value={role}
            onChange={onRoleChanged}
          >
            {options}
          </select>
        </div>

        <div className="form__message">
          {messageInfo && (
            <p className="infoClass">
              <i className="fa-solid fa-triangle-exclamation"></i>&nbsp;
              {messageInfo}
            </p>
          )}
        </div>
      </form>
    </>
  );

  return content;
};

export default NewUserForm;
