import React, { useState } from "react";
// import axios from "axios";
import IngredientCard from "./IngredientCard";
import { NavLink } from "react-router-dom";
import {
  useAddNewRecipeMutation,
  useGetRecipesQuery,
} from "../feature/recipes/recipesApiSlice";

const RecipeNew = () => {
  const [displayNew] = useState(true);
  const [messageNew, setMessageNew] = useState(
    "Saisir les informations et valider"
  );

  const [displayIngredients] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ]);

  const [displaySteps] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ]);

  const { refetch } = useGetRecipesQuery();
  const [addNewRecipeMutation] = useAddNewRecipeMutation();

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("Melissande");
  const [newSeasons, setNewSeasons] = useState([]);
  const [newIngredients, setNewIngredients] = useState([]);
  const [newQuantities, setNewQuantities] = useState([]);
  const [newCategories, setNewCategories] = useState([]);
  const [newSteps, setNewSteps] = useState([]);

  const data = {
    title: newTitle,
    author: newAuthor,
    seasons: newSeasons,
    ingredients: newIngredients,
    quantities: newQuantities,
    categories: newCategories,
    steps: newSteps,
    _id: Date.now(),
  };

  let arrayNew = [];
  let arrayW = [];
  let arrayNewIngredients = [];
  let arrayNewQuantities = [];
  let arrayNewCategories = [];
  let arrayNewIngredientsStockage = [];
  let arrayNewQuantitiesStockage = [];
  let arrayNewCategoriesStockage = [];

  const handleAddNewRecipe = async (recipeData) => {
    try {
      const response = await addNewRecipeMutation(recipeData);

      if (response.error) {
        console.error("Failed to add new recipe:", response.error);
      } else {
        console.log("Successfully added new recipe");
        // Après une mise à jour réussie, appeler refetch()
        refetch();
      }
    } catch (error) {
      console.error("An error occurred while adding new recipe:", error);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Gestion des inputs
  ////////////////////////////////////////////////////
  ////////////////////////////
  // Stockage du titre
  ///////////////////////
  const handleTitle = (newTit) => {
    setNewTitle(newTit);
    data.title = newTit;
  };
  ////////////////////////////
  // Stockage des saisons
  ///////////////////////
  const handleSeasons = (newSeas) => {
    if (document.getElementById(newSeas).checked == true) {
      console.log("checked");
      arrayNew = newSeasons;
      arrayW.push(newSeas);
      arrayNew = [...arrayNew, ...arrayW];
    } else {
      console.log("décochée");
      arrayW = newSeasons;
      arrayNew = arrayW.filter(function (element) {
        return element !== newSeas;
      });
    }
    console.log("Seasons array");
    console.log(arrayNew);
    setNewSeasons(arrayNew);
    data.seasons = arrayNew;
    arrayNew = [];
    arrayW = [];
  };
  /////////////////////////////
  // Stockage des ingrédients
  /////////////////////////////
  const handleIngredients = (
    newVal,
    ingId,
    newIngredientRef,
    newQuantityRef,
    newCategoryRef
  ) => {
    console.log("newVal handleIngrédients :");
    console.log(newVal);
    console.log("ingId :" + ingId);

    arrayNew = [...newIngredients];
    console.log("arrayNew avant ajout :");
    console.log(arrayNew);
    arrayNew[ingId] = newVal;
    console.log("arrayNew après ajout :");
    console.log(arrayNew);

    setNewIngredients(arrayNew);
    console.log("newIngredients après:");
    console.log(newIngredients);

    // Contrôle du trio Ing / Qtt / Cat
    if (arrayNew[ingId]) {
      console.log("ingrédient renseigné : " + arrayNew[ingId]);

      if (!newQuantities[ingId] || !newCategories[ingId]) {
        setMessageNew(
          "Saisir une quantité et une catégorie pour chaque ingrédient"
        );
        console.log(
          "Saisir une quantité et une catégorie pour chaque ingrédient"
        );
        document.getElementById("form-new-validation").disabled = "disabled";
        newIngredientRef.current.style.backgroundColor = "#d65630";
        newIngredientRef.current.style.color = "rgb(206, 228, 187)";
        newQuantityRef.current.style.backgroundColor = "#d65630";
        newQuantityRef.current.style.color = "rgb(206, 228, 187)";
        newCategoryRef.current.style.backgroundColor = "#d65630";
        newCategoryRef.current.style.color = "rgb(206, 228, 187)";
      } else {
        newIngredientRef.current.style.backgroundColor = "whitesmoke";
        newIngredientRef.current.style.color = "rgb(37, 21, 11)";
        newQuantityRef.current.style.backgroundColor = "whitesmoke";
        newQuantityRef.current.style.color = "rgb(37, 21, 11)";
        newCategoryRef.current.style.backgroundColor = "whitesmoke";
        newCategoryRef.current.style.color = "rgb(37, 21, 11)";
        // Contrôle du trio pour toutes les autres lignes
        data.ingredients = arrayNew;
        handleTrioFinal();
        arrayW = [];
        arrayNew = [];
      }
    }
  };
  /////////////////////////////
  // Stockage des quantités
  /////////////////////////////
  const handleQuantities = (
    newQtt,
    qttId,
    newIngredientRef,
    newQuantityRef,
    newCategoryRef
  ) => {
    console.log("handleQuantities :");
    console.log("newQtt Quantité :");
    console.log(newQtt);
    console.log("qttId :" + qttId);

    console.log("newQuantityRef :");
    console.log(newQuantityRef);

    console.log("newQuantities avant ajout");
    console.log(newQuantities);

    arrayNew = [...newQuantities];
    console.log("arrayNew avant ajout :");
    console.log(arrayNew);
    arrayNew[qttId] = newQtt;
    console.log("arrayNew après ajout :");
    console.log(arrayNew);

    setNewQuantities(arrayNew);
    console.log("newQuantities après:");
    console.log(newQuantities);

    // Contrôle du trio Ing / Qtt / Cat
    if (arrayNew[qttId]) {
      console.log("quantité renseignée : " + arrayNew[qttId]);

      if (!newIngredients[qttId] || !newCategories[qttId]) {
        setMessageNew(
          "Saisir un ingrédient et une catégorie pour chaque quantité"
        );
        console.log(
          "Saisir un ingrédient et une catégorie pour chaque quantité"
        );
        document.getElementById("form-new-validation").disabled = "disabled";
        newIngredientRef.current.style.backgroundColor = "#d65630";
        newIngredientRef.current.style.color = "rgb(206, 228, 187)";
        newQuantityRef.current.style.backgroundColor = "#d65630";
        newQuantityRef.current.style.color = "rgb(206, 228, 187)";
        newCategoryRef.current.style.backgroundColor = "#d65630";
        newCategoryRef.current.style.color = "rgb(206, 228, 187)";
      } else {
        newIngredientRef.current.style.backgroundColor = "whitesmoke";
        newIngredientRef.current.style.color = "rgb(37, 21, 11)";
        newQuantityRef.current.style.backgroundColor = "whitesmoke";
        newQuantityRef.current.style.color = "rgb(37, 21, 11)";
        newCategoryRef.current.style.backgroundColor = "whitesmoke";
        newCategoryRef.current.style.color = "rgb(37, 21, 11)";
        // Contrôle du trio pour toutes les autres lignes
        data.quantities = arrayNew;
        handleTrioFinal();
        arrayW = [];
        arrayNew = [];
      }
    }
  };
  /////////////////////////////
  // Stockage des catégories
  /////////////////////////////
  const handleCategories = async (
    newCat,
    catId,
    newIngredientRef,
    newQuantityRef,
    newCategoryRef
  ) => {
    console.log("newCat Catégorie :");
    console.log(newCat);
    console.log("catId :" + catId);

    console.log("newCategoryRef :");
    console.log(newCategoryRef);

    console.log("newCategories avant ajout");
    console.log(newCategories);

    arrayNew = [...newCategories];
    console.log("arrayNew avant ajout :");
    console.log(arrayNew);
    arrayNew[catId] = newCat;

    console.log("arrayNew après ajout :");
    console.log(arrayNew);

    setNewCategories(arrayNew);

    console.log("newCategories après:");
    console.log(newCategories);

    // Contrôle du trio Ing / Qtt / Cat
    if (arrayNew[catId]) {
      console.log("catégorie renseignée : " + arrayNew[catId]);

      if (!newIngredients[catId] || !newQuantities[catId]) {
        setMessageNew(
          "Saisir un ingrédient et une quantité pour chaque catégorie"
        );
        console.log(
          "Saisir un ingrédient et une quantité pour chaque catégorie"
        );
        document.getElementById("form-new-validation").disabled = "disabled";
        newIngredientRef.current.style.backgroundColor = "#d65630";
        newIngredientRef.current.style.color = "rgb(206, 228, 187)";
        newQuantityRef.current.style.backgroundColor = "#d65630";
        newQuantityRef.current.style.color = "rgb(206, 228, 187)";
        newCategoryRef.current.style.backgroundColor = "#d65630";
        newCategoryRef.current.style.color = "rgb(206, 228, 187)";
      } else {
        newIngredientRef.current.style.backgroundColor = "whitesmoke";
        newIngredientRef.current.style.color = "rgb(37, 21, 11)";
        newQuantityRef.current.style.backgroundColor = "whitesmoke";
        newQuantityRef.current.style.color = "rgb(37, 21, 11)";
        newCategoryRef.current.style.backgroundColor = "whitesmoke";
        newCategoryRef.current.style.color = "rgb(37, 21, 11)";
        // Contrôle du trio pour toutes les autres lignes
        data.categories = arrayNew;
        handleTrioFinal();
        arrayW = [];
        arrayNew = [];
      }
    }
  };
  /////////////////////////////
  // Stockage des étapes
  /////////////////////////////
  const handleSteps = (newStp, stpId) => {
    console.log("newStp Etape :");
    console.log(newStp);
    console.log("stpId :" + stpId);

    arrayNew = [...newSteps];
    console.log("arrayNew avant ajout :");
    console.log(arrayNew);
    arrayNew[stpId] = newStp;
    console.log("arrayNew après ajout :");
    console.log(arrayNew);

    setNewSteps(arrayNew);
    console.log("newSteps après:");
    console.log(newSteps);
    data.steps = arrayNew;
    arrayW = [];
    arrayNew = [];
  };
  ///////////////////////////
  // Reset du formulaire
  //////////////////////////
  const resetForm = () => {
    console.log("Réinit du formulaire");
    document.getElementById("new-form").reset();
  };

  /////////////////////////////
  // Contrôle du Trio Ingrédient / Quantité / Catégorie pour toutes les lignes avant validation
  /////////////////////////////////////////////////////////////////////////////////////////////
  const handleTrioFinal = () => {
    console.log("handleTrioFinal");

    let validate = true;
    //////////////////////////////////////////////
    for (let i = 0; i < 20; i++) {
      if (!data.ingredients[i] && !data.quantities[i] && !data.categories[i]) {
        console.log("ligne vide : " + i);
      } else {
        // Cas Ingrédient non renseigné, et l'un des 2 autres renseigné
        console.log("ligne renseignée : " + i);
        if (!data.ingredients[i]) {
          console.log("ingrédient non renseigné");
          setMessageNew(
            "Saisir une quantité et une catégorie pour chaque ingrédient"
          );
          validate = false;
          break; // arrête la boucle si un ingrédient n'a pas de quantité ou de catégorie
        }
        // Cas Quantité non renseignée, et l'un des 2 autres renseigné
        if (!data.quantities[i]) {
          console.log("quantité non renseignée");
          setMessageNew(
            "Saisir une quantité et une catégorie pour chaque ingrédient"
          );
          validate = false;
          break;
        }
        // Cas Catégorie non renseignée, et l'un des 2 autres renseigné
        if (!data.categories[i]) {
          console.log("catégorie non renseignée");
          setMessageNew(
            "Saisir une quantité et une catégorie pour chaque ingrédient"
          );
          validate = false;
          break;
        }
      }
    }

    // Cas toutes les zones sont renseignées
    if (validate) {
      console.log("toutes les lignes sont renseignées correctement");
      setMessageNew("Effectuer les modifications et valider");
      document.getElementById("form-new-validation").disabled = false;
    }
  };

  /////////////////////////////////////////////////////////////////////////////////
  // --- Gestion du Submit pour la création dans le store et la BDD ---
  /////////////////////////////////////////////////////////////////////////////////
  const handleSubmitNew = async (e) => {
    e.preventDefault();
    console.log("début SUBMIT");

    // setMessageNew("Saisir les informations et valider");

    // Elimination du cas ou Valider a été pressé mais pas de saisie

    if (newTitle !== "") {
      // Traitement normal

      // Suppression des lignes blanches dans steps
      console.log("suppression des lignes blanches : steps");
      arrayW = newSteps;
      arrayNew = arrayW.filter((step) => {
        if (step === "" || step === undefined) {
          console.log("step non renseigné");
        } else {
          console.log("step renseigné : " + step);
          return step;
        }
      });
      console.log("arrayNew :");
      console.log(arrayNew);
      setNewSteps(arrayNew);
      console.log("newSteps :");
      console.log(newSteps);

      /////////////////////////
      // Suppression des lignes blanches Trio
      ///////
      console.log("suppression des lignes blanches : TRIO");

      arrayNewIngredientsStockage = newIngredients;
      arrayNewQuantitiesStockage = newQuantities;
      arrayNewCategoriesStockage = newCategories;

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

      // mettre à jour la BDD MongoDB et récupérer l'ID généré

      // Création d'une recette :

      // Prepare menuData for the API call
      const recipeData = {
        title: newTitle,
        author: newAuthor,
        seasons: newSeasons,
        ingredients: arrayNewIngredients,
        quantities: arrayNewQuantities,
        categories: arrayNewCategories,
        // steps: newSteps,
        steps: arrayNew,
      };

      // axios.post("http://localhost:5000/recipe/complete", {
      //   title: newTitle,
      //   author: newAuthor,
      //   seasons: newSeasons,
      //   // ingredients: newIngredients,
      //   // quantities: newQuantities,
      //   // categories: newCategories,
      //   ingredients: arrayNewIngredients,
      //   quantities: arrayNewQuantities,
      //   categories: arrayNewCategories,
      //   // steps: newSteps,
      //   steps: arrayNew,
      // });

      try {
        console.log("recipeData avant addNewRecipe");
        console.log(recipeData);
        await handleAddNewRecipe(recipeData);
      } catch (error) {
        console.error("An error occurred while adding new recipe:", error);
      }

      // // Réinitialiser le State de newRecipe
      setNewTitle("");
      setNewAuthor("Melissande");
      setNewSeasons([]);
      setNewIngredients([]);
      setNewQuantities([]);
      setNewCategories([]);
      setNewSteps([]);
      setMessageNew(
        "Création effectuée, vous pouvez saisir une nouvelle recette"
      );
      resetForm();
      // dispatch(deleteNewRecipe());
    } else {
      setMessageNew("Saisir les informations et valider");
      console.log("Attention, Validation sans saisie");
    }
  };
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {displayNew && (
        <div className="recipe-new">
          <form onSubmit={handleSubmitNew} className="new-form" id="new-form">
            <div className="new-input">
              <h4>Titre de la Recette</h4>
              <input
                name="newTitle"
                // required
                type="text"
                className="new"
                id="newTitle"
                autoComplete="off"
                maxLength={45} // Limite la saisie à 45 caractères
                onChange={(e) => handleTitle(e.target.value)}
              />
            </div>
            <h4>Saisons</h4>
            <div className="seasons-container">
              <div className="new-input">
                <label htmlFor="printemps">Printemps </label>
                <input
                  name="printemps"
                  className="season"
                  type="checkbox"
                  id="printemps"
                  onChange={(e) => {
                    handleSeasons(e.target.name);
                  }}
                />
              </div>

              <div className="new-input">
                <label htmlFor="été">Eté </label>
                <input
                  name="été"
                  className="season"
                  type="checkbox"
                  id="été"
                  onChange={(e) => {
                    handleSeasons(e.target.name);
                  }}
                />
              </div>
              <div className="new-input">
                <label htmlFor="automne">Automne </label>
                <input
                  name="automne"
                  className="season"
                  type="checkbox"
                  id="automne"
                  onChange={(e) => {
                    handleSeasons(e.target.name);
                  }}
                />
              </div>
              <div className="new-input">
                <label htmlFor="hiver">Hiver</label>
                <input
                  name="hiver"
                  className="season"
                  type="checkbox"
                  id="hiver"
                  onChange={(e) => {
                    handleSeasons(e.target.name);
                  }}
                />
              </div>
            </div>
            <div className="ingredients-label">
              <h4>Ingrédients</h4>
              <h4>Quantités</h4>
              <h4>Catégories</h4>
            </div>
            {/* /////////////////////////////////////////////////// */}
            <div className="ingredients-container">
              {displayIngredients.map((index) => (
                <IngredientCard
                  key={index}
                  index={index}
                  handleIngredients={handleIngredients}
                  handleQuantities={handleQuantities}
                  handleCategories={handleCategories}
                />
              ))}
              {/* /////////////////////////////////////////////////// */}
            </div>
            {/* /////////////////////////////////////////////////// */}
            <h4>Etapes</h4>
            <div className="steps-container">
              {displaySteps.map((indexStep) => (
                <div className="new-input" key={indexStep}>
                  <input
                    name={"newStep" + indexStep}
                    type="text"
                    className="details"
                    id={"newStep" + indexStep}
                    autoComplete="off"
                    placeholder={"Etape " + (indexStep + 1)}
                    maxLength={115} // Limite la saisie à 115 caractères
                    onChange={(e) => {
                      handleSteps(e.target.value, indexStep);
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="espace-message">{messageNew}</p>
            <div className="button-container">
              <button>
                <NavLink to="/PrivateRoute/HomeListeRecettesProtect">
                  <i className="fa-solid fa-rotate-left"></i>
                </NavLink>
              </button>
              <button id="form-new-validation">Valider</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default RecipeNew;
