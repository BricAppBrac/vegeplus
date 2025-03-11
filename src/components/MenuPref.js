import React, { useEffect } from "react";
import MenuCard from "../components/MenuCard";
import { useDispatch, useSelector } from "react-redux";
import { setChecked } from "../feature/checked.slice";
import { useNavigate } from "react-router-dom";
import { editCompo } from "../feature/menucompo.slice";
import { editMenuRecipe } from "../feature/menurecipes.slice";
import { setStopReset } from "../feature/indicstopreset.slice";
import { faHourglass2 } from "@fortawesome/free-solid-svg-icons";

const MenuPref = () => {
  const compoListeMenu = useSelector((state) => state.menuCompo.compoListe);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const liste = useSelector((state) => state.listeRecipes.listeData);
  const prefSelected = useSelector((state) => state.prefSelect.prefSelected);
  const selectedRecipes = useSelector(
    (state) => state.menuRecipes.menuRecipesData
  );
  let selectedRecipesId = selectedRecipes.map((recipe) => recipe._id);
  /////////////////////////////
  //******************************************************************
  // Sélection d'un nouveau repas selon saison'
  // MODIF 20240628 : choisir une recette dont la saison
  // contient prefSelected[2]
  // sachant que
  // si    01/04 <= prefSelected[2] <= 30/06  alors season = printemps
  // si    01/07 <= prefSelected[2] <= 30/09  alors season = été
  // si    01/10 <= prefSelected[2] <= 31/12  alors season = automne
  // si    01/01 <= prefSelected[2] <= 31/03  alors season = hiver

  // Function to determine the season based on a given date
  // MODIF 20240628
  const getSeason = (date) => {
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const day = date.getDate();

    if ((month === 4 && day >= 1) || (month === 6 && day <= 30)) {
      return "printemps";
    } else if ((month === 7 && day >= 1) || (month >= 8 && month <= 9)) {
      return "été";
    } else if ((month === 10 && day >= 1) || (month === 12 && day <= 31)) {
      return "automne";
    } else {
      return "hiver";
    }
  };

  /////////////////////////////////////////////////////
  const handleChangeMeal = (meal, index, mealnb) => {
    // console.log("handleChangeMeal");
    // console.log("recette : " + meal.title);
    // console.log("index dans compoListe : " + index);
    // console.log("meal : " + mealnb);
    // MODIF 20240625

    // Si la date n'est pas définie, utiliser la date du jour
    const mealDate = prefSelected[2] ? new Date(prefSelected[2]) : new Date();
    const season = getSeason(mealDate);
    const filteredRecipes = liste.filter((recipe) => {
      return recipe.seasons.includes(season);
    });
    // sélection d'un nouveau repas aléatoire, différent de ceux déjà dans compoListe : newmeal
    let i = 0;
    let arrayW = [];
    while (arrayW.length < 1 && i < 900) {
      const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
      const randomRecipe = filteredRecipes[randomIndex];
      // console.log("selectedRecipesId");
      // console.log(selectedRecipesId);
      if (!selectedRecipesId.includes(randomRecipe._id)) {
        // console.log("Id à sélectionner : " + i + " / " + randomRecipe.title);
        arrayW.push(randomRecipe);
      }
      // else {
      //   console.log("Id déja inclus : " + i + " / " + randomRecipe.title);
      // }
      i++;
    }
    // console.log("arrayW");
    // console.log(arrayW);
    let newmeal = arrayW[0];
    // console.log("oldmeal");
    // console.log(meal);
    // console.log("newmeal");
    // console.log(newmeal);

    ////////////////////////////
    dispatch(editCompo([newmeal, index, mealnb]));
    dispatch(editMenuRecipe([newmeal, meal._id]));
  };

  const handleChooseMeal = (chosenmeal, index, mealnb) => {
    console.log("handleChooseMeal");
    console.log("recette choisie: " + chosenmeal.title);

    ////////////////////////////
    dispatch(editCompo([chosenmeal, index, mealnb]));
    dispatch(editMenuRecipe([chosenmeal, chosenmeal._id]));
  };

  ///////////////////////////////////////
  const handleDeleteMeal = (meal, index, mealnb) => {
    // console.log("handleDeleteMeal");

    // console.log("recette : " + meal.title);
    // console.log("index dans compoListe : " + index);
    // console.log("meal : " + mealnb);

    // Remplacement du repas supprimé par un repas non prévu

    const emptyMeal = {
      title: "repas non prévu",
      author: "Melissande",
      seasons: [],
      ingredients: [],
      quantities: [],
      categories: [],
      steps: [],
      _id: Date.now(),
    };

    // console.log("oldmeal");
    // console.log(meal);
    // console.log("emptymeal");
    // console.log(emptyMeal);

    ////////////////////////////
    dispatch(editCompo([emptyMeal, index, mealnb]));
    dispatch(editMenuRecipe([emptyMeal, meal._id]));
  };

  //////////////////////////////////////////
  const handleDetailsMeal = (meal) => {
    // console.log("handleDetailsMeal");
    // console.log(meal);
    dispatch(setChecked(meal));
    dispatch(setStopReset(true));
    navigate("/pagedetailsrecipe");
  };

  //////////////////////////////////////
  // Mettre à jour la liste lorsque selectedRecipes change
  useEffect(() => {
    selectedRecipesId = selectedRecipes.map((recipe) => recipe._id);
  }, [selectedRecipes]);

  ////////////////////////////////////

  let content;

  // if (compoListeMenu === [] || compoListeMenu.length === 0) {
  //   // content = <h3>Erreur Accès direct interdit</h3>;
  //   content = <h3>compo Liste Menu du store vide</h3>;
  // } else {
  content = (
    <div className="compo-container">
      <div className="dayscards-liste">
        {compoListeMenu &&
          compoListeMenu
            .slice()
            .map((compo) => (
              <MenuCard
                key={compo.index}
                compo={compo}
                handleChangeMeal={handleChangeMeal}
                handleChooseMeal={handleChooseMeal}
                handleDeleteMeal={handleDeleteMeal}
                handleDetailsMeal={handleDetailsMeal}
              />
            ))}
      </div>
    </div>
  );
  // }
  return content;
};

export default MenuPref;
