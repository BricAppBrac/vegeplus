import React, { useRef } from "react";

const IngredientCardEdit = (props) => {
  const editIngredientRef = useRef();
  const editQuantityRef = useRef();
  const editCategoryRef = useRef();

  return (
    <div>
      <div className="edit-ingredient-bloc">
        <div className="edit-input">
          <input
            name={"editIngrédient" + props.index}
            type="text"
            className="edit"
            id={"editIngrédient" + props.index}
            autoComplete="off"
            defaultValue={props.recipe.ingredients[props.index]}
            maxLength={25} // Limite la saisie à 25 caractères
            onChange={(e) => {
              props.handleIngredients(
                e.target.value,
                props.index,
                editIngredientRef,
                editQuantityRef,
                editCategoryRef
              );
            }}
            ref={editIngredientRef}
          />
        </div>
        <div className="edit-input">
          <input
            name={"editQuantity" + props.index}
            type="text"
            className="edit"
            id={"editQuantity" + props.index}
            autoComplete="off"
            defaultValue={props.recipe.quantities[props.index]}
            maxLength={20} // Limite la saisie à 20 caractères
            onChange={(e) => {
              props.handleQuantities(
                e.target.value,
                props.index,
                editIngredientRef,
                editQuantityRef,
                editCategoryRef
              );
            }}
            ref={editQuantityRef}
          />
        </div>
        <div className="select-category">
          <select
            name={"category" + props.index}
            id={"category" + props.index}
            onChange={(e) => {
              props.handleCategories(
                e.target.value,
                props.index,
                editIngredientRef,
                editQuantityRef,
                editCategoryRef
              );
            }}
            ref={editCategoryRef}
          >
            <option value="bdd">{props.recipe.categories[props.index]}</option>
            <option value=""></option>
            <option value="Frais">Frais</option>
            <option value="Epicerie">Epicerie</option>
            <option value="Fruits/Légumes">Fruits/Légumes</option>
            <option value="Plantes sauvages">Plantes sauvages</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default IngredientCardEdit;
