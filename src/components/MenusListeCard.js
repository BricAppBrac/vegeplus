import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DayCard from "./DayCard";
import { setPref } from "../feature/pref.slice";
import { setCompo } from "../feature/menucompo.slice";
import {
  useDeleteMenuMutation,
  useGetMenusQuery,
} from "../feature/menus/menusApiSlice";

import {
  createMenuRecipe,
  resetMenuRecipes,
} from "../feature/menurecipes.slice";
import { deleteListeMenu } from "../feature/menusliste.slice";

// import axios from "axios";
import { setStopReset } from "../feature/indicstopreset.slice";
import { setStopResetDate } from "../feature/indicstopresetdate.slice";

const MenusListeCard = ({ menu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [message, setMessage] = useState("");
  const [deleteMenuMutation] = useDeleteMenuMutation();
  const { refetch } = useGetMenusQuery();
  const liste = useSelector((state) => state.listeRecipes.listeData);

  let arrayNew = [];

  // **** GESTION FORMAT DATE **********************************

  let dDay = new Date(menu.prefDayOne);
  let dayFormat = new Date().toISOString().substring(0, 10);
  let nextdayFormat = new Date().toISOString().substring(0, 10);

  dayFormat = dDay.toLocaleDateString("fr-FR");

  // ***********************************************
  // Choix d'un menu => mise en phase des préférences dans le store
  // prefSelect / prefSelected
  // ***********************************************
  const handlePhasePref = (menu) => {
    console.log("*******************************************");
    console.log("Alimentation des préférences");
    console.log("*******************************************");
    arrayNew = [menu.prefNbJ, menu.prefNbMeal, menu.prefDayOne];
    dispatch(setPref(arrayNew));
    console.log(arrayNew);
    console.log("*******************************************");
  };

  // Choix d'un menu => mise en phase des de la compo du Menu
  // dans le store : menuCompo / compoListe
  // Choix d'un menu => mise en phase des recettes du Menu
  // dans le store : menuRecipes / menuRecipesData
  const handlePhaseMenuCompo = (menu) => {
    console.log("*******************************************");
    console.log("Alimentation de compoListe et de menuRecipesData");
    console.log("*******************************************");

    // Alimentation de arrayW avec la liste des id des recettes du Menu

    let arrayW = [];
    console.log("Nbre de jours du Menu : ");
    console.log(menu.prefNbJ);

    menu.menuJ.forEach((dayMenu) => {
      if (menu.prefNbMeal === 2) {
        arrayW = [...arrayW, dayMenu[1], dayMenu[3]];
      } else {
        arrayW = [...arrayW, dayMenu[1]];
      }
    });

    console.log("liste des ids du Menu");
    console.log(arrayW);

    // Récupération des recettes complètes à partir des id, pour alimentation de menuRecipes

    let arrayRecipes = [];
    dispatch(resetMenuRecipes());

    for (let k = 0; k < arrayW.length && k < 9000; k++) {
      const recipe = liste.find((recipe) => recipe._id === arrayW[k]);
      if (recipe) {
        arrayRecipes = [...arrayRecipes, recipe];
        dispatch(createMenuRecipe(recipe));
      }
      if (k === 9000) {
        console.log("boucle k infinie");
      }
    }

    console.log("liste des recettes du Menu");
    console.log(arrayRecipes);

    // Alimentation de menuCompo

    let firstday = new Date(menu.prefDayOne);
    // let nextday = new Date(menu.prefDayOne);
    let nextday = new Date(firstday);

    let jMeal = 0;

    let arrayCompo = [];
    let newCompo = {};

    for (let j = 0; j < menu.prefNbJ && j < 9000; j++) {
      // nextday.setDate(firstday.getDate() + j);
      if (j !== 0) {
        nextday.setDate(nextday.getDate() + 1);
      }
      console.log("*** calcul des jours *** index : " + j);

      nextdayFormat = nextday.toLocaleDateString("fr-FR");
      console.log("nextdayFormat : " + nextdayFormat);

      // Alimentation de menuCompo lorsqu'il n'y a qu'un repas/jour
      if (menu.prefNbMeal === 1) {
        newCompo = {
          index: j,
          type: 1,
          date: nextdayFormat,
          meal1Complete: arrayRecipes[j],
          meal1: arrayRecipes[j].title,
          meal2Complete: null,
          meal2: null,
        };
        arrayCompo = [...arrayCompo, newCompo];
        console.log("arrayCompo");
        console.log(arrayCompo);

        dispatch(setCompo(arrayCompo));
      } else {
        // Alimentation de menuCompo lorsqu'il y a 2 repas/jour
        jMeal = j * 2;
        const meal1 = arrayRecipes[jMeal].title;
        console.log("meal1 : " + meal1);
        const meal2 = arrayRecipes[jMeal + 1].title;
        console.log("meal2 : " + meal2);

        newCompo = {
          index: j,
          type: 2,
          date: nextdayFormat,
          meal1Complete: arrayRecipes[jMeal],
          meal1: meal1,
          meal2Complete: arrayRecipes[jMeal + 1],
          meal2: meal2,
        };
        arrayCompo = [...arrayCompo, newCompo];
        console.log("arrayCompo");
        console.log(arrayCompo);
        dispatch(setCompo(arrayCompo));
      }
    }
  };

  // ***********************************************************
  // Clic sur le bouton Générer Liste de courses
  // ***********************************************************

  const handleListeCourses = (menu) => {
    console.log("handleListeCourses : " + menu.prefDayOne);
    handlePhasePref(menu);
    handlePhaseMenuCompo(menu);
    navigate("/listecourses");
  };
  // ***********************************************************
  // Clic sur le bouton Supprimer le Menu Validé
  // ***********************************************************

  const handleDeleteMenuValide = async (menu) => {
    console.log("handleDeleteMenuValide : " + menu.prefDayOne);

    try {
      // Call the deleteMenu mutation with the menu id
      const response = await deleteMenuMutation({ id: menu._id });

      // Check if the mutation was successful
      if (response.error) {
        console.error("Failed to delete menu:", response.error);
      } else {
        console.log("DELETE MENU BDD");
        dispatch(deleteListeMenu(menu._id));

        // Après une mise à jour réussie, appeler refetch() pour actualiser la liste des utilisateurs
        refetch();
        navigate("/menusvalides");
      }
    } catch (error) {
      console.error("An error occurred while deleting menu:", error);
    }

    // axios.delete("http://localhost:5000/menu/" + menu._id);
    // console.log("DELETE MENU BDD");

    // dispatch(deleteListeMenu(menu._id));
  };

  // ***********************************************************
  // Clic sur le bouton Récupérer un ancien Menu Validé
  // ***********************************************************
  const handleRecupMenu = (menu) => {
    console.log("handleRecupMenu : " + menu.prefDayOne);
    // on indique qu'il ne faut pas changer la date des préférences
    // on indique qu'il ne faut pas recharger un menu aléatoire
    dispatch(setStopResetDate(true));
    dispatch(setStopReset(true));
    // Appel mise en phase des préférences dans le store
    // prefSelect / prefSelected
    handlePhasePref(menu);

    // Appel mise en phase des de la compo du Menu
    // dans le store : menuCompo / compoListe
    // Appel mise en phase des recettes du Menu
    // dans le store : menuRecipes / menuRecipesData
    handlePhaseMenuCompo(menu);

    // on indique qu'il ne faut pas recharger un menu aléatoire
    dispatch(setStopReset(true));
    navigate("/homemenu");
  };

  return (
    <div className="menusliste-card">
      <div className="menusliste-card-content">
        <div className="button-container">
          <h3>Semaine du {dayFormat}</h3>

          <div className="box-copy" onClick={() => handleRecupMenu(menu)}>
            <i className="fa-solid fa-folder-plus"></i>
          </div>
          <div className="box-basket" onClick={() => handleListeCourses(menu)}>
            <i className="fa-solid fa-basket-shopping"></i>
          </div>
          <div
            className="box-delete"
            onClick={() => handleDeleteMenuValide(menu)}
          >
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>

        <div className="days-liste">
          {menu.menuJ.map((dayMenu) => (
            <DayCard key={dayMenu[0]} dayMenu={dayMenu} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenusListeCard;
