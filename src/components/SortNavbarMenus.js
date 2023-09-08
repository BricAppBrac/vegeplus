import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortMenus } from "../feature/sortmenus.slice";

const SortNavbarMenus = () => {
  const dispatch = useDispatch();
  const sortmenu = useSelector(
    (state) => state.sortSelectMenus.sortSelectedMenus
  );

  let arrayNew = [];

  const dayRef = useRef();
  const croissantRefMenu = useRef();
  const decroissantRefMenu = useRef();

  ///////////////////
  //// TRIS
  /////////////////

  const handleTriDay = (day, dayRef) => {
    console.log("Tri sur le jour : ");
    console.log(day);
    console.log("dayRef");
    console.log(dayRef);
    arrayNew = [...sortmenu];
    arrayNew[1] = day;
    console.log("arrayNew avant choix Jour : ");
    console.log(arrayNew);
    if (day === null || day.length === 0 || day === undefined) {
      dayRef.current.className = "";
    } else {
      dayRef.current.className = "sortnav-menu-active";
    }

    dispatch(setSortMenus(arrayNew));
    console.log("sortSelectedMenu après choix Jour : ");
    console.log(arrayNew);
    arrayNew = [];
  };

  const handleTriCroissantMenu = (croissantRefMenu) => {
    console.log("Tri croissant Menu");
    console.log("croissantRefMenu");
    console.log(croissantRefMenu);
    arrayNew = [...sortmenu];
    arrayNew[0] = "Croissant";
    console.log("arrayNew avant choix Croissant : ");
    console.log(arrayNew);
    croissantRefMenu.current.className = "sortnav-menus-active";
    decroissantRefMenu.current.className = "";
    dispatch(setSortMenus(arrayNew));
    console.log("sortSelectedMenu après choix Croissant : ");
    console.log(arrayNew);
    arrayNew = [];
  };

  const handleTriDecroissantMenu = (decroissantRefMenu) => {
    console.log("Tri décroissant Menu");
    console.log("decroissantRefMenu");
    console.log(decroissantRefMenu);
    arrayNew = [...sortmenu];
    arrayNew[0] = "Decroissant";
    console.log("arrayNew avant choix Décroissant : ");
    console.log(arrayNew);
    decroissantRefMenu.current.className = "sortnav-menus-active";
    croissantRefMenu.current.className = "";
    dispatch(setSortMenus(arrayNew));
    console.log("sortSelectedMenu après choix Décroissant : ");
    console.log(arrayNew);
    arrayNew = [];
  };

  return (
    <div className="sort-nav-menus">
      <div className="sort-nav-menus-container">
        <p>TRIS: </p>
        <ul>
          <li ref={dayRef}>
            jour inclus:
            <input
              type="date"
              id="day"
              // defaultValue={dateDefault}
              // placeholder="jour"
              onChange={(e) => {
                handleTriDay(e.target.value.trim(), dayRef);
              }}
            ></input>
          </li>
          <li
            onClick={(e) => {
              handleTriCroissantMenu(croissantRefMenu);
            }}
            className="sortnav-menus-active"
            ref={croissantRefMenu}
          >
            ordre croissant
          </li>
          <li
            onClick={(e) => {
              handleTriDecroissantMenu(decroissantRefMenu);
            }}
            ref={decroissantRefMenu}
          >
            ordre décroissant
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SortNavbarMenus;
