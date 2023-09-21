import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSort } from "../feature/sort.slice";

const SortNavbarProtect = () => {
  const dispatch = useDispatch();
  const sortlast = useSelector((state) => state.sortSelect.sortSelected);

  let arrayNew = [];

  const motcleRef = useRef();
  const croissantRef = useRef();
  const decroissantRef = useRef();
  const saisonRef = useRef();

  ///////////////////
  //// TRIS
  /////////////////

  const handleTriMotCle = (motcle, motcleRef) => {
    arrayNew = [...sortlast];
    arrayNew[2] = motcle;

    if (motcle === null || motcle.length === 0 || motcle === undefined) {
      motcleRef.current.className = "";
    } else {
      motcleRef.current.className = "sortnav-active";
    }

    dispatch(setSort(arrayNew));

    arrayNew = [];
  };

  const handleTriCroissant = (croissantRef) => {
    arrayNew = [...sortlast];
    arrayNew[0] = "Croissant";

    croissantRef.current.className = "sortnav-active";
    decroissantRef.current.className = "";
    dispatch(setSort(arrayNew));

    arrayNew = [];
  };

  const handleTriDecroissant = (decroissantRef) => {
    arrayNew = [...sortlast];
    arrayNew[0] = "Decroissant";

    decroissantRef.current.className = "sortnav-active";
    croissantRef.current.className = "";
    dispatch(setSort(arrayNew));

    arrayNew = [];
  };

  const handleTriSaison = (season, saisonRef) => {
    arrayNew = [...sortlast];
    arrayNew[1] = season;

    if (season !== "saison") {
      saisonRef.current.className = "sortnav-active";
    } else {
      saisonRef.current.className = "";
    }

    dispatch(setSort(arrayNew));

    arrayNew = [];
  };

  return (
    <div className="sort-nav">
      <div className="sort-nav-container">
        <p>
          <i className="fa-solid fa-chevron-right"></i>
          &nbsp;TRIS:{" "}
        </p>
        <ul>
          <li ref={motcleRef}>
            mot-clé :
            <input
              type="text"
              id="motclé"
              placeholder="mot-clé"
              onChange={(e) => {
                handleTriMotCle(e.target.value.trim(), motcleRef);
              }}
            ></input>
          </li>
          <li
            onClick={(e) => {
              handleTriCroissant(croissantRef);
            }}
            className="sortnav-active"
            ref={croissantRef}
          >
            ordre croissant
          </li>
          <li
            onClick={(e) => {
              handleTriDecroissant(decroissantRef);
            }}
            ref={decroissantRef}
          >
            ordre décroissant
          </li>
          <li
            onChange={(e) => {
              handleTriSaison(e.target.value, saisonRef);
            }}
            ref={saisonRef}
          >
            saison :
            <select>
              <option value="saison">sélectionner</option>
              <option value="printemps">printemps</option>
              <option value="été">été</option>
              <option value="automne">automne</option>
              <option value="hiver">hiver</option>
              <option value="toutes">toutes</option>
            </select>
          </li>
        </ul>
      </div>
      <div className="new-container">
        <p>
          <NavLink to="/PrivateRoute/pagenewrecipe">
            <i className="fa-solid fa-chevron-right"></i>
            Nouvelle Recette{" "}
            <i id="plusicon" className="fa-solid fa-square-plus"></i>
          </NavLink>
        </p>
        <p>
          <NavLink to="/PrivateRoute/homebase">
            <i className="fa-solid fa-chevron-right"></i>Gestion Admin
            <i id="plusicon" className="fa-solid fa-toolbox"></i>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SortNavbarProtect;
