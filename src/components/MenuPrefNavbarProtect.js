import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPref, resetPref } from "../feature/pref.slice";
import { useNavigate } from "react-router-dom";
import { resetCompo } from "../feature/menucompo.slice";
import { resetMenuRecipes } from "../feature/menurecipes.slice";
import useAuth from "../hooks/useAuth";

const MenuPrefNavbarProtect = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prefSelected = useSelector((state) => state.prefSelect.prefSelected);

  const [messAbo, setMessAbo] = useState("");

  const { username, isAdmin, isAbo } = useAuth();

  let arrayNew = [];
  let dateDefault = prefSelected[2]
    ? prefSelected[2]
    : new Date().toISOString().substring(0, 10);

  ///////////////////
  //// PREFERENCES
  /////////////////

  const handleDaysNb = (daysNb) => {
    arrayNew = [...prefSelected];
    arrayNew[0] = daysNb;
    dispatch(setPref(arrayNew));
    arrayNew = [];
  };

  const handleMealsNb = (mealsNb) => {
    arrayNew = [...prefSelected];
    arrayNew[1] = mealsNb;
    dispatch(setPref(arrayNew));
    arrayNew = [];
  };

  const handleDayOne = (dayOne) => {
    arrayNew = [...prefSelected];
    arrayNew[2] = dayOne;
    dispatch(setPref(arrayNew));
    arrayNew = [];
  };

  /////////////////////////////////////
  //// Consulter les menus validés
  /////////////////////////////////////
  const handleConsultMenus = (dayOne) => {
    // console.log("handleConsultMenus");
    // Pour consulter les menus, on ne sélectionne aucun menu => reset dans le store
    dispatch(resetPref());
    dispatch(resetCompo());
    dispatch(resetMenuRecipes());
    navigate("/menusvalides");
  };

  return (
    <div className="menu-nav">
      <div className="menu-nav-container">
        <p>
          <i className="fa-solid fa-chevron-right"></i>
          &nbsp;Préférences:
        </p>
        <ul>
          <li
            onChange={(e) => {
              handleDaysNb(e.target.value);
            }}
          >
            Nb de jours:
            {/* <select defaultValue={"7"}> */}
            <select defaultValue={prefSelected[0]}>
              <option value="daysNb">sélectionner</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </li>

          <li
            onChange={(e) => {
              handleMealsNb(e.target.value);
            }}
          >
            Nb de repas/j:
            {/* <select defaultValue={"2"}> */}
            <select defaultValue={prefSelected[1]}>
              <option value="mealsNb">sélectionner</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </li>

          <li
            onChange={(e) => {
              handleDayOne(e.target.value);
            }}
          >
            Date 1er jour:
            <input type="date" defaultValue={dateDefault} />
          </li>
        </ul>
        <div className="box-options-menu">
          {isAdmin || isAbo ? (
            <div className="box-consult-menu">
              <p>
                <i className="fa-solid fa-chevron-right"></i>
                Consulter les Menus validés:&nbsp;
              </p>
              <button onClick={() => handleConsultMenus()}>
                <i id="validicon" className="fa-solid fa-file"></i>
              </button>
            </div>
          ) : (
            <div className="box-consult-menu">
              <p>
                <i className="fa-solid fa-chevron-right"></i>
                Consulter les Menus validés (abonnés):&nbsp;
              </p>
              <button className="button-off">
                <i id="validicon" className="fa-solid fa-file"></i>
              </button>
            </div>
          )}
        </div>
        <div className="box-options-menu">
          <div className="box-change-menu">
            <p>
              <i className="fa-solid fa-chevron-right"></i>
              &nbsp;Changer le Menu:&nbsp;
            </p>
            <button onClick={() => props.handleChangeMenu()}>
              <i className="fa-solid fa-rotate-left"></i>
            </button>
          </div>
          {isAdmin || isAbo ? (
            <div className="box-valide-menu">
              <p>
                <i className="fa-solid fa-chevron-right"></i>
                &nbsp;Valider le Menu:&nbsp;
              </p>
              <button onClick={() => props.handleValideMenu()}>
                <i className="fa-solid fa-thumbs-up"></i>
              </button>
            </div>
          ) : (
            <div className="box-valide-menu">
              <p>
                <i className="fa-solid fa-chevron-right"></i>
                &nbsp;Valider le Menu (abonnés):&nbsp;
              </p>
              <button className="button-off">
                <i className="fa-solid fa-thumbs-up"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPrefNavbarProtect;
