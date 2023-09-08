import React from "react";

const RecipeMenuCard = ({ element }) => {
  console.log("element passé en props");
  console.log(element);

  return (
    <div className="recipe-menu-card">
      <div className="recipe-menu-card-content">
        <h3>{element.category}</h3>

        {element.ingredients.length === 0 ? (
          <h4>RAS</h4>
        ) : (
          element.ingredients.map((ing) => (
            <div key={ing[0]} className="ingredients-liste">
              <h4>{ing[0] + " : "} </h4>
              <p> {ing[1]}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeMenuCard;
