import React from "react";

const IngredientCardDetails = (props) => {
  return (
    <div>
      <div className="ingredient-bloc-details">
        <div className="details-input">
          <h6
            name={"detailsIngrédient" + props.index}
            id={"detailsIngrédient" + props.index}
          >
            {props.recipe.ingredients[props.index]}
          </h6>
        </div>
        <div className="details-input">
          <h6
            name={"detailsQuantity" + props.index}
            id={"detailsQuantity" + props.index}
          >
            {props.recipe.quantities[props.index]}
          </h6>
        </div>
        <div className="select-category">
          <h6
            name={"detailsCategory" + props.index}
            id={"detailsCategory" + props.index}
          >
            {props.recipe.categories[props.index]}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default IngredientCardDetails;
