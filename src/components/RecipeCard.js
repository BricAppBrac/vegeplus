import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setChecked } from "../feature/checked.slice";
import { createRecipe } from "../feature/recipe.slice";

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();

  const handleDetails = () => {
    // console.log("handleDetails");
    // console.log(recipe.title);
    dispatch(setChecked(recipe));
    dispatch(createRecipe(recipe));
    // console.log("après dispatch setChecked et createRecipe");
  };

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
          <div className="box-details" onClick={() => handleDetails()}>
            <NavLink to="/pagedetailsrecipe">
              <i className="fa fa-sharp fa-solid fa-circle-info"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
