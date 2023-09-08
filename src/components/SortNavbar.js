import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../feature/sort.slice";

const SortNavbar = () => {
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
    console.log("Tri sur Mot-Clé : ");
    console.log(motcle);
    arrayNew = [...sortlast];
    arrayNew[2] = motcle;
    console.log("arrayNew avant choix Mot-Clé : ");
    console.log(arrayNew);
    if (motcle === null || motcle.length === 0 || motcle === undefined) {
      motcleRef.current.className = "";
    } else {
      motcleRef.current.className = "sortnav-active";
    }

    dispatch(setSort(arrayNew));
    console.log("sortSelected après choix Mot-Clé : ");
    console.log(arrayNew);
    arrayNew = [];
  };

  const handleTriCroissant = (croissantRef) => {
    console.log("Tri croissant");
    arrayNew = [...sortlast];
    arrayNew[0] = "Croissant";
    console.log("arrayNew avant choix Croissant : ");
    console.log(arrayNew);
    croissantRef.current.className = "sortnav-active";
    decroissantRef.current.className = "";
    dispatch(setSort(arrayNew));
    console.log("sortSelected après choix Croissant : ");
    console.log(arrayNew);
    arrayNew = [];
  };

  const handleTriDecroissant = (decroissantRef) => {
    console.log("Tri décroissant");
    arrayNew = [...sortlast];
    arrayNew[0] = "Decroissant";
    console.log("arrayNew avant choix Décroissant : ");
    console.log(arrayNew);
    decroissantRef.current.className = "sortnav-active";
    croissantRef.current.className = "";
    dispatch(setSort(arrayNew));
    console.log("sortSelected après choix Décroissant : ");
    console.log(arrayNew);
    arrayNew = [];
  };

  const handleTriSaison = (season, saisonRef) => {
    console.log("Tri saison : " + season);
    arrayNew = [...sortlast];
    arrayNew[1] = season;
    console.log("arrayNew avant choix Saison : ");
    console.log(arrayNew);
    if (season !== "saison") {
      saisonRef.current.className = "sortnav-active";
    } else {
      saisonRef.current.className = "";
    }
    dispatch(setSort(arrayNew));
    console.log("sortSelected après choix Saison : ");
    console.log(arrayNew);
    arrayNew = [];
  };

  return (
    <div className="sort-nav">
      <div className="sort-nav-container">
        <p>TRIS: </p>
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
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SortNavbar;
