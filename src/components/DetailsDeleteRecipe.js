// import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setConfirmDelete } from "../feature/indic.slice";
import { deleteRecipe } from "../feature/liste.slice";
import {
  useDeleteRecipeMutation,
  useGetRecipesQuery,
  useAddNewRecipeMutation,
} from "../feature/recipes/recipesApiSlice";

const DetailsDeleteRecipe = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkedRecipe = useSelector((state) => state.checkedRec.checkedRecipe);
  console.log("checkedRecipe.title");
  console.log(checkedRecipe.title);
  const [message, setMessage] = useState("");
  const [origin, setOrigin] = useState(props.delOrigin);

  const [deleteRecipeMutation] = useDeleteRecipeMutation();
  const [addNewRecipeMutation] = useAddNewRecipeMutation();
  const { refetch } = useGetRecipesQuery();

  //////////////////////////////////////////
  const handleCancel = () => {
    // console.log("handleCancel");
    if (origin === "détails-1") {
      setMessage("");
      setOrigin("détails-0");
    }
  };

  ///////////////////////////////////////
  const handleDelete = async (recipeId) => {
    try {
      // Call the deleteRecipe mutation with the recipe id
      const response = await deleteRecipeMutation({ id: recipeId });

      // Check if the mutation was successful
      if (response.error) {
        console.error("Failed to delete recipe:", response.error);
      } else {
        // console.log("DELETE RECIPE BDD");
        dispatch(deleteRecipe(recipeId));
        // Après une suppression réussie, actualisez la liste des recettes en appelant refetch()
        // await refetch();
      }
    } catch (error) {
      console.error("An error occurred while deleting recipe:", error);
    }
  };

  //////////////////////////////////////////
  const handleConfirm = async () => {
    //------------------------------------
    // console.log("delOrigin : " + props.delOrigin);
    // console.log("recipeId : " + props.recipeId);
    // console.log("origin : " + origin);

    if (origin === "détails-0") {
      setMessage("Confirmer la suppression");
      dispatch(setConfirmDelete("détails-1"));
      // console.log("après dispatch setConfirmDelete");
      setOrigin("détails-1");
      // Lancez la requête pour obtenir les recettes
      const recipesQuery = await refetch();
    }
    if (origin === "détails-1") {
      setMessage("Suppression effectuée");

      setOrigin("détails-2");
      dispatch(setConfirmDelete("détails-2"));
      // console.log("après dispatch setConfirmDelete");
      await handleDelete(props.recipeId);
      refetch();
      navigate("/PrivateRoute/HomeListeRecettesProtect");
    }
  };

  //////////////////////////////////////////
  const handleDuplicate = async () => {
    // Dupliquer la recette en cours en changeant les 4 premiers caractères du title : remplacer par "COPY" et ajouter à la BDD

    const newRecipe = {
      ...checkedRecipe,
      title: "COPY" + checkedRecipe.title.slice(4),
      _id: Date.now().toString(),
    };

    try {
      const response = await addNewRecipeMutation(newRecipe);
      if (response.error) {
        console.error("Failed to duplicate recipe:", response.error);
      } else {
        console.log("Successfully duplicated recipe");
        refetch();
      }
    } catch (error) {
      console.error("An error occurred while duplicating recipe:", error);
    }
    navigate("/PrivateRoute/HomeListeRecettesProtect");
  };

  return (
    <div className="delete-container">
      {/* //////////////////////////////////////*/}
      <div className="box-duplicate">
        <button onClick={() => handleDuplicate()}>
          <i className="fa-solid fa-copy"></i>
        </button>
      </div>
      <div className="box-modif-back">
        <button>
          <NavLink to="/PrivateRoute/HomeListeRecettesProtect">
            <i className="fa-solid fa-rotate-left"></i>
          </NavLink>
        </button>
      </div>
      <div className="box-modif-back">
        {origin === "détails-1" ? (
          ""
        ) : (
          <button>
            <NavLink to="/PrivateRoute/pagedetailsedit">
              <i className="fa-solid fa-file-pen"></i>
            </NavLink>
          </button>
        )}
      </div>
      <div className="box-delete">
        {origin === "détails-1" ? (
          <div className="box-message-conf">
            <div className="box-message">
              <p>{message}</p>
            </div>
            <div className="conf-suppr">
              <button onClick={() => handleConfirm()}>
                <i className="fa-solid fa-thumbs-up"></i>
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
      </div>
    </div>
  );
};

export default DetailsDeleteRecipe;
