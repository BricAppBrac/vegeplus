import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IngredientCardDetails from "./IngredientCardDetails";
import DetailsDeleteRecipe from "./DetailsDeleteRecipe";
import { setConfirmDelete } from "../feature/indic.slice";
import { useNavigate } from "react-router-dom";

const RecipeDetailsProtect = () => {
  const navigate = useNavigate();

  const [displayDetails] = useState(true);
  const [messageDetails] = useState("");

  const checkedRecipe = useSelector((state) => state.checkedRec.checkedRecipe);

  const [displayIngredients] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ]);

  const [displaySteps] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Vérifiez si les données de recette sont manquantes ou non initialisées
    if (!checkedRecipe || checkedRecipe.length === 0) {
      console.log(
        "Accès direct ???? REDIRECTION /PrivateRoute/HomeListeRecettesProtect"
      );
      // Redirigez immédiatement l'utilisateur vers la page d'accueil ou une autre page appropriée
      navigate("/PrivateRoute/HomeListeRecettesProtect", { replace: true });
    } else {
      dispatch(setConfirmDelete("détails-0"));
      console.log("après dispatch setConfirmDelete");
    }
  }, [checkedRecipe, navigate]);

  if (!checkedRecipe || checkedRecipe.length === 0) {
    // Si checkedRecipe est vide, il ne faut pas rendre le composant
    return null;
  }

  let content;

  content = (
    <>
      {displayDetails && (
        <div className="recipe-details">
          <div className="details-input">
            <div className="details-title">
              <h4>Titre de la Recette</h4>
              <h5>{checkedRecipe.title}</h5>
            </div>
            <h4>Saisons</h4>
            <div className="seasons-container">
              <div className="details-input">
                <label htmlFor="printemps">Printemps </label>
                <input
                  name="printemps"
                  className="season"
                  type="checkbox"
                  id="printemps"
                  defaultChecked={
                    checkedRecipe.seasons.includes("printemps") ? "checked" : ""
                  }
                  disabled="disabled"
                />
              </div>

              <div className="details-input">
                <label htmlFor="été">Eté </label>
                <input
                  name="été"
                  className="season"
                  type="checkbox"
                  id="été"
                  defaultChecked={
                    checkedRecipe.seasons.includes("été") ? "checked" : ""
                  }
                  disabled="disabled"
                />
              </div>
              <div className="details-input">
                <label htmlFor="automne">Automne </label>
                <input
                  name="automne"
                  className="season"
                  type="checkbox"
                  id="automne"
                  defaultChecked={
                    checkedRecipe.seasons.includes("automne") ? "checked" : ""
                  }
                  disabled="disabled"
                />
              </div>
              <div className="details-input">
                <label htmlFor="hiver">Hiver</label>
                <input
                  name="hiver"
                  className="season"
                  type="checkbox"
                  id="hiver"
                  defaultChecked={
                    checkedRecipe.seasons.includes("hiver") ? "checked" : ""
                  }
                  disabled="disabled"
                />
              </div>
            </div>
            <div className="ingredients-label">
              <h4>Ingrédients</h4>
              <h4>Quantités</h4>
              <h4>Catégories</h4>
            </div>
            {/* /////////////////////////////////////////////////// */}
            <div className="ingredients-container-details">
              {displayIngredients.map((index) => (
                <IngredientCardDetails
                  key={index}
                  index={index}
                  recipe={checkedRecipe}
                />
              ))}
              {/* /////////////////////////////////////////////////// */}
            </div>
            {/* /////////////////////////////////////////////////// */}
            <h4>Etapes</h4>
            <div className="steps-container-details">
              {displaySteps.map((indexStep) => (
                <div className="details-input-stp" key={indexStep}>
                  <h6 name={"newStep" + indexStep} id={"newStep" + indexStep}>
                    {checkedRecipe.steps[indexStep]}
                  </h6>
                </div>
              ))}
            </div>
            <p className="espace-message">{messageDetails}</p>
            <div className="private-button-container">
              <DetailsDeleteRecipe
                recipeId={checkedRecipe._id}
                delOrigin={"détails-0"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );

  return content;
};

export default RecipeDetailsProtect;
