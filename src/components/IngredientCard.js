import React, { useRef } from "react";

const IngredientCard = (props) => {
  const newIngredientRef = useRef();
  const newQuantityRef = useRef();
  const newCategoryRef = useRef();

  return (
    <div>
      <div className="ingredient-bloc">
        <div className="new-input">
          <input
            name={"newIngrédient" + props.index}
            type="text"
            className="details"
            id={"newIngrédient" + props.index}
            autoComplete="off"
            placeholder={"Ingrédient " + (props.index + 1)}
            maxLength={30} // Limite la saisie à 28 caractères
            onChange={(e) => {
              props.handleIngredients(
                e.target.value,
                props.index,
                newIngredientRef,
                newQuantityRef,
                newCategoryRef
              );
            }}
            ref={newIngredientRef}
          />
        </div>
        <div className="new-input">
          <input
            name={"newQuantity" + props.index}
            type="text"
            className="details"
            id={"newQuantity" + props.index}
            autoComplete="off"
            placeholder={"Quantité " + (props.index + 1)}
            maxLength={20} // Limite la saisie à 20 caractères
            onChange={(e) => {
              props.handleQuantities(
                e.target.value,
                props.index,
                newIngredientRef,
                newQuantityRef,
                newCategoryRef
              );
            }}
            ref={newQuantityRef}
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
                newIngredientRef,
                newQuantityRef,
                newCategoryRef
              );
            }}
            ref={newCategoryRef}
          >
            <option value="">Catégorie</option>
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

export default IngredientCard;
