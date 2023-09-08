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
  const selectedRecipes = useSelector(
    (state) => state.menuRecipes.menuRecipesData
  );
  let selectedRecipesId = selectedRecipes.map((recipe) => recipe._id);
  /////////////////////////////////////////////////////
  const handleChangeMeal = (meal, index, mealnb) => {
    console.log("handleChangeMeal");
    console.log("recette : " + meal.title);
    console.log("index dans compoListe : " + index);
    console.log("meal : " + mealnb);

    // sélection d'un nouveau repas aléatoire, différent de ceux déjà dans compoListe : newmeal
    let i = 0;
    let arrayW = [];
    while (arrayW.length < 1 && i < 900) {
      const randomIndex = Math.floor(Math.random() * liste.length);
      const randomRecipe = liste[randomIndex];
      console.log("selectedRecipesId");
      console.log(selectedRecipesId);
      if (!selectedRecipesId.includes(randomRecipe._id)) {
        console.log("Id à sélectionner : " + i + " / " + randomRecipe.title);
        arrayW.push(randomRecipe);
      } else {
        console.log("Id déja inclus : " + i + " / " + randomRecipe.title);
      }
      i++;
    }
    console.log("arrayW");
    console.log(arrayW);
    let newmeal = arrayW[0];
    console.log("oldmeal");
    console.log(meal);
    console.log("newmeal");
    console.log(newmeal);

    ////////////////////////////
    dispatch(editCompo([newmeal, index, mealnb]));
    dispatch(editMenuRecipe([newmeal, meal._id]));
  };

  ///////////////////////////////////////
  const handleDeleteMeal = (meal, index, mealnb) => {
    console.log("handleDeleteMeal");

    console.log("recette : " + meal.title);
    console.log("index dans compoListe : " + index);
    console.log("meal : " + mealnb);

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

    console.log("oldmeal");
    console.log(meal);
    console.log("emptymeal");
    console.log(emptyMeal);

    ////////////////////////////
    dispatch(editCompo([emptyMeal, index, mealnb]));
    dispatch(editMenuRecipe([emptyMeal, meal._id]));
  };

  //////////////////////////////////////////
  const handleDetailsMeal = (meal) => {
    console.log("handleDetailsMeal");
    console.log(meal);
    dispatch(setChecked(meal));
    dispatch(setStopReset(true));
    navigate("/pagedetailsrecipe");
  };

  //////////////////////////////////////
  // Mettre à jour la liste lorsque selectedRecipes change
  useEffect(() => {
    console.log("*** USEEFFECT MENUPREF ***");
    console.log("*** selectedRecipes a changé ***");
    console.log(selectedRecipes);
    console.log("*** on met à jour selectedRecipesId ***");
    console.log("**** AVANT ****");
    console.log(selectedRecipesId);
    selectedRecipesId = selectedRecipes.map((recipe) => recipe._id);
    console.log("**** APRES ****");
    console.log(selectedRecipesId);
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
