import React, { useEffect } from "react";
import MenusListeCard from "./MenusListeCard";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getListeMenus } from "../feature/menusliste.slice";
import { setSortMenus } from "../feature/sortmenus.slice";
import { useGetMenusQuery } from "../feature/menus/menusApiSlice";
import useAuth from "../hooks/useAuth";
import { PulseLoader } from "react-spinners";

const ListeMenus = () => {
  const dispatch = useDispatch();
  // const listemenus = useSelector((state) => state.listeMenus.menusData);
  const { username, isAdmin, isAbo, isInscrit } = useAuth();

  const sortSelectedMenus = useSelector(
    (state) => state.sortSelectMenus.sortSelectedMenus
  );

  // Execute the query and fetch data
  const { data, error, isLoading, isSuccess } = useGetMenusQuery();
  // Create 'listemenus' based on 'data'
  let filteredIds;
  if (isSuccess) {
    // const { ids } = menus;
    const { ids, entities } = data;

    if (isAdmin) {
      filteredIds = [...data.ids];
    } else {
      filteredIds = data.ids.filter(
        (menuId) => entities[menuId].user === username
      );
    }
  }

  const listemenus = isSuccess
    ? filteredIds.map((menuId) => {
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
  // console.log("listemenus --------------");
  // console.log(listemenus);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getListeMenus(listemenus));
    }
  }, [dispatch, isSuccess, listemenus]);

  useEffect(() => {
    // Dispatch de l'action pour définir le tri des menus

    dispatch(setSortMenus(["Croissant", null]));
  }, [dispatch]);

  let content;

  if (isLoading) {
    content = (
      <div className="menuscards-liste">
        {/* <div>Loading...</div>; */}
        <div>
          <PulseLoader color="#FFF" />
        </div>
      </div>
    );
  }

  if (!isLoading && listemenus.length === 0) {
    content = (
      <div className="menuscards-liste">
        <h3>Pas de Menus sauvegardés</h3>;
      </div>
    );
  }

  if (isSuccess && listemenus) {
    content = (
      <div className="menuscards-liste">
        {listemenus
          .slice()

          ///////////////////////////////
          // TRI sur le Jour
          ///////////////////////////////
          .filter((menu) => {
            // tri selon jour demandé

            if (sortSelectedMenus[1]) {
              // console.log(
              //   "sortSelectedMenus[1] rens : " + sortSelectedMenus[1]
              // );
              // console.log("menu.menuJ : ");
              // console.log(menu.menuJ);

              // **** GESTION FORMAT DATE **********************************

              let selectedDayFormat = new Date(sortSelectedMenus[1]);
              let dayFormat = new Date().toISOString().substring(0, 10);
              dayFormat = selectedDayFormat.toLocaleDateString("fr-FR");
              // console.log("dayFormat");
              // console.log(dayFormat);
              //********************************** */
              // Verif si date incluse dans le tableau MenuJ
              //****************************************** */

              for (let i = 0; i < menu.prefNbJ; i++) {
                // console.log("menu.menuJ[i] / i : " + i);
                // console.log(menu.menuJ[i]);
                if (menu.menuJ[i].includes(dayFormat)) {
                  // console.log("date inclue");
                  return menu;
                }
                // else {
                //   console.log("date NON inclue");
                // }
              }
            } else {
              // console.log(
              //   "sortSelectedMenus[1] non rens : " + sortSelectedMenus[1]
              // );
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
          .map((menu) => (
            <MenusListeCard key={menu._id} menu={menu} />
          ))}
      </div>
    );
  }

  if (error) {
    content = (
      <div className="menuscards-liste">
        <div>Error: {error.message} </div>
      </div>
    );
  }

  return content;
};

export default ListeMenus;
