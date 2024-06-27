import React, { useEffect } from "react";
import RecipeMenuCard from "../components/RecipeMenuCard";
import { useDispatch, useSelector } from "react-redux";
import { setStopReset } from "../feature/indicstopreset.slice";
import { setStopResetDate } from "../feature/indicstopresetdate.slice";
import {
  deleteListeCourses,
  createListeCourses,
} from "../feature/listecourses.slice";

const ShoppingCardsList = () => {
  let arrayIngQttCat = [];
  let arrayW = [];
  let arrayW2 = [];
  let newIng = [];
  let newIngQtt = null;
  let arrayFruitsLeg = [];
  let arrayFrais = [];
  let arrayEpicerie = [];
  let arraySauvages = [];

  let newElementFL = {};
  let newElementFR = {};
  let newElementEP = {};
  let newElementSV = {};

  let ingRecap = "";
  let qttRecap = "";
  let catRecap = "";

  const dispatch = useDispatch();
  const menuRecipes = useSelector((state) => state.menuRecipes.menuRecipesData);
  const listeCourses = useSelector(
    (state) => state.listeCourses.listeCoursesData
  );

  //******************************** */
  // Constitution de tableaux récapitulatifs des ingrédients et quantités par catégorie
  //******************************** */
  // TABLEAU DES INGREDIENTS / QTT et CAT
  //******************************** */
  const handleArrayIngredients = () => {
    /////// Initialisation des indicateurs   ///////
    // on indique qu'il ne faut pas changer la date des préférences
    // on indique qu'il ne faut pas recharger un menu aléatoire
    dispatch(setStopResetDate(true));
    dispatch(setStopReset(true));
    // Pour chaque repas k du Menu de la semaine, récupérer les ingrédients, les quantités et catégories correspondantes
    arrayIngQttCat = [];
    for (let k = 0; k < menuRecipes.length && k < 5000; k++) {
      // Pour chaque ingrédient i du repas k, récupérer les infos
      for (let i = 0; i < menuRecipes[k].ingredients.length && i < 5000; i++) {
        // Recup des infos pour chaque index

        ingRecap = menuRecipes[k].ingredients[i];
        qttRecap = menuRecipes[k].quantities[i];
        catRecap = menuRecipes[k].categories[i];
        // Constitution du tableau Recap
        arrayIngQttCat = [...arrayIngQttCat, [ingRecap, qttRecap, catRecap]];

        if (i === 5000) {
          console.log("boucle i infinie");
          break;
        }
      }
      if (k === 5000) {
        console.log("boucle k infinie");
        break;
      }
    }
  };

  const handleListeCourses = () => {
    arrayFruitsLeg = [];
    arrayEpicerie = [];
    arrayFrais = [];
    arraySauvages = [];

    for (let i = 0; i < arrayIngQttCat.length && i < 5000; i++) {
      switch (arrayIngQttCat[i][2]) {
        case "Fruits/Légumes":
          arrayFruitsLeg = [
            ...arrayFruitsLeg,
            [arrayIngQttCat[i][0], parseFloat(arrayIngQttCat[i][1])],
          ];
          break;
        case "Frais":
          // Alimenter arrayFrais avec arrayIngQttCat[i][0] et arrayIngQttCat[i][1]
          arrayFrais = [
            ...arrayFrais,
            [arrayIngQttCat[i][0], parseFloat(arrayIngQttCat[i][1])],
          ];
          break;
        case "Epicerie":
          // Alimenter arrayEpicerie avec arrayIngQttCat[i][0] et arrayIngQttCat[i][1]
          arrayEpicerie = [
            ...arrayEpicerie,
            [arrayIngQttCat[i][0], parseFloat(arrayIngQttCat[i][1])],
          ];
          break;
        case "Sauvages":
          // Alimenter arraySauvages avec arrayIngQttCat[i][0] et arrayIngQttCat[i][1]
          arraySauvages = [
            ...arraySauvages,
            [arrayIngQttCat[i][0], parseFloat(arrayIngQttCat[i][1])],
          ];
          break;
        default:
          break;
      }

      if (i === 5000) {
        console.log("boucle i infinie");
      }
    }

    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&//
    /// Cumul des quantités pour les ingrédients identiques / catégorie
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&//
    //////////////////////////////////
    //**** Catégorie Fruits/Légumes */
    /////////////////////////////////

    arrayW = [];
    newIng = [];
    for (let k = 0; k < arrayFruitsLeg.length && k < 9000; k++) {
      if (k === 0) {
        newIng = arrayFruitsLeg[k];
        arrayW = [...arrayW, newIng];
      } else {
        // Pour chaque ingrédient de arrayFruitsLeg, on filtre ceux qui existent déjà, on cumule leur quantité à celle de l'ingrédient existant et on alimente arrayW avec des ingrédients uniques
        const ligne = arrayW.find((ligne) => ligne[0] === arrayFruitsLeg[k][0]);
        if (ligne) {
          // console.log("ligne avec ingrédient existant dans arrayW");
          // console.log(ligne);
          newIngQtt = ligne[1] + parseFloat(arrayFruitsLeg[k][1]);
          newIng = [ligne[0], newIngQtt];
          // On enlève l'élément existant dans arrayW pour ajouter l'ingrédient avec la nouvelle quantité cumulée

          arrayW2 = arrayW.filter((ligne) => ligne[0] !== arrayFruitsLeg[k][0]);
          arrayW = [...arrayW2, newIng];
        } else {
          newIng = [arrayFruitsLeg[k][0], arrayFruitsLeg[k][1]];
          arrayW = [...arrayW, newIng];
        }
      }

      if (k === 9000) {
        console.log("boucle k infinie");
      }
    }
    // On met à jour le tableau des ingrédients F/L
    arrayFruitsLeg = [...arrayW];

    newElementFL = {
      category: "Fruits/Légumes",
      ingredients: arrayFruitsLeg,
    };

    //////////////////////////////////
    //**** Catégorie Frais */
    //////////////////////////////////
    // console.log(" >>>>>>>>>>>  Cumul qtt Frais");
    arrayW = [];
    newIng = [];
    for (let k = 0; k < arrayFrais.length && k < 9000; k++) {
      if (k === 0) {
        newIng = arrayFrais[k];
        arrayW = [...arrayW, newIng];
      } else {
        // Pour chaque ingrédient de arrayFrais, on filtre ceux qui existent déjà, on cumule leur quantité à celle de l'ingrédient existant et on alimente arrayW avec des ingrédients uniques
        const ligne = arrayW.find((ligne) => ligne[0] === arrayFrais[k][0]);
        if (ligne) {
          newIngQtt = ligne[1] + parseFloat(arrayFrais[k][1]);
          newIng = [ligne[0], newIngQtt];
          // On enlève l'élément existant dans arrayW pour ajouter l'ingrédient avec la nouvelle quantité cumulée

          arrayW2 = arrayW.filter((ligne) => ligne[0] !== arrayFrais[k][0]);
          arrayW = [...arrayW2, newIng];
        } else {
          newIng = [arrayFrais[k][0], arrayFrais[k][1]];
          arrayW = [...arrayW, newIng];
        }
      }

      if (k === 9000) {
        console.log("boucle k infinie");
      }
    }
    // On met à jour le tableau des ingrédients F/L
    arrayFrais = [...arrayW];
    newElementFR = {
      category: "Frais",
      ingredients: arrayFrais,
    };

    //////////////////////////////////
    //**** Catégorie Epicerie */
    //////////////////////////////////
    arrayW = [];
    newIng = [];
    for (let k = 0; k < arrayEpicerie.length && k < 9000; k++) {
      if (k === 0) {
        newIng = arrayEpicerie[k];
        arrayW = [...arrayW, newIng];
      } else {
        // Pour chaque ingrédient de arrayEpicerie, on filtre ceux qui existent déjà, on cumule leur quantité à celle de l'ingrédient existant et on alimente arrayW avec des ingrédients uniques
        const ligne = arrayW.find((ligne) => ligne[0] === arrayEpicerie[k][0]);
        if (ligne) {
          newIngQtt = ligne[1] + parseFloat(arrayEpicerie[k][1]);
          newIng = [ligne[0], newIngQtt];
          // On enlève l'élément existant dans arrayW pour ajouter l'ingrédient avec la nouvelle quantité cumulée

          arrayW2 = arrayW.filter((ligne) => ligne[0] !== arrayEpicerie[k][0]);
          arrayW = [...arrayW2, newIng];
        } else {
          newIng = [arrayEpicerie[k][0], arrayEpicerie[k][1]];
          arrayW = [...arrayW, newIng];
        }
      }

      if (k === 9000) {
        console.log("boucle k infinie");
      }
    }
    // On met à jour le tableau des ingrédients F/L
    arrayEpicerie = [...arrayW];

    newElementEP = {
      category: "Epicerie",
      ingredients: arrayEpicerie,
    };

    //////////////////////////////////
    //**** Catégorie Sauvages */
    //////////////////////////////////
    arrayW = [];
    newIng = [];
    for (let k = 0; k < arraySauvages.length && k < 9000; k++) {
      if (k === 0) {
        newIng = arraySauvages[k];
        arrayW = [...arrayW, newIng];
      } else {
        // Pour chaque ingrédient de arraySauvages, on filtre ceux qui existent déjà, on cumule leur quantité à celle de l'ingrédient existant et on alimente arrayW avec des ingrédients uniques
        const ligne = arrayW.find((ligne) => ligne[0] === arraySauvages[k][0]);
        if (ligne) {
          newIngQtt = ligne[1] + parseFloat(arraySauvages[k][1]);
          newIng = [ligne[0], newIngQtt];
          // On enlève l'élément existant dans arrayW pour ajouter l'ingrédient avec la nouvelle quantité cumulée

          arrayW2 = arrayW.filter((ligne) => ligne[0] !== arraySauvages[k][0]);
          arrayW = [...arrayW2, newIng];
        } else {
          newIng = [arraySauvages[k][0], arraySauvages[k][1]];
          arrayW = [...arrayW, newIng];
        }
      }

      if (k === 9000) {
        console.log("boucle k infinie");
      }
    }
    // On met à jour le tableau des ingrédients F/L
    arraySauvages = [...arrayW];

    newElementSV = {
      category: "Sauvages",
      ingredients: arraySauvages,
    };

    ////////////////////////////////////////////////////////////
    //**** DISPATCH des ingrédients de la liste par catégorie */
    ////////////////////////////////////////////////////////////
    dispatch(deleteListeCourses());
    dispatch(
      createListeCourses([
        newElementFL,
        newElementFR,
        newElementEP,
        newElementSV,
      ])
    );
  };
  ////////////////////////////////////////////////////
  useEffect(() => {
    // console.log("***************** useEffect ShoppingCardList **************");
    handleArrayIngredients();
    handleListeCourses();
  }, []);

  ///////////////////////////////////////////////////////
  return (
    <div className="recipesmenucards-liste">
      {listeCourses &&
        listeCourses
          .slice()

          .map((element) => (
            <RecipeMenuCard key={element.category} element={element} />
          ))}
    </div>
  );
};

export default ShoppingCardsList;
