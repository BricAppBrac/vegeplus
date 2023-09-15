// import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setConfirmDelete } from "../feature/indic.slice";
import { deleteRecipe } from "../feature/liste.slice";
import { setChecked } from "../feature/checked.slice";
import { createRecipe } from "../feature/recipe.slice";
import {
  useDeleteRecipeMutation,
  useGetRecipesQuery,
} from "../feature/recipes/recipesApiSlice";

const ListeDeleteRecipe = (props) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [origin, setOrigin] = useState(props.delOrigin);

  const [deleteRecipeMutation] = useDeleteRecipeMutation();
  const { refetch } = useGetRecipesQuery();

  //////////////////////////////////////////
  const handleCancel = () => {
    // console.log("handleCancel");
    if (origin === "liste-1") {
      setMessage("");
      setOrigin("liste-0");
    }
  };
  //////////////////////////////////////////
  const handleDetails = () => {
    // console.log("handleDetails");
    // console.log(props.recipe);
    dispatch(setChecked(props.recipe));
    dispatch(createRecipe(props.recipe));
    // console.log("après dispatch setChecked et createRecipe");
  };

  //////////////////////////////////////////
  const handleConfirm = async () => {
    // console.log("delOrigin : " + props.delOrigin);
    // console.log("recipeId : " + props.recipe._id);
    // console.log("origin : " + origin);

    const handleDelete = async () => {
      // axios.delete("http://localhost:5000/recipe/" + props.recipe._id);
      // dispatch(deleteRecipe(props.recipe._id));
      // console.log("après dispatch deleteRecipe");

      try {
        // Call the deleteRecipe mutation with the recipe id
        const response = await deleteRecipeMutation({ id: props.recipe._id });

        // Check if the mutation was successful
        if (response.error) {
          console.error("Failed to delete recipe:", response.error);
        } else {
          // console.log("DELETE RECIPE BDD");
          dispatch(deleteRecipe(props.recipe._id));

          // Après une mise à jour réussie, appeler refetch() pour actualiser la liste des utilisateurs
          refetch();
        }
      } catch (error) {
        console.error("An error occurred while deleting recipe:", error);
      }
    };

    if (origin === "liste-0") {
      setMessage("Confirmer la suppression");
      setOrigin("liste-1");
      dispatch(setConfirmDelete("liste-1"));
      // console.log("après dispatch setConfirmDelete");
    }
    if (origin === "liste-1") {
      setMessage("Suppression effectuée");
      setOrigin("liste-2");
      dispatch(setConfirmDelete("liste-2"));
      // console.log("après dispatch setConfirmDelete");
      handleDelete();
    }
  };

  return (
    <div className="delete-container">
      <div className="box-info">
        {origin === "liste-1" ? (
          ""
        ) : (
          <div className="box-details" onClick={() => handleDetails()}>
            <NavLink to="/PrivateRoute/pagedetailsrecipeprotect">
              <i className="fa fa-sharp fa-solid fa-circle-info"></i>
            </NavLink>
          </div>
        )}
      </div>
      <div className="box-delete">
        {origin === "liste-1" ? (
          <div className="box-message-conf">
            <div className="box-message">
              <p>{message}</p>
            </div>
            <div className="conf-suppr">
              <button onClick={() => handleConfirm()}>
                <NavLink to="/PrivateRoute/HomeListeRecettesProtect">
                  <i className="fa-solid fa-thumbs-up"></i>
                </NavLink>
              </button>
              <button onClick={() => handleCancel()}>
                <NavLink to="/PrivateRoute/HomeListeRecettesProtect">
                  <i className="fa-solid fa-thumbs-down"></i>
                </NavLink>
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => handleConfirm()}>
            <i className="fa-solid fa-trash"></i>
          </button>
        )}
        {/* } */}
      </div>
    </div>
  );
};

export default ListeDeleteRecipe;
