import { useState, useEffect } from "react";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "./usersApiSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-Za-z0-9]{4,25}$/;
const PWD_REGEX = /^[A-z0-9!*#$%]{8,12}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const EditUserForm = ({ user }) => {
  // console.log("EditUserForm");
  // console.log("user : ");
  // console.log(user);
  // Statut après appel de la fonction useUpdateUserMutation()
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  // Statut après appel de la fonction useDeleteUserMutation()
  const [deleteUser, { isDelSuccess, isDelError, delerror }] =
    useDeleteUserMutation();

  const navigate = useNavigate();

  const { refetch } = useGetUsersQuery();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [validEmail, setValidEmail] = useState(false);
  const [role, setRole] = useState(user.role);
  // const [validRole, setValidRole] = useState(false);
  const [active, setActive] = useState(user.active);

  const [canSave, setCanSave] = useState(false);

  const [messageInfo, setMessageInfo] = useState("");

  useEffect(() => {
    // console.log("*************** UseEffect username ************");
    // setValidUsername(USER_REGEX.test(username));
    if (username !== undefined) {
      handleCanSave();
    }
  }, [username]);

  useEffect(() => {
    // console.log("*************** UseEffect password ************");
    // setValidPassword(PWD_REGEX.test(password));
    if (password !== "") {
      // console.log("nouveau password");
      handleCanSavePwd();
    }
    // else {
    //   console.log("password masqué inchangé");
    // }
  }, [password]);

  useEffect(() => {
    // console.log("*************** UseEffect email ************");
    // setValidEmail(EMAIL_REGEX.test(email));
    if (email !== undefined) {
      handleCanSave();
    }
  }, [email]);

  useEffect(() => {
    // console.log("*************** UseEffect active ************");
    // setValidEmail(EMAIL_REGEX.test(email));

    handleCanSave();
  }, [active]);

  useEffect(() => {
    // console.log("*************** UseEffect role ************");
    // setValidEmail(EMAIL_REGEX.test(email));

    handleCanSave();
  }, [role]);

  useEffect(() => {
    // console.log("*************** UseEffect canSave ************");
    console.log(canSave);
  }, [canSave]);

  useEffect(() => {
    // console.log(
    //   "*************** UseEffect isSuccess isDelSuccess navigate ************"
    // );
    if (isSuccess || isDelSuccess) {
      console.log("isSuccess : " + isSuccess);
      console.log("isDelSuccess : " + isDelSuccess);
      setUsername("");
      setPassword("");
      setEmail("");
      setRole("");
      navigate("/PrivateRoute/homebase");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleCheckEmail = (checkedEmail) => {
    // console.log("-------------- handleCheckEmail DEBUT --------------");
    // Contrôle des données inchangées pour maj indicateurs
    setValidUsername(USER_REGEX.test(username));

    // Si erreur, alimentation messageInfo
    if (EMAIL_REGEX.test(checkedEmail)) {
      setMessageInfo("");
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
      // console.log("messageInfo OK: " + messageInfo);
    } else {
      setMessageInfo("Mot de passe invalide");
      // console.log("messageInfo mdp invalide: " + messageInfo);
    }
    // MAJ state Password pour déclencher useEffect de contrôle
    setPassword(checkedPassword);
    setValidPassword(PWD_REGEX.test(checkedPassword));
    // console.log("-------------- handleCheckPassword FIN --------------");
  };

  const handleCanSave = () => {
    // console.log("-------------- handleCanSave DEBUT --------------");

    // console.log("handleCanSave sans changement de password");
    // console.log("email : " + email);
    // console.log("username : " + username);
    const newCanSave = [validUsername, validEmail].every(Boolean) && !isLoading;
    setCanSave(newCanSave);
    // console.log("validRole : " + validRole);
    // console.log("validUsername : " + validUsername);
    // console.log("validEmail : " + validEmail);
    // console.log("canSave : " + newCanSave);

    // console.log("-------------- handleCanSave FIN --------------");
  };

  const handleCanSavePwd = () => {
    // console.log("-------------- handleCanSavePwd DEBUT --------------");

    // console.log("handleCanSave with password");

    const newCanSave =
      [validUsername, validPassword, validEmail].every(Boolean) && !isLoading;
    setCanSave(newCanSave);
    // console.log("validPassword : " + validPassword);
    // console.log("validUsername : " + validUsername);
    // console.log("validEmail : " + validEmail);
    // console.log("canSave : " + newCanSave);

    // console.log("-------------- handleCanSavePwd FIN --------------");
  };

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
    e.target.value !== undefined && setPassword(e.target.value);
    e.target.value !== undefined && handleCheckPassword(e.target.value);
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
    // Contrôle des données inchangées pour maj indicateurs
    setValidEmail(EMAIL_REGEX.test(email));
    setValidUsername(USER_REGEX.test(username));
    setRole(e.target.value);

    // console.log("-------------- onRoleChanged FIN --------------");
  };

  // const onActiveChanged = (e) => setActive((prev) => !prev);
  const onActiveChanged = (e) => {
    // console.log("-------------- onActiveChanged DEBUT --------------");
    // Contrôle des données inchangées pour maj indicateurs
    // console.log("email : " + email);
    // console.log("username : " + username);
    // Contrôle des données inchangées pour maj indicateurs
    setValidEmail(EMAIL_REGEX.test(email));
    setValidUsername(USER_REGEX.test(username));

    setActive((prev) => !prev);

    // console.log("-------------- onActiveChanged FIN --------------");
  };

  const onSaveUserClicked = async (e) => {
    // console.log("-------------- onSaveUserClicked DEBUT --------------");

    try {
      let result;
      if (password) {
        // console.log("PATCH BDD avec new PWD");
        result = await updateUser({
          id: user.id,
          username,
          password,
          email,
          role,
          active,
        });
      } else {
        // console.log("PATCH BDD avec old PWD");
        result = await updateUser({
          id: user.id,
          username,
          email,
          role,
          active,
        });
      }

      if (result.error) {
        setMessageInfo(result.error.data.message);
      } else {
        setMessageInfo("");
      }

      // Après une mise à jour réussie, appeler refetch() pour actualiser la liste des utilisateurs
      refetch();
    } catch (error) {
      // Gérer l'erreur ici si nécessaire
      console.log("Une erreur s'est produite");
    }

    // console.log("-------------- onSaveUserClicked FIN --------------");
  };

  const onDeleteUserClicked = async () => {
    // console.log("-------------- onDeleteUserClicked DEBUT --------------");

    try {
      const result = await deleteUser({
        id: user.id,
      });

      setMessageInfo("");
      // console.log("Suppression réussie !");
    } catch (error) {
      setMessageInfo(error.message);
      // console.error("Erreur lors de la suppression :", error);
    }

    // Après une mise à jour réussie, appeler refetch() pour actualiser la liste des utilisateurs
    // refetch();
    navigate("/PrivateRoute/homebase");

    // console.log("-------------- onDeleteUserClicked FIN --------------");
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validEmailClass = !validEmail ? "form__input--incomplete" : "";
  // const validRoleClass = !validRole ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ""; // vide si pas d'erreur

  const content = (
    <>
      <form className="edituserform" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Mise à jour d'un Utilisateur</h2>

          <div className="form__action-buttons">
            <div>
              <h3>Enregistrer</h3>
              <button
                className="icon-button"
                title="Save"
                onClick={onSaveUserClicked}
                disabled={!canSave}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
            </div>
            <div>
              <h3>Supprimer</h3>
              <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteUserClicked}
              >
                <FontAwesomeIcon icon={faTrashCan} />
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
            Pseudo: <span className="nowrap">[4-25 lettres]</span>
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
            Mot de passe: <span className="nowrap">[8-12 car avec !*#$%]</span>
          </label>
          <input
            className={`form__input ${validPwdClass}`}
            id="password"
            name="password"
            type="password"
            value={password}
            // autoComplete="current-password"
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
            Role: <span className="nowrap">[A sélectionner]</span>
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
            <p>
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

export default EditUserForm;
