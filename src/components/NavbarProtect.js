import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setSort } from "../feature/sort.slice";
import { useSendLogoutMutation } from "../feature/auth/authApiSlice";

const NavbarProtect = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const handleInit = () => {
    dispatch(setSort(["Croissant", null, null]));
  };

  const handleLogoClick = () => {
    handleInit();
    navigate("/PrivateRoute/HomeListeRecettesProtect");
  };

  const handleLogout = async () => {
    // console.log("handleLogout");
    try {
      await sendLogout();
    } catch (err) {
      if (!err.status) {
        setErrMsg("Pas de réponse du serveur");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) navigate("/HomeListeRecettes");
  }, [isSuccess, navigate]);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <div className="imglogo" onClick={() => handleLogoClick()}></div>

          <ul>
            <li>
              <NavLink
                to="/PrivateRoute/HomeListeRecettesProtect"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Liste des Recettes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/homemenu"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
                onClick={() => handleInit()}
              >
                Menu de la semaine
              </NavLink>
            </li>
          </ul>
          <div className="nav-buttons">
            <button onClick={handleLogout}>
              Déconnexion&nbsp;
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
            {/* <span>Se déconnecter</span> */}
          </div>
          <h3>Une application BricAppBrac</h3>
        </div>
      </div>
    </nav>
  );
};

export default NavbarProtect;
