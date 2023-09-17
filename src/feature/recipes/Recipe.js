import { useNavigate } from "react-router-dom";
import { useDeleteRecipeMutation } from "./recipesApiSlice";
import { useGetRecipesQuery } from "../recipes/recipesApiSlice";
import { memo } from "react";

const Recipe = ({ recipeId }) => {
  const { recipe } = useGetRecipesQuery("recipeslist", {
    selectFromResult: ({ data }) => ({
      recipe: data?.entities[recipeId],
    }),
  });

  const navigate = useNavigate();

  const { refetch } = useGetRecipesQuery();

  const [deleteRecipe, { isDelSuccess, isDelError, delerror }] =
    useDeleteRecipeMutation();

  const handleSuppr = async () => {
    // console.log("-------------- handleSuppr DEBUT --------------");
    // console.log("props recipeId: " + recipeId);

    try {
      const result = await deleteRecipe({
        id: recipeId,
      });

      if (result.error) {
        console.log(result.error.data.message);
        console.log("error");
        console.log(result.error);
      } else {
        console.log("Suppression réussie");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }

    // Après une mise à jour réussie, appeler refetch() pour actualiser la liste des utilisateurs
    refetch();
    navigate("/PrivateRoute/homebase");

    // console.log("-------------- handleSuppr FIN --------------");
  };

  if (recipe) {
    const cellStatus = recipe.active ? "" : "table__cell--inactive";
    return (
      <tr className="table__tr">
        <td className={`table__cell ${cellStatus}`}>{recipe.title}</td>
        <td className={`table__cell ${cellStatus}`}>{recipe.author}</td>
        <td className={`table__cell ${cellStatus}`}>{recipe.id}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="icon-button table__button" onClick={handleSuppr}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  }
};

const memoizedRecipe = memo(Recipe);

export default memoizedRecipe; // rerender only if changes in the data
