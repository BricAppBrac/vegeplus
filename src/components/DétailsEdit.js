import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import IngredientCardEdit from "./IngredientCardEdit";
import { createRecipe } from "../feature/recipe.slice";
import { NavLink, useNavigate } from "react-router-dom";
import { setChecked } from "../feature/checked.slice";
import {
  useUpdateRecipeMutation,
  useGetRecipesQuery,
} from "../feature/recipes/recipesApiSlice";

const DétailsEdit = () => {
  const [displayEdit] = useState(true);
  const [messageEdit, setMessageEdit] = useState(
    "Effectuer les modifications et valider"
  );

  const [displayIngredients] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ]);

  const [displaySteps] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ]);

  // Valeurs initiales de la recette
  const checkedRecipe = useSelector((state) => state.checkedRec.checkedRecipe);

  const newRecipeData = useSelector((state) => state.newRecipe.recipeData);

  const { refetch } = useGetRecipesQuery();
  const [updateRecipeMutation] = useUpdateRecipeMutation();

  // let arrayIdTrio = newRecipeData.ingredients.length;
  // let arrayId = checkedRecipe.ingredients.length;

  const dispatch = useDispatch();

  let validate = false;

  let arrayNew = [];
  let arrayW = [];
  let arrayNewIngredients = newRecipeData.ingredients;
  let arrayNewQuantities = newRecipeData.quantities;
  let arrayNewCategories = newRecipeData.categories;
  let arrayNewSteps = newRecipeData.steps;

  let arrayNewIngredientsStockage = [];
  let arrayNewQuantitiesStockage = [];
  let arrayNewCategoriesStockage = [];

  let data = {};
  let newData = {};

  const navigate = useNavigate();

  const handleUpdateRecipe = async (data) => {
    console.log("data pour update");
    console.log(data);
    try {
      const response = await updateRecipeMutation(data);

      if (response.error) {
        console.error("Failed to update recipe:", response.error);
      } else {
        console.log("Successfully updated recipe");
        // Après une mise à jour réussie, appeler refetch()
        refetch();
      }
    } catch (error) {
      console.error("An error occurred while updating recipe:", error);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Gestion des inputs
  ////////////////////////////////////////////////////
  /////////////////////////////
  // Stockage du titre
  /////////////////////////////
  const handleTitle = (updateTitle) => {
    //--------------------------------------
    // setEditTitle(updateTitle);
    console.log("handleTitle : " + updateTitle);

    data = {
      title: newRecipeData.title,
      author: "Melissande",
      seasons: newRecipeData.seasons,
      ingredients: newRecipeData.ingredients,
      quantities: newRecipeData.quantities,
      categories: newRecipeData.categories,
      steps: newRecipeData.steps,
      _id: newRecipeData._id,
    };

    console.log("data avant");
    console.log(data);
    data.title = updateTitle;
    console.log("data après");
    console.log(data);

    // dispatch(editNewRecipe(data));
    // console.log("après dispatch editNewRecipe");
    dispatch(createRecipe(data));
    console.log("après dispatch createRecipe");
  };
  ////////////////////////////
  // Stockage des saisons
  ///////////////////////
  const handleSeasons = (newSeas) => {
    //-------------------------------------
    data = {
      title: newRecipeData.title,
      author: "Melissande",
      seasons: newRecipeData.seasons,
      ingredients: newRecipeData.ingredients,
      quantities: newRecipeData.quantities,
      categories: newRecipeData.categories,
      steps: newRecipeData.steps,
      _id: newRecipeData._id,
    };
    if (document.getElementById(newSeas).checked === true) {
      console.log("checked");
      // arrayNew = editSeasons;
      arrayW = [];
      arrayNew = data.seasons;
      arrayW.push(newSeas);
      arrayNew = [...arrayNew, ...arrayW];
    } else {
      console.log("décochée");
      // arrayW = editSeasons;
      arrayW = data.seasons;
      arrayNew = arrayW.filter(function (element) {
        return element !== newSeas;
      });
    }
    console.log("Seasons array");
    console.log(arrayNew);
    // setEditSeasons(arrayNew);
    data.seasons = [...arrayNew];
    console.log("data handleSeasons");
    console.log(data);
    // dispatch(editNewRecipe(data));
    // console.log("après dispatch editNewRecipe");
    dispatch(createRecipe(data));
    console.log("après dispatch createRecipe");
    // arrayNew = [];
    // arrayW = [];
  };
  /////////////////////////////
  // Stockage des ingrédients
  /////////////////////////////
  const handleIngredients = (newVal, ingId) => {
    //--------------------------------------
    console.log("appel handleIngredients");
    console.log("newVal Ingrédient :" + newVal);
    console.log("ingId :" + ingId);
    console.log(
      "newRecipeData.ingredients.length : " + newRecipeData.ingredients.length
    );

    data = {
      title: newRecipeData.title,
      author: "Melissande",
      seasons: newRecipeData.seasons,
      ingredients: newRecipeData.ingredients,
      quantities: newRecipeData.quantities,
      categories: newRecipeData.categories,
      steps: newRecipeData.steps,
      _id: newRecipeData._id,
    };

    console.log("data début *************************");
    console.log(data);

    arrayNewIngredients = [...data.ingredients];
    arrayNewQuantities = [...data.quantities];
    arrayNewCategories = [...data.categories];

    // Gestion des lignes blanches : si ingId est > array.length, alimenter par du blanc

    if (ingId > newRecipeData.ingredients.length) {
      console.log("ingId > newRecipeData.ingredients.length");
      for (let i = newRecipeData.ingredients.length; i < ingId; i++) {
        arrayW = [];

        arrayW.push("");

        arrayNewIngredients = [...arrayNewIngredients, ...arrayW];
        arrayNewQuantities = [...arrayNewQuantities, ...arrayW];
        arrayNewCategories = [...arrayNewCategories, ...arrayW];

        newData = {
          ...data,
          ingredients: arrayNewIngredients,
          quantities: arrayNewQuantities,
          categories: arrayNewCategories,
        };
        data = newData;

        dispatch(createRecipe(data));
        console.log("après dispatch createRecipe ligne vide : " + i);
      }
    }
    console.log(data);
    console.log("arrayNew :");
    console.log(arrayNewIngredients);
    console.log(arrayNewQuantities);
    console.log(arrayNewCategories);
    // Si cette ligne de la recette sélectionnée était déjà renseignée, on remplace la zone concernée
    if (
      checkedRecipe.ingredients[ingId] ||
      checkedRecipe.quantities[ingId] ||
      checkedRecipe.categories[ingId]
    ) {
      console.log("handleIngredients - ligne existante à maj");
      arrayW = arrayNewIngredients.splice(ingId, 1, newVal);
    }
    // Si cette ligne n'était pas renseignée dans la recette sélectionnée
    else {
      // Si c'est le premier caractère

      if (
        !data.ingredients[ingId] &&
        !data.quantities[ingId] &&
        !data.categories[ingId]
      ) {
        console.log("handleIngredients - nouveau trio - premier caractère");
        arrayW = [];
        arrayW.push(newVal);
        arrayNewIngredients = [...arrayNewIngredients, ...arrayW];

        // Initialisation des 2 autres zones liées
        arrayW = [];
        arrayW.push("");
        arrayNewQuantities = [...arrayNewQuantities, ...arrayW];
        arrayNewCategories = [...arrayNewCategories, ...arrayW];

        data = {
          ...data,
          quantities: arrayNewQuantities,
          categories: arrayNewCategories,
        };
      }
      // caractères suivants
      else {
        arrayW = [];
        console.log("handleIngredients - nouveau trio - caractères suivants");
        arrayW = arrayNewIngredients.splice(ingId, 1, newVal);
      }
    }
    console.log("arrayNewIngredients");
    console.log(arrayNewIngredients);
    data.ingredients = arrayNewIngredients;

    console.log("data après splice/push handleIngredients");

    console.log(data);

    dispatch(createRecipe(data));
    console.log("après dispatch createRecipe");
    // }

    ////////////////////////////////////////////////////////////////////////
    // Contrôle du trio Ing / Qtt / Cat
    ////////////////////////////////////////////////////////////////////////
    if (
      !data.ingredients[ingId] &&
      !data.quantities[ingId] &&
      !data.categories[ingId]
    ) {
      setMessageEdit("Ligne effacée, valider pour confirmer");
      arrayW = arrayNewIngredients.filter(function (element, index) {
        return index !== ingId;
      });
      newData = { ...data, ingredients: arrayW };
      data = newData;

      arrayW = arrayNewQuantities.filter(function (element, index) {
        return index !== ingId;
      });
      newData = { ...data, quantities: arrayW };
      data = newData;

      arrayW = arrayNewCategories.filter(function (element, index) {
        return index !== ingId;
      });
      newData = { ...data, categories: arrayW };
      data = newData;
      // dispatch(editNewRecipe(data));
      // console.log("après dispatch editNewRecipe");
      dispatch(createRecipe(data));
      console.log("après dispatch createRecipe");
      validate = true;
      handleValidationOpen(ingId);
      console.log(
        "data après handleValidationOpen avec 3 zones trio à blanc - handleIngredients"
      );
      console.log(data);
    } else if (
      !data.ingredients[ingId] ||
      !data.quantities[ingId] ||
      !data.categories[ingId]
    ) {
      setMessageEdit("Saisir un ingrédient, une quantité et une catégorie");
      validate = false;
      handleValidationOpen(ingId);
      console.log(
        "data après handleValidationOpen avec zone trio à blanc - handleIngredients"
      );
      console.log(data);
    } else {
      setMessageEdit("Effectuer les modifications et valider");
      validate = true;
      handleValidationOpen(ingId);
      console.log(
        "data après handleValidationOpen zones trio renseignées - handleIngredients"
      );
      console.log(data);
    }
    ////////////////////////////////////////////////
    // Contrôle du trio pour toutes les autres lignes
    ////////////////////////////////////////////////
    handleTrioFinal();
    console.log("data après handleTrioFinal");
    console.log(data);
  };
  /////////////////////////////
  // Stockage des quantités
  /////////////////////////////
  const handleQuantities = (
    newQtt,
    qttId,
    editIngredientRef,
    editQuantityRef,
    editCategoryRef
  ) => {
    //--------------------------------------
    console.log("appel handleQuantities :");
    console.log("newQtt : " + newQtt);
    console.log("qttId :" + qttId);

    data = {
      title: newRecipeData.title,
      author: "Melissande",
      seasons: newRecipeData.seasons,
      ingredients: newRecipeData.ingredients,
      quantities: newRecipeData.quantities,
      categories: newRecipeData.categories,
      steps: newRecipeData.steps,
      _id: newRecipeData._id,
    };

    console.log("data début *************************");
    console.log(data);
    arrayNewIngredients = [...data.ingredients];
    arrayNewQuantities = [...data.quantities];
    arrayNewCategories = [...data.categories];

    // Gestion des lignes blanches : si qttId est > array.length, alimenter par du blanc

    if (qttId > newRecipeData.quantities.length) {
      console.log("qttId > newRecipeData.quantities.length");
      for (let i = newRecipeData.quantities.length; i < qttId; i++) {
        arrayW = [];
        arrayW.push("");

        arrayNewIngredients = [...arrayNewIngredients, ...arrayW];
        arrayNewQuantities = [...arrayNewQuantities, ...arrayW];
        arrayNewCategories = [...arrayNewCategories, ...arrayW];

        newData = {
          ...data,
          ingredients: arrayNewIngredients,
          quantities: arrayNewQuantities,
          categories: arrayNewCategories,
        };
        data = newData;
        dispatch(createRecipe(data));
        console.log("après dispatch createRecipe ligne vide : " + i);
      }
    }
    console.log(data);
    console.log("arrayNew :");
    console.log(arrayNewIngredients);
    console.log(arrayNewQuantities);
    console.log(arrayNewCategories);
    // Si cette ligne de la recette sélectionnée était déjà renseignée, on remplace la zone concernée
    if (
      checkedRecipe.ingredients[qttId] ||
      checkedRecipe.quantities[qttId] ||
      checkedRecipe.categories[qttId]
    ) {
      console.log("handleQuantities - ligne existante à maj");
      arrayW = arrayNewQuantities.splice(qttId, 1, newQtt);
    }

    // Si cette ligne n'était pas renseignée dans la recette sélectionnée
    else {
      // Si c'est le premier caractère
      if (
        !data.quantities[qttId] &&
        !data.ingredients[qttId] &&
        !data.categories[qttId]
      ) {
        console.log("handleQuantities - nouveau trio - premier caractère");

        arrayW = [];
        arrayW.push(newQtt);
        arrayNewQuantities = [...arrayNewQuantities, ...arrayW];

        // Initialisation des 2 autres zones liées
        arrayW = [];
        arrayW.push("");
        arrayNewIngredients = [...arrayNewIngredients, ...arrayW];
        arrayNewCategories = [...arrayNewCategories, ...arrayW];

        data = {
          ...data,
          ingredients: arrayNewIngredients,
          categories: arrayNewCategories,
        };
      }
      // caractères suivants
      else {
        arrayW = [];
        console.log("handleQuantities - nouveau trio - caractères suivants");
        arrayW = arrayNewQuantities.splice(qttId, 1, newQtt);
      }
    }
    console.log("arrayNewQuantities");
    console.log(arrayNewQuantities);
    data.quantities = arrayNewQuantities;

    console.log("data après splice/push handleQuantities");
    console.log(data);
    dispatch(createRecipe(data));
    console.log("après dispatch createRecipe");

    //////////////////////////////////////////////////////
    // Contrôle du trio Ing / Qtt / Cat
    //////////////////////////////////////////////////////
    if (
      !data.ingredients[qttId] &&
      !data.quantities[qttId] &&
      !data.categories[qttId]
    ) {
      setMessageEdit("Ligne effacée, valider pour confirmer");
      validate = true;
      arrayW = arrayNewIngredients.filter(function (element, index) {
        return index !== qttId;
      });
      newData = { ...data, ingredients: arrayW };
      data = newData;

      arrayW = arrayNewQuantities.filter(function (element, index) {
        return index !== qttId;
      });
      newData = { ...data, quantities: arrayW };
      data = newData;

      arrayW = arrayNewCategories.filter(function (element, index) {
        return index !== qttId;
      });
      newData = { ...data, categories: arrayW };
      data = newData;
      // dispatch(editNewRecipe(data));
      // console.log("après dispatch editNewRecipe");
      dispatch(createRecipe(data));
      console.log("après dispatch createRecipe");
      validate = true;
      handleValidationOpen(qttId);
      console.log(
        "data après handleValidationOpen avec 3 zones trio à blanc - handleQuantities"
      );
      console.log(data);
    } else if (
      !data.ingredients[qttId] ||
      !data.quantities[qttId] ||
      !data.categories[qttId]
    ) {
      setMessageEdit("Saisir un ingrédient, une quantité et une catégorie");
      validate = false;
      handleValidationOpen(qttId);
      console.log(
        "data après handleValidationOpen avec zone trio à blanc - handleQuantities"
      );
      console.log(data);
    } else {
      setMessageEdit("Effectuer les modifications et valider");
      validate = true;
      handleValidationOpen(qttId);
      console.log(
        "data après handleValidationOpen zones trio renseignées - handleQuantities"
      );
      console.log(data);
      ////////////////////////////////////////////////
      // Contrôle du trio pour toutes les autres lignes
      ////////////////////////////////////////////////
      handleTrioFinal();
      console.log("data après handleTrioFinal");
      console.log(data);
    }
  };
  /////////////////////////////
  // Stockage des catégories
  /////////////////////////////
  const handleCategories = (newCat, catId) => {
    //--------------------------------------
    console.log("appel handleCategories");
    console.log("newCat Catégorie :" + newCat);
    console.log("catId :" + catId);

    data = {
      title: newRecipeData.title,
      author: "Melissande",
      seasons: newRecipeData.seasons,
      ingredients: newRecipeData.ingredients,
      quantities: newRecipeData.quantities,
      categories: newRecipeData.categories,
      steps: newRecipeData.steps,
      _id: newRecipeData._id,
    };

    console.log("data début *************************");
    console.log(data);

    arrayNewCategories = [...data.categories];
    arrayNewQuantities = [...data.quantities];
    arrayNewIngredients = [...data.ingredients];

    // Gestion des lignes blanches : si catId est > array.length, alimenter par du blanc

    if (catId > newRecipeData.categories.length) {
      console.log("catId > newRecipeData.categories.length");
      for (let i = newRecipeData.categories.length; i < catId; i++) {
        arrayW = [];
        arrayW.push("");

        arrayNewIngredients = [...arrayNewIngredients, ...arrayW];
        arrayNewQuantities = [...arrayNewQuantities, ...arrayW];
        arrayNewCategories = [...arrayNewCategories, ...arrayW];

        newData = {
          ...data,
          ingredients: arrayNewIngredients,
          quantities: arrayNewQuantities,
          categories: arrayNewCategories,
        };
        data = newData;
        dispatch(createRecipe(data));
        console.log("après dispatch createRecipe ligne vide : " + i);
      }
    }
    console.log(data);

    console.log("arrayNew :");
    console.log(arrayNewIngredients);
    console.log(arrayNewQuantities);
    console.log(arrayNewCategories);
    // Si cette ligne de la recette sélectionnée était déjà renseignée, on remplace la zone concernée
    if (
      checkedRecipe.ingredients[catId] ||
      checkedRecipe.quantities[catId] ||
      checkedRecipe.categories[catId]
    ) {
      console.log("handleCategories - ligne existante à maj");
      arrayW = arrayNewCategories.splice(catId, 1, newCat);
    }

    // Si cette ligne n'était pas renseignée dans la recette sélectionnée
    else {
      // Si c'est le premier caractère
      if (
        !data.quantities[catId] &&
        !data.ingredients[catId] &&
        !data.categories[catId]
      ) {
        console.log("handleCategories - nouveau trio - premier caractère");

        arrayW = [];
        arrayW.push(newCat);
        arrayNewCategories = [...arrayNewCategories, ...arrayW];

        // Initialisation des 2 autres zones liées
        arrayW = [];
        arrayW.push("");
        arrayNewIngredients = [...arrayNewIngredients, ...arrayW];
        arrayNewQuantities = [...arrayNewQuantities, ...arrayW];

        data.ingredients = arrayNewIngredients;
        data.quantities = arrayNewQuantities;

        data = {
          ...data,
          ingredients: arrayNewIngredients,
          quantities: arrayNewQuantities,
        };
      }
      // caractères suivants
      else {
        arrayW = [];
        console.log("handleCategories - nouveau trio - caractères suivants");
        arrayW = arrayNewCategories.splice(catId, 1, newCat);
      }
    }
    console.log("arrayNewCategories");
    console.log(arrayNewCategories);
    data.categories = arrayNewCategories;

    console.log("data après splice/push handleCategories");
    console.log(data);
    dispatch(createRecipe(data));
    console.log("après dispatch createRecipe");

    ////////////////////////////////////////////////
    // Contrôle du trio Ing / Qtt / Cat
    ////////////////////////////////////////////////
    if (
      !data.ingredients[catId] &&
      !data.quantities[catId] &&
      !data.categories[catId]
    ) {
      setMessageEdit("Ligne effacée, valider pour confirmer");
      console.log("arrayNewIngredients : &&&&");
      console.log(arrayNewIngredients);
      validate = true;

      arrayW = arrayNewIngredients.filter(function (element, index) {
        return index !== catId;
      });
      newData = { ...data, ingredients: arrayW };
      data = newData;

      arrayW = arrayNewQuantities.filter(function (element, index) {
        return index !== catId;
      });
      newData = { ...data, quantities: arrayW };
      data = newData;

      arrayW = arrayNewCategories.filter(function (element, index) {
        return index !== catId;
      });
      newData = { ...data, categories: arrayW };
      data = newData;

      // dispatch(editNewRecipe(data));
      // console.log("après dispatch editNewRecipe");
      dispatch(createRecipe(data));
      console.log("après dispatch createRecipe");
      validate = true;
      handleValidationOpen(catId);
      console.log(
        "data après handleValidationOpen avec 3 zones trio à blanc - handleCategories"
      );
      console.log(data);
    } else if (
      !data.ingredients[catId] ||
      !data.quantities[catId] ||
      !data.categories[catId]
    ) {
      setMessageEdit("Saisir un ingrédient, une quantité et une catégorie");
      validate = false;
      handleValidationOpen(catId);
      console.log(
        "data après handleValidationOpen avec zone trio à blanc - handleCategories"
      );
      console.log(data);
    } else {
      setMessageEdit("Effectuer les modifications et valider");
      validate = true;
      handleValidationOpen(catId);
      console.log(
        "data après handleValidationOpen zones trio renseignées - handleCategories"
      );
      console.log(data);
      ////////////////////////////////////////////////
      // Contrôle du trio pour toutes les autres lignes
      ////////////////////////////////////////////////
      handleTrioFinal();
      console.log("data après handleTrioFinal");
      console.log(data);
    }

    // arrayW = [];
    // arrayNewIngredients = [];
    // arrayNewQuantities = [];
    // arrayNewCategories = [];
  };
  /////////////////////////////
  // Stockage des étapes
  /////////////////////////////
  const handleSteps = (newStp, stpId) => {
    //--------------------------------------
    console.log("appel handleSteps");
    console.log("newStp Etape : " + newStp);
    console.log("stpId : " + stpId);
    console.log("newRecipeData.steps.length : " + newRecipeData.steps.length);
    data = {
      title: newRecipeData.title,
      author: "Melissande",
      seasons: newRecipeData.seasons,
      ingredients: newRecipeData.ingredients,
      quantities: newRecipeData.quantities,
      categories: newRecipeData.categories,
      steps: newRecipeData.steps,
      _id: newRecipeData._id,
    };

    arrayNew = [...data.steps];
    console.log("arrayNew steps avant lignes blanches");
    console.log(arrayNew);

    // Gestion des lignes blanches : si stpId est > array.length, alimenter par du blanc

    if (stpId > newRecipeData.steps.length) {
      console.log("stpId > newRecipeData.steps.length");
      for (let i = newRecipeData.steps.length; i < stpId; i++) {
        arrayW = [];

        arrayW.push("");
        arrayNew = [...arrayNew, ...arrayW];

        newData = { ...data, steps: arrayNew };
        data = newData;

        dispatch(createRecipe(data));
        console.log("après dispatch createRecipe ligne vide : " + i);
      }
    }
    console.log(data);

    // Si cette ligne de la recette sélectionnée était déjà renseignée, on remplace la zone concernée
    if (checkedRecipe.steps[stpId]) {
      console.log("arrayNew");
      console.log(arrayNew);
      arrayW = arrayNew.splice(stpId, 1, newStp);
      console.log("arrayW");
      console.log(arrayW);
    } else {
      //Si c'est le premier caractère

      if (!data.steps[stpId]) {
        // if (!newRecipeData.steps[stpId]) {
        console.log("handleSteps - 1er caractère");
        arrayW = [];
        arrayW.push(newStp);
        arrayNew = [...arrayNew, ...arrayW];
        console.log("arrayNew");
        console.log(arrayNew);
      }
      // caractères suivants
      else {
        console.log("handleSteps - caractères suivants");
        arrayW = arrayNew.splice(stpId, 1, newStp);
        console.log("arrayNew");
        console.log(arrayNew);
      }
    }

    newData = { ...data, steps: arrayNew };
    data = newData;
    console.log("data après splice/push handleSteps");
    console.log(data);
    dispatch(createRecipe(data));
    console.log("après dispatch createRecipe");

    // arrayW = [];
    // arrayNew = [];
  };

  ////////////////////////////////////
  const handleValidationOpen = (indexRef) => {
    return new Promise((resolve, reject) => {
      console.log("handleValidationOpen");
      console.log("validate : " + validate);
      if (validate) {
        document.getElementById("form-validation").disabled = false;
        document.getElementById(
          "editIngrédient" + indexRef
        ).style.backgroundColor = "whitesmoke";
        document.getElementById("editIngrédient" + indexRef).style.color =
          "rgb(37, 21, 11)";
        document.getElementById(
          "editQuantity" + indexRef
        ).style.backgroundColor = "whitesmoke";
        document.getElementById("editQuantity" + indexRef).style.color =
          "rgb(37, 21, 11)";
        document.getElementById("category" + indexRef).style.backgroundColor =
          "whitesmoke";
        document.getElementById("category" + indexRef).style.color =
          "rgb(37, 21, 11)";
        console.log("back white : " + indexRef);
        resolve(); // la promesse est résolue si la validation est correcte
      } else {
        document.getElementById("form-validation").disabled = "disabled";
        document.getElementById(
          "editIngrédient" + indexRef
        ).style.backgroundColor = "#d65630";
        document.getElementById("editIngrédient" + indexRef).style.color =
          "rgb(206, 228, 187)";
        document.getElementById(
          "editQuantity" + indexRef
        ).style.backgroundColor = "#d65630";
        document.getElementById("editQuantity" + indexRef).style.color =
          "rgb(206, 228, 187)";
        document.getElementById("category" + indexRef).style.backgroundColor =
          "#d65630";
        document.getElementById("category" + indexRef).style.color =
          "rgb(206, 228, 187)";
        console.log("back orange : " + indexRef);
        resolve(); // la promesse est résolue si la validation est correcte
        // reject(new Error("Validation failed")); // la promesse est rejetée si la validation a échoué
      }
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  // Contrôle du Trio Ingrédient / Quantité / Catégorie pour toutes les lignes avant validation
  /////////////////////////////////////////////////////////////////////////////////////////////
  function handleTrioFinal() {
    console.log("handleTrioFinal");
    console.log("data");
    console.log(data);
    validate = true;

    //////////////////////////////////////////////
    for (let i = 0; i < 20; i++) {
      if (!data.ingredients[i] && !data.quantities[i] && !data.categories[i]) {
        if (i < data.ingredients.length) {
          console.log("ligne à supprimer : " + i);
        } else {
          console.log("ligne vide : " + i);
          // ligne renseignée : stockage
          // console.log("stockage ligne complète trio");
          // arrayNewIngredientsStockage.push(data.ingredients[i]);
          // arrayNewQuantitiesStockage.push(data.quantities[i]);
          // arrayNewCategoriesStockage.push(data.categories[i]);
        }
      } else {
        validate = true;
        // ligne renseignée : stockage
        // console.log("stockage ligne complète trio");
        // arrayNewIngredientsStockage.push(data.ingredients[i]);
        // arrayNewQuantitiesStockage.push(data.quantities[i]);
        // arrayNewCategoriesStockage.push(data.categories[i]);
        // Cas Ingrédient non renseigné, et l'un des 2 autres renseigné
        if (!data.ingredients[i]) {
          console.log("ingrédient non renseigné : " + i);
          setMessageEdit(
            "*Saisir un ingrédient, une quantité et une catégorie"
          );
          validate = false;
          handleValidationOpen(i);

          break; // arrête la boucle si un ingrédient n'a pas de quantité ou de catégorie
        }
        // Cas Quantité non renseignée, et l'un des 2 autres renseigné
        if (!data.quantities[i]) {
          console.log("quantité non renseignée: " + i);
          setMessageEdit(
            "**Saisir un ingrédient, une quantité et une catégorie"
          );

          validate = false;
          handleValidationOpen(i);
          break;
        }
        // Cas Catégorie non renseignée, et l'un des 2 autres renseigné
        if (!data.categories[i]) {
          console.log("catégorie non renseignée: " + i);
          setMessageEdit(
            "***Saisir un ingrédient, une quantité et une catégorie"
          );
          validate = false;
          handleValidationOpen(i);
          break;
        }
      }
    }
    // Cas des 3 zones renseignées, on alimente le tableau qui ne prend pas les lignes blanches en compte

    //////////////////////////////////////////
    // Cas toutes les zones sont renseignées
    //////////////////////////////////////////
    if (validate) {
      console.log("toutes les lignes sont renseignées correctement");
      setMessageEdit("Effectuer les modifications et valider");
      console.log("mise à blanc de toutes les zones");
      // console.log("array Stockage");
      // console.log(arrayNewIngredientsStockage);
      // console.log(arrayNewQuantitiesStockage);
      // console.log(arrayNewCategoriesStockage);

      // newData = {
      //   ...data,
      //   ingredients: arrayNewIngredientsStockage,
      //   quantities: arrayNewQuantitiesStockage,
      //   categories: arrayNewCategoriesStockage,
      // };
      // data = newData;
      // dispatch(createRecipe(data));

      for (let i = 0; i < 20; i++) {
        handleValidationOpen(i);
      }

      //////////////////////
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  // --- Modification dans le store et la BDD ---
  /////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////
  // --- Gestion du Submit pour la modification dans le store et la BDD ---
  /////////////////////////////////////////////////////////////////////////////////
  const handleSubmitEdit = async (e) => {
    //--------------------------------------
    e.preventDefault();
    console.log("début SUBMIT EDIT");

    // Suppression des lignes blanches dans steps
    console.log("suppression des lignes blanches : steps");
    arrayW = newRecipeData.steps;
    arrayNewSteps = arrayW.filter((step) => {
      if (step !== "") {
        console.log("step renseigné : " + step);
        return step;
      } else {
        console.log("step non renseigné");
      }
    });
    console.log("arrayNewSteps :");
    console.log(arrayNewSteps);

    /////////////////////////
    // Suppression des lignes blanches Trio
    ///////
    console.log("suppression des lignes blanches : TRIO");

    arrayNewIngredientsStockage = newRecipeData.ingredients;
    arrayNewQuantitiesStockage = newRecipeData.quantities;
    arrayNewCategoriesStockage = newRecipeData.categories;

    // for (let i = 0; i < arrayNewIngredientsStockage.length; i++) {

    console.log("arrayNewIngredientsStockage");
    console.log(arrayNewIngredientsStockage);
    console.log("arrayNewQuantitiesStockage");
    console.log(arrayNewQuantitiesStockage);
    console.log("arrayNewCategoriesStockage");
    console.log(arrayNewCategoriesStockage);

    arrayNewIngredients = arrayNewIngredientsStockage.filter(function (
      element,
      index
    ) {
      if (
        arrayNewIngredientsStockage[index] === "" &&
        arrayNewQuantitiesStockage[index] === "" &&
        arrayNewCategoriesStockage[index] === ""
      ) {
        console.log("ing trio à supprimer : " + element);
      } else {
        console.log("ing trio à conserver : " + element);
        return element;
      }
    });

    arrayNewQuantities = arrayNewQuantitiesStockage.filter(function (
      element,
      index
    ) {
      if (
        arrayNewIngredientsStockage[index] === "" &&
        arrayNewQuantitiesStockage[index] === "" &&
        arrayNewCategoriesStockage[index] === ""
      ) {
        console.log("qtt trio à supprimer : " + element);
      } else {
        console.log("qtt trio à conserver : " + element);
        return element;
      }
    });

    arrayNewCategories = arrayNewCategoriesStockage.filter(function (
      element,
      index
    ) {
      if (
        arrayNewIngredientsStockage[index] === "" &&
        arrayNewQuantitiesStockage[index] === "" &&
        arrayNewCategoriesStockage[index] === ""
      ) {
        console.log("cat trio à supprimer : " + element);
      } else {
        console.log("cat trio à conserver : " + element);
        return element;
      }
    });
    // }
    console.log("arrayNewIngredients :");
    console.log(arrayNewIngredients);
    console.log("arrayNewQuantities :");
    console.log(arrayNewQuantities);
    console.log("arrayNewCategories :");
    console.log(arrayNewCategories);

    //////////////////

    data = {
      title: newRecipeData.title,
      author: "Melissande",
      seasons: newRecipeData.seasons,
      // ingredients: newRecipeData.ingredients,
      // quantities: newRecipeData.quantities,
      // categories: newRecipeData.categories,
      ingredients: arrayNewIngredients,
      quantities: arrayNewQuantities,
      categories: arrayNewCategories,
      // steps: newRecipeData.steps,
      steps: arrayNewSteps,
      _id: newRecipeData._id,
    };

    dispatch(createRecipe(data));
    console.log("dispatch createRecipe");
    console.log("data submit");
    console.log(data);

    //---------------------------------------------
    //Mise à jour d'une recette dans la BDD:
    //---------------------------------------------
    // axios
    //   .put("http://localhost:5000/recipe/" + checkedRecipe._id, {
    //     title: data.title,
    //     author: data.author,
    //     seasons: data.seasons,
    //     // ingredients: data.ingredients,
    //     // quantities: data.quantities,
    //     // categories: data.categories,
    //     ingredients: arrayNewIngredients,
    //     quantities: arrayNewQuantities,
    //     categories: arrayNewCategories,
    //     // steps: data.steps,
    //     steps: arrayNewSteps,
    //   })
    //   .then(() => {
    //     // MISE A JOUR REUSSIE
    //     // Envoi vers la page sans édition
    //     navigate("/PrivateRoute/pagedetailsrecipeprotect");
    //   })
    //   .catch((error) => {
    //     // ERREUR MISE A JOUR
    //     console.error(error);
    //   });

    try {
      await handleUpdateRecipe(data);
      // MISE A JOUR REUSSIE
      // Envoi vers la page sans édition
      navigate("/PrivateRoute/pagedetailsrecipeprotect");
    } catch (error) {
      console.error("An error occurred while updating recipe:", error);
    }

    // Si on est là, c'est que le formulaire a été validé
    dispatch(setChecked(data));
  };

  const handleBack = () => {
    console.log("handleBack");
    // dispatch(deleteNewRecipe(checkedRecipe._id));
    // console.log("après dispatch deleteNewRecipe");
  };

  /////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    console.log("useEffect init :");
    console.log("checkedRecipe");
    console.log(checkedRecipe);
    console.log("newRecipeData");
    console.log(newRecipeData);
    console.log("displayEdit useEffect: " + displayEdit);
  }, []);

  useEffect(() => {
    // Vérifiez si les données de recette sont manquantes ou non initialisées
    if (!checkedRecipe || checkedRecipe.length === 0) {
      console.log(
        "Accès direct ???? REDIRECTION /PrivateRoute/HomeListeRecettesProtect"
      );
      // Redirigez immédiatement l'utilisateur vers la page d'accueil ou une autre page appropriée
      navigate("/PrivateRoute/HomeListeRecettesProtect", { replace: true });
    }
  }, [checkedRecipe, navigate]);

  if (!checkedRecipe || checkedRecipe.length === 0) {
    // Si checkedRecipe est vide, il ne faut pas rendre le composant
    return null;
  }

  let content;

  // if (checkedRecipe === [] || checkedRecipe.length === 0) {
  //   content = "Erreur Accès direct interdit";
  // } else {
  content = (
    <>
      {displayEdit && (
        <div className="recipe-edit">
          <form
            onSubmit={handleSubmitEdit}
            className="edit-form"
            id="edit-form"
          >
            <div className="edit-input">
              <h4>Titre de la Recette</h4>
              <input
                name="editTitle"
                type="text"
                className="edit"
                id="editTitle"
                autoComplete="off"
                defaultValue={checkedRecipe.title}
                maxLength={45} // Limite la saisie à 45 caractères
                onChange={(e) => handleTitle(e.target.value)}
              />
            </div>
            <h4>Saisons</h4>
            <div className="seasons-edit-container">
              <div className="edit-input">
                <label htmlFor="printemps">Printemps </label>
                <input
                  name="printemps"
                  className="season"
                  type="checkbox"
                  id="printemps"
                  defaultChecked={
                    checkedRecipe.seasons.includes("printemps") ? "checked" : ""
                  }
                  onChange={(e) => {
                    handleSeasons(e.target.name);
                  }}
                />
              </div>

              <div className="edit-input">
                <label htmlFor="été">Eté </label>
                <input
                  name="été"
                  className="season"
                  type="checkbox"
                  id="été"
                  defaultChecked={
                    checkedRecipe.seasons.includes("été") ? "checked" : ""
                  }
                  onChange={(e) => {
                    handleSeasons(e.target.name);
                  }}
                />
              </div>
              <div className="edit-input">
                <label htmlFor="automne">Automne </label>
                <input
                  name="automne"
                  className="season"
                  type="checkbox"
                  id="automne"
                  defaultChecked={
                    checkedRecipe.seasons.includes("automne") ? "checked" : ""
                  }
                  onChange={(e) => {
                    handleSeasons(e.target.name);
                  }}
                />
              </div>
              <div className="edit-input">
                <label htmlFor="hiver">Hiver</label>
                <input
                  name="hiver"
                  className="season"
                  type="checkbox"
                  id="hiver"
                  defaultChecked={
                    checkedRecipe.seasons.includes("hiver") ? "checked" : ""
                  }
                  onChange={(e) => {
                    handleSeasons(e.target.name);
                  }}
                />
              </div>
            </div>
            <div className="edit-ingredients-label">
              <h4>Ingrédients</h4>
              <h4>Quantités</h4>
              <h4>Catégories</h4>
            </div>
            {/* /////////////////////////////////////////////////// */}
            <div className="edit-ingredients-container">
              {displayIngredients.map((index) => (
                <IngredientCardEdit
                  key={index}
                  index={index}
                  recipe={newRecipeData}
                  // recipe={checkedRecipe}
                  // recipe={data}
                  handleIngredients={handleIngredients}
                  handleQuantities={handleQuantities}
                  handleCategories={handleCategories}
                />
              ))}
              {/* /////////////////////////////////////////////////// */}
            </div>
            {/* /////////////////////////////////////////////////// */}
            <h4>Etapes</h4>
            <div className="edit-steps-container">
              {displaySteps.map((indexStep) => (
                <div className="edit-input" key={indexStep}>
                  <input
                    name={"editStep" + indexStep}
                    type="text"
                    className="details"
                    id={"editStep" + indexStep}
                    autoComplete="off"
                    defaultValue={checkedRecipe.steps[indexStep]}
                    maxLength={115} // Limite la saisie à 115 caractères
                    onChange={(e) => {
                      handleSteps(e.target.value, indexStep);
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="espace-message">{messageEdit}</p>
            <div className="edit-button-container">
              <button onClick={() => handleBack()}>
                <NavLink to="/PrivateRoute/HomeListeRecettesProtect">
                  <i className="fa-solid fa-rotate-left"></i>
                </NavLink>
              </button>
              <button id="form-validation">
                {/* <NavLink to="/PrivateRoute/pagedetailsrecipeprotect"> */}
                Valider
                {/* </NavLink> */}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
  // }
  return content;
};

export default DétailsEdit;
