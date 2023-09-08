import React, { useEffect } from "react";
import MenusListeCard from "./MenusListeCard";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getListeMenus } from "../feature/menusliste.slice";
import { setSortMenus } from "../feature/sortmenus.slice";
import { useGetMenusQuery } from "../feature/menus/menusApiSlice";

import { faHourglass3 } from "@fortawesome/free-solid-svg-icons";

const ListeMenus = () => {
  const dispatch = useDispatch();
  // const listemenus = useSelector((state) => state.listeMenus.menusData);

  const sortSelectedMenus = useSelector(
    (state) => state.sortSelectMenus.sortSelectedMenus
  );

  // Execute the query and fetch data
  const { data, error, isLoading, isSuccess } = useGetMenusQuery();

  // Create 'listemenus' based on 'data'
  const listemenus = isSuccess
    ? data.ids.map((menuId) => {
        const menu = data.entities[menuId];
        return {
          _id: menu._id,
          user: menu.user,
          prefNbJ: menu.prefNbJ,
          prefNbMeal: menu.prefNbMeal,
          prefDayOne: menu.prefDayOne,
          menuJ: menu.menuJ,
        };
      })
    : [];

  if (isSuccess) {
    dispatch(getListeMenus(listemenus));
  }

  useEffect(() => {
    // Dispatch de l'action pour définir le tri des menus

    dispatch(setSortMenus(["Croissant", null]));
  }, [dispatch]);
  if (listemenus.length === 0) {
    console.log("listemenus vide");
    console.log(listemenus);
    content = <h3>Pas de Menus sauvegardés</h3>;
  }

  return (
    <div className="menuscards-liste">
      {isLoading && <div>Loading...</div>}{" "}
      {/* Display a loading indicator while fetching data */}
      {isSuccess &&
        listemenus &&
        listemenus
          .slice()

          ///////////////////////////////
          // TRI sur le Jour
          ///////////////////////////////
          .filter((menu) => {
            // tri selon jour demandé

            if (sortSelectedMenus[1]) {
              console.log(
                "sortSelectedMenus[1] rens : " + sortSelectedMenus[1]
              );
              console.log("menu.menuJ : ");
              console.log(menu.menuJ);

              // **** GESTION FORMAT DATE **********************************

              let selectedDayFormat = new Date(sortSelectedMenus[1]);
              let dayFormat = new Date().toISOString().substring(0, 10);
              dayFormat = selectedDayFormat.toLocaleDateString("fr-FR");
              console.log("dayFormat");
              console.log(dayFormat);
              //********************************** */
              // Verif si date incluse dans le tableau MenuJ
              //****************************************** */

              for (let i = 0; i < menu.prefNbJ; i++) {
                console.log("menu.menuJ[i] / i : " + i);
                console.log(menu.menuJ[i]);
                if (menu.menuJ[i].includes(dayFormat)) {
                  console.log("date inclue");
                  return menu;
                } else {
                  console.log("date NON inclue");
                }
              }
            } else {
              console.log(
                "sortSelectedMenus[1] non rens : " + sortSelectedMenus[1]
              );
              return menu;
            }
          })
          //////////////////////////////////////////
          // TRI CROISSANT ou DECROISSANT
          /////////////////////////////////////////
          .sort((a, b) => {
            switch (sortSelectedMenus[0]) {
              case "Decroissant":
                return b.prefDayOne.localeCompare(a.prefDayOne);
              case "Croissant":
                return a.prefDayOne.localeCompare(b.prefDayOne);
              default:
                console.log("Cas qui ne devrait pas arriver");
            }
          })
          .map((menu) => <MenusListeCard key={menu._id} menu={menu} />)}
      {error && <div>Error: {error.message} </div>}
    </div>
  );
};

export default ListeMenus;
