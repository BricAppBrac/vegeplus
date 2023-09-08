import React from "react";
import ListeDeleteRecipe from "./ListeDeleteRecipe";

const RecipeCardProtect = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-card-content">
        <h3>{recipe.title}</h3>

        <h4>Ingrédients principaux: </h4>
        <div className="ingredients-liste">
          <p>
            {recipe.ingredients[0] ? (
              <span>&#10037; {recipe.ingredients[0]}</span>
            ) : (
              ""
            )}
          </p>
          <p>
            {recipe.ingredients[1] ? (
              <span>&#10037; {recipe.ingredients[1]}</span>
            ) : (
              ""
            )}
          </p>
          <p>
            {recipe.ingredients[2] ? (
              <span>&#10037; {recipe.ingredients[2]}</span>
            ) : (
              ""
            )}
          </p>
          <p>
            {recipe.ingredients[3] ? (
              <span>&#10037; {recipe.ingredients[3]}</span>
            ) : (
              ""
            )}
          </p>
          <p>
            {recipe.ingredients[4] ? (
              <span>&#10037; {recipe.ingredients[4]}</span>
            ) : (
              ""
            )}
          </p>
        </div>
        <div className="checkbox-container">
          <ListeDeleteRecipe recipe={recipe} delOrigin={"liste-0"} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCardProtect;
