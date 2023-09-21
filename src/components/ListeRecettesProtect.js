import React, { useEffect } from "react";
import RecipeCardProtect from "../components/RecipeCardProtect";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getListe } from "../feature/liste.slice";
import { setSort } from "../feature/sort.slice";
import { useGetRecipesQuery } from "../feature/recipes/recipesApiSlice";
import { PulseLoader } from "react-spinners";

const ListeRecettesProtect = () => {
  const dispatch = useDispatch();
  // const liste = useSelector((state) => state.listeRecipes.listeData);

  const sortSelected = useSelector((state) => state.sortSelect.sortSelected);

  // Execute the query and fetch data
  const { data, error, isLoading, isSuccess } = useGetRecipesQuery();

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

  // Récupération de la liste de recettes dans la BDD et dispatch dans le store
  useEffect(() => {
    if (isSuccess) {
      dispatch(getListe(liste));
    }
    dispatch(setSort(["Croissant", null, null]));
  }, [dispatch]);

  return (
    <div className="recipescards-liste">
      {/* {isLoading && <div>Loading...</div>}{" "} */}
      {isLoading && (
        <div>
          <PulseLoader color="#FFF" />
        </div>
      )}
      {/* Display a loading indicator while fetching data */}
      {isSuccess &&
        liste &&
        liste
          .slice()
          //////////////////////////////////
          // TRI sur la SAISON
          /////////////////////////////////
          .filter((recipe) => {
            // saison renseignée et différente de "saison" => une saison précise
            if (
              sortSelected[1] &&
              sortSelected[1] !== "saison" &&
              sortSelected[1] !== "toutes"
            ) {
              if (recipe.seasons.includes(sortSelected[1])) {
                return recipe;
              }
            }
            // recette toute saison : recette avec les saisons toutes cochées ou aucune
            else if (sortSelected[1] === "toutes") {
              if (
                (recipe.seasons.includes("printemps") &&
                  recipe.seasons.includes("été") &&
                  recipe.seasons.includes("automne") &&
                  recipe.seasons.includes("hiver")) ||
                recipe.seasons.length === 0
              ) {
                return recipe;
              }
            }
            // saison non renseignée dans la barre de tri => n'importe quelle saison, on renvoie toutes les recettes
            else {
              return recipe;
            }
          })
          ///////////////////////////////
          // TRI sur le MOT-CLE
          ///////////////////////////////
          .filter((recipe) => {
            if (sortSelected[2]) {
              if (
                // normalisation du mot-clé et du titre pour comparer
                // sans les accents
                recipe.title
                  .normalize("NFD")
                  .replace(/\p{Diacritic}/gu, "")
                  .toUpperCase()
                  .includes(
                    sortSelected[2]
                      .normalize("NFD")
                      .replace(/\p{Diacritic}/gu, "")
                      .toUpperCase()
                  ) ||
                recipe.ingredients.some((ingr) =>
                  ingr
                    .normalize("NFD")
                    .replace(/\p{Diacritic}/gu, "")
                    .toUpperCase()
                    .includes(
                      sortSelected[2]
                        .normalize("NFD")
                        .replace(/\p{Diacritic}/gu, "")
                        .toUpperCase()
                    )
                )
              ) {
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
          .map((recipe) => (
            <RecipeCardProtect key={recipe._id} recipe={recipe} />
          ))}
      {error && (
        <div>
          Error: {error.message}{" "}
          {/* Display an error message if the query fails */}
        </div>
      )}
    </div>
  );
};

export default ListeRecettesProtect;
