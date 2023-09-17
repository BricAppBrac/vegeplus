import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  setSignUp,
  setCloseUp,
  setSignIn,
  setCloseIn,
} from "../feature/signInUp.slice";
import { setSort } from "../feature/sort.slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    // console.log("handleSignUp");
    dispatch(setSignUp(true));
    dispatch(setCloseUp(false));
    dispatch(setSignIn(false));
    dispatch(setCloseIn(false));
  };

  const handleSignIn = async () => {
    // console.log("handleSignIn");
    dispatch(setSignIn(true));
    dispatch(setCloseIn(false));
    dispatch(setSignUp(false));
    dispatch(setCloseUp(false));
  };

  const handleInit = () => {
    dispatch(setSort(["Croissant", null, null]));
  };

  const handleLogoClick = () => {
    handleInit();
    navigate("/");
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <div className="imglogo" onClick={() => handleLogoClick()}></div>

          <ul>
            <li>
              <NavLink
                to="/"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
                onClick={() => handleInit()}
              >
                Liste des Recettes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
              >
                Menu de la semaine
              </NavLink>
              <span>
                Inscription gratuite pour pouvoir créer le Menu de la Semaine
              </span>
            </li>
          </ul>
          <div className="nav-buttons">
            <button onClick={() => handleSignUp()}>Inscription gratuite</button>
            <button onClick={() => handleSignIn()}>Espace perso</button>
          </div>
          <h3>Une application BricAppBrac</h3>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
