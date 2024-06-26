import { useGetRecipesQuery } from "./recipesApiSlice";
import Recipe from "./Recipe";
import { NavLink, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";

const RecipesList = () => {
  // Gestion des Recettes - ADMIN
  const { username, isAdmin, isAbo, isInscrit } = useAuth();

  const {
    data: recipes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRecipesQuery("recipeslist", {
    pollingIntervall: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();

  const [
    sendLogout,
    {
      isLoading: logoutIsLoading,
      isSuccess: logoutIsSuccess,
      isError: logoutIsError,
      error: logoutError,
    },
  ] = useSendLogoutMutation();

  let content;

  if (isLoading)
    // content = <p>Loading...</p>;
    content = (
      <div>
        <PulseLoader color="#FFF" />
      </div>
    );

  const handleLogout = async () => {
    // console.log("handleLogout");
    try {
      await sendLogout();
    } catch (err) {
      console.log("err : ");
      console.log(err);
    }
    navigate("/");
  };

  const handleHome = async () => {
    // console.log("handleHome");
    if (isAdmin || isAbo || isInscrit) {
      navigate("/PrivateRoute/HomeListeRecettesProtect");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    // Défilement vers le haut de la page au chargement
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    content = (
      <div>
        <div className="title-errmsg">
          <h1>Gestion des Recettes</h1>
        </div>
        <h3 className="errmsg">{error?.data?.message}</h3>
        <div>
          <h3 className="errmsg-link" onClick={() => handleHome()}>
            Accueil&nbsp;
            <i className="fa-solid fa-house"></i>
          </h3>
          <h3 className="errmsg-link" onClick={() => handleLogout()}>
            Déconnexion&nbsp;
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </h3>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    const { ids } = recipes;

    const tableContent = ids?.length
      ? ids.map((recipeId) => <Recipe key={recipeId} recipeId={recipeId} />)
      : null;

    content = (
      <div className="gestion-admin-recipes">
        <div className="title-admin">
          <h1>Gestion des Recettes</h1>
          <h3>
            <NavLink to="/PrivateRoute/HomeListeRecettesProtect">
              <i className="fa-solid fa-house"></i>
            </NavLink>
          </h3>
        </div>
        <table className="table table--recipes">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th recipe__title">
                Titre
              </th>
              <th scope="col" className="table__th recipe__author">
                Auteur
              </th>
              <th scope="col" className="table__th recipe__id">
                Id
              </th>
              <th scope="col" className="table__th recipe__edit">
                Suppr
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return content;
};

export default RecipesList;
