import React, { useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getListe } from "../feature/liste.slice";
import { setSort } from "../feature/sort.slice";
import { useGetRecipesQuery } from "../feature/recipes/recipesApiSlice";

const ListeRecettes = () => {
  const dispatch = useDispatch();
  // const liste = useSelector((state) => state.listeRecipes.listeData);

  const sortSelected = useSelector((state) => state.sortSelect.sortSelected);

  // Execute the query and fetch data
  const { data, error, isLoading, isSuccess } = useGetRecipesQuery();

  // Récupération de la liste de recettes dans la BDD et dispatch dans le store

  // useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/recipe/")
  //       .then((res) => dispatch(getListe(res.data)))
  //       .then(() => dispatch(setSort(["Croissant", null, null])));

  //   dispatch(setSort(["Croissant", null, null]));
  // }, []);

  // Create 'liste' based on 'data'

  const liste = isSuccess
    ? data.ids.map((recipeId) => {
        const recipe = data.entities[recipeId];
        return {
          _id: recipe._id,
          title: recipe.title,
          author: recipe.author,
          seasons: recipe.seasons,
          ingredients: recipe.ingredients,
          quantities: recipe.quantities,
          categories: recipe.categories,
          steps: recipe.steps,
        };
      })
    : [];

  // console.log("liste après constitution à partir de data ****************");
  // console.log(liste);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getListe(liste));
    }
  }, [isSuccess, liste, dispatch]);

  useEffect(() => {
    dispatch(setSort(["Croissant", null, null]));
  }, [dispatch]);

  return (
    <div className="recipescards-liste">
      {isLoading && <div>Loading...</div>}{" "}
      {/* Display a loading indicator while fetching data */}
      {isSuccess &&
        liste &&
        liste
          .slice()
          //////////////////////////////////
          // TRI sur la SAISON
          /////////////////////////////////
          .filter((recipe) => {
            if (sortSelected[1]) {
              if (recipe.seasons.includes(sortSelected[1])) {
                // console.log("Tri Saison filter : " + sortSelected[1]);
                return recipe;
              }
            } else return recipe;
          })
          ///////////////////////////////
          // TRI sur le MOT-CLE
          ///////////////////////////////
          .filter((recipe) => {
            if (sortSelected[2]) {
              if (
                recipe.title
                  .toLowerCase()
                  .includes(sortSelected[2].toLowerCase()) ||
                recipe.ingredients.some((ingr) =>
                  ingr.toLowerCase().includes(sortSelected[2].toLowerCase())
                )
              ) {
                // console.log(
                //   "Tri Mot-Clé  filter titre et ingrédients: " + sortSelected[2]
                // );
                return recipe;
              }
            } else {
              return recipe;
            }
          })
          //////////////////////////////////////////
          // TRI CROISSANT ou DECROISSANT
          /////////////////////////////////////////
          .sort((a, b) => {
            switch (sortSelected[0]) {
              case "Decroissant":
                return b.title.localeCompare(a.title);
              case "Croissant":
                return a.title.localeCompare(b.title);
              default:
                console.log("Cas qui ne devrait pas arriver");
            }
          })
          .map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)}
      {error && (
        <div>
          Error: {error.message}{" "}
          {/* Display an error message if the query fails */}
        </div>
      )}
    </div>
  );
};

export default ListeRecettes;
