import React, { useEffect, useRef } from "react";
import NavbarProtect from "../components/NavbarProtect";
import Footer from "../components/Footer";
import MenuPref from "../components/MenuPref";
import MenuPrefNavbarProtect from "../components/MenuPrefNavbarProtect";
import { useDispatch, useSelector } from "react-redux";
import {
  createMenuRecipe,
  resetMenuRecipes,
} from "../feature/menurecipes.slice";
import { setPref } from "../feature/pref.slice";
import {
  editCompoDate,
  resetCompo,
  setCompo,
} from "../feature/menucompo.slice";
import { setStopReset } from "../feature/indicstopreset.slice";
import { deleteListeMenu } from "../feature/menusliste.slice";
import { useNavigate } from "react-router-dom";
import { setStopResetDate } from "../feature/indicstopresetdate.slice";
import {
  useDeleteMenuMutation,
  useAddNewMenuMutation,
  useGetMenusQuery,
} from "../feature/menus/menusApiSlice";
import useAuth from "../hooks/useAuth";

const HomeMenu = () => {
  const { username } = useAuth();
  const liste = useSelector((state) => state.listeRecipes.listeData);
  const listeMenus = useSelector((state) => state.listeMenus.menusData);
  const prefSelected = useSelector((state) => state.prefSelect.prefSelected);
  const compoListeMenu = useSelector((state) => state.menuCompo.compoListe);
  const selectedRecipes = useSelector(
    (state) => state.menuRecipes.menuRecipesData
  );
  const indicStopReset = useSelector((state) => state.indicStopReset.stopReset);
  const indicStopResetDate = useSelector(
    (state) => state.indicStopResetDate.stopResetDate
  );

  let selectedRecipesId = selectedRecipes.map((recipe) => recipe._id);

  let arrayW = [];
  let arrayNew = [];

  let arrayCompo = [];

  let dateDefault = new Date().toISOString().substring(0, 10);
  let nextdayFormat = new Date().toISOString().substring(0, 10);

  let prevPrefSelected = useRef(prefSelected);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { refetch } = useGetMenusQuery();

  const [deleteMenuMutation] = useDeleteMenuMutation();
  const [addNewMenuMutation] = useAddNewMenuMutation();

  const handleDeleteMenu = async (menuId) => {
    // console.log("handleDeleteMenu Début ------------");
    try {
      const response = await deleteMenuMutation({ id: menuId });

      if (response.error) {
        console.error("Failed to delete menu:", response.error);
      } else {
        // console.log("DELETE MENU BDD");
        dispatch(deleteListeMenu(menuId));
      }
    } catch (error) {
      console.error("An error occurred while deleting menu:", error);
    }
    // console.log("handleDeleteMenu Fin ------------");
  };

  const handleAddNewMenu = async (menuData) => {
    try {
      const response = await addNewMenuMutation(menuData);

      if (response.error) {
        console.error("Failed to add new menu:", response.error);
      } else {
        // console.log("Successfully added new menu");
        // Après une mise à jour réussie, appeler refetch()
        refetch();
        navigate("/menusvalides");
      }
    } catch (error) {
      console.error("An error occurred while adding new menu:", error);
    }
  };
  /////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////
  // Initialisation de la date du jour et mémorisation dans la valeur par défaut de dayOne
  const handleDayOne = () => {
    // console.log(
    //   " //////////////   HANDLE DAY ONE     ////////////////////////"
    // );
    if (!prefSelected[2]) {
      // console.log("*******************************************");
      // console.log("Initialisation de la date de début");
      // console.log("*******************************************");
      arrayNew = ["7", "2", dateDefault];
      dispatch(setPref(arrayNew));
    } else {
      console.log("*******************************************");
      console.log("Préférences prises en compte");
      console.log("*******************************************");
    }
    // console.log("prefSelected nb de jours : " + prefSelected[0]);
    // console.log("prefSelected nb repas/j : " + prefSelected[1]);
    // console.log("prefSelected dayOne : " + prefSelected[2]);
    // console.log("*******************************************");
  };
  /////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////

  const handleChangeMenu = () => {
    // console.log("*******************************************");
    // console.log("handleChangeMenu / relance des PREFERENCES");
    // console.log("*******************************************");

    dispatch(resetMenuRecipes());
    dispatch(resetCompo());
    selectedRecipesId = [];
    arrayW = [];
    handlePref(prefSelected);
  };

  //////////////////////////////////////////
  const handleValideMenu = async () => {
    // console.log("*******************************************");
    // console.log("handleValideMenu ");
    // console.log("*******************************************");

    // Création d'un nouveau Menu préparé dans compoListeMenu:
    // console.log("compoListeMenu");
    // console.log(compoListeMenu);

    // Si 1 menu existe déja avec ce dayOne, suppression dans le store et la BDD avant création du nouveau menu
    for (let x = 0; x < listeMenus.length && x < 9000; x++) {
      const menuliste = listeMenus.find(
        (menuliste) =>
          menuliste.prefDayOne === prefSelected[2] &&
          menuliste.user === username
      );
      if (menuliste) {
        // Cas où un Menu existe déjà avec ce dayOne
        console.log(
          "1 MENU EXISTE DEJA AVEC CE DAYONE pour ce user : SUPPRESSION AVANT CREATION"
        );

        handleDeleteMenu(menuliste._id);
        // Après une mise à jour réussie, appeler refetch() pour actualiser la liste des utilisateurs
        refetch();
        // break;
      } else {
        // Cas où aucun Menu n'existe avec ce dayOne
        console.log(
          "AUCUN MENU N'EXISTE AVEC CE DAYONE pour ce user: PAS DE SUPPRESSION AVANT CREATION"
        );
      }
    }

    // composition des menuJ (tableaux des jours du Menu)
    let i = 0;
    arrayW = [];
    while (i < prefSelected[0] && i < 9000) {
      arrayW = [
        ...arrayW,
        [
          compoListeMenu[i].date,
          compoListeMenu[i].meal1Complete._id,
          compoListeMenu[i].meal1Complete.title,
          compoListeMenu[i].type === 2
            ? compoListeMenu[i].meal2Complete._id
            : null,
          compoListeMenu[i].type === 2
            ? compoListeMenu[i].meal2Complete.title
            : null,
        ],
      ];
      //*****************************//
      i++;
    }

    if (i === 9000) {
      console.log("boucle infinie");
    }

    // console.log("arrayW");
    // console.log(arrayW);
    // console.log("POST dans BDD table MENU");

    // Prepare menuData for the API call
    const menuData = {
      user: username, // Auteur du Menu (réservé aux Rôles Abonné et Administrateur)
      prefNbJ: prefSelected[0], // Number of days
      prefNbMeal: prefSelected[1], // Number of meals per day
      prefDayOne: prefSelected[2], // The selected dayOne
      menuJ: arrayW,
    };

    try {
      await handleAddNewMenu(menuData);
    } catch (error) {
      console.error("An error occurred while adding new menu:", error);
    }
    navigate("/menusvalides");
  };

  ////////////////////////////////////////////////////////////////////
  //******************************************************************
  // Récupération d'un Ancien Menu, si nouvelle date de début demandée, ne changer que les dates et garder les repas proposés
  //******************************************************************
  ////////////////////////////////////////////////////////////////////
  const handlePrefRecup = (prefSelected) => {
    // console.log("handlePrefRecup");

    ///////////////////////////////////////////////////////
    // Constitution du tableau des jours et des recettes
    // en gardant les recettes et en changeant seulement les dates
    // dans menuCompo
    //////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////
    // Constitution du tableau des jours et des recettes
    // en ne modifiant que les dates car Menu Récupéré
    //////////////////////////////////////////////////////
    let firstday = new Date(prefSelected[2]);
    let nextday = new Date(firstday);

    for (let j = 0; j < prefSelected[0] && j < 9000; j++) {
      // nextday.setDate(firstday.getDate() + j);
      if (j !== 0) {
        nextday.setDate(nextday.getDate() + 1);
      }
      // console.log("*** calcul des jours *** index : " + j);

      nextdayFormat = nextday.toLocaleDateString("fr-FR");
      // console.log("nextdayFormat : " + nextdayFormat);

      dispatch(editCompoDate([j, nextdayFormat]));
    }

    dispatch(setStopResetDate(false));
    dispatch(setStopReset(false));
  };

  ////////////////////////////////////////////////////////////////////
  //******************************************************************
  // Sélection d'une liste aléatoire de recettes selon les préférences nb de jours prefSelected[0] et nb de repas/jour prefSelected[1]
  // MODIF 20240625 : choisir des recettes dont la saison
  // contient prefSelected[2]
  // sachant que
  // si    01/05 <= prefSelected[2] <= 30/06  alors season = printemps
  // si    01/07 <= prefSelected[2] <= 31/10  alors season = été
  // si    01/11 <= prefSelected[2] <= 31/12  alors season = automne
  // si    01/01 <= prefSelected[2] <= 30/04  alors season = hiver

  // Function to determine the season based on a given date
  // MODIF 20240625
  const getSeason = (date) => {
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const day = date.getDate();

    if ((month === 5 && day >= 1) || (month === 6 && day <= 30)) {
      return "printemps";
    } else if ((month === 7 && day >= 1) || (month >= 8 && month <= 10)) {
      return "été";
    } else if ((month === 11 && day >= 1) || (month === 12 && day <= 31)) {
      return "automne";
    } else {
      return "hiver";
    }
  };

  //******************************************************************
  ////////////////////////////////////////////////////////////////////
  const handlePref = (prefSelected) => {
    // console.log("handlePref");
    // console.log("liste");
    // console.log(liste);
    // Si la date n'est pas définie, utiliser la date du jour
    const recipeDate = prefSelected[2] ? new Date(prefSelected[2]) : new Date();

    /////////////////////////////////////////////////////////////////////////////
    // Calcul du nombre de recettes à sélectionner : nb de jours * nb de repas/j
    /////////////////////////////////////////////////////////////////////////////
    const numRecipes = prefSelected[0] * prefSelected[1];
    arrayW = [];
    // console.log("numRecipes : " + numRecipes);
    // console.log("prefSelected");
    // console.log(prefSelected);

    ///////////////////////////////////////////////////////////////////////////
    // Contrôle du nombre de recettes avant constitution de la liste aléatoire
    ///////////////////////////////////////////////////////////////////////////
    if (liste.length < numRecipes) {
      console.log(
        "***********************************************************"
      );
      console.log(
        "********ATTENTION, PAS ASSEZ DE RECETTES DANS LA LISTE ****"
      );
      console.log(
        "***********************************************************"
      );
      console.log("Nbre de Recettes total : " + liste.length);
    } else {
      // console.log("Nbre de Recettes total : " + liste.length);

      // MODIF 20240625

      const season = getSeason(recipeDate);
      console.log("saison correspondant à la date du Menu");
      console.log(prefSelected[2]);
      console.log(recipeDate);
      console.log(season);
      console.log("LISTE AVANT FILTRE SAISON");
      console.log(liste);

      const filteredRecipes = liste.filter((recipe) => {
        return recipe.seasons.includes(season);
      });

      console.log("LISTE APRES FILTRE SAISON");
      console.log(filteredRecipes);

      /////////////////////////////////////////////////////
      // Constitution de la liste de recettes aléatoires
      /////////////////////////////////////////////////////
      if (filteredRecipes.length < numRecipes) {
        console.log("Pas assez de recettes pour la saison sélectionnée");
      } else {
        let i = 0;
        while (arrayW.length < numRecipes && i < 9000) {
          // MODIF 20240625
          // const randomIndex = Math.floor(Math.random() * liste.length);
          const randomIndex = Math.floor(
            Math.random() * filteredRecipes.length
          );
          // MODIF 20240625
          // const randomRecipe = liste[randomIndex];
          const randomRecipe = filteredRecipes[randomIndex];
          if (!selectedRecipesId.includes(randomRecipe._id)) {
            // console.log("Id à sélectionner : " + i + " / " + randomRecipe._id);
            arrayW.push(randomRecipe);
            dispatch(createMenuRecipe(randomRecipe));
            selectedRecipesId.push(randomRecipe._id);
          }
          // else {
          //   console.log("Id déja inclus : " + i + " / " + randomRecipe._id);
          // }
          i++;
        }
        // console.log("arrayW");
        // console.log(arrayW);
        if (i === 9000) {
          console.log("boucle infinie");
        }

        ///////////////////////////////////////////////////////
        // Constitution du tableau des jours et des recettes
        //////////////////////////////////////////////////////
        let firstday = new Date(prefSelected[2]);
        let nextday = new Date(firstday);
        let jMeal = 0;

        arrayCompo = [];
        let newCompo = {};

        for (let j = 0; j < prefSelected[0] && j < 9000; j++) {
          // nextday.setDate(firstday.getDate() + j);
          if (j !== 0) {
            nextday.setDate(nextday.getDate() + 1);
          }
          // console.log("*** calcul des jours *** index : " + j);

          nextdayFormat = nextday.toLocaleDateString("fr-FR");
          // console.log("nextdayFormat : " + nextdayFormat);

          if (prefSelected[1] === 1) {
            newCompo = {
              index: j,
              type: 1,
              date: nextdayFormat,
              meal1Complete: arrayW[j],
              meal1: arrayW[j].title,
              meal2Complete: null,
              meal2: null,
            };
            arrayCompo = [...arrayCompo, newCompo];
            // console.log("arrayCompo");
            // console.log(arrayCompo);

            dispatch(setCompo(arrayCompo));
          } else {
            jMeal = j * 2;
            const meal1 = arrayW[jMeal].title;
            // console.log("meal1 : " + meal1);
            const meal2 = arrayW[jMeal + 1].title;
            // console.log("meal2 : " + meal2);

            newCompo = {
              index: j,
              type: 2,
              date: nextdayFormat,
              meal1Complete: arrayW[jMeal],
              meal1: meal1,
              meal2Complete: arrayW[jMeal + 1],
              meal2: meal2,
            };
            arrayCompo = [...arrayCompo, newCompo];
            // console.log("arrayCompo");
            // console.log(arrayCompo);
            dispatch(setCompo(arrayCompo));
          }
        }
      }
    }
  };

  useEffect(() => {
    // Vérifiez si les données de recette sont manquantes ou non initialisées
    if (!liste || liste.length === 0) {
      console.log(
        "Accès direct ???? REDIRECTION /PrivateRoute/HomeListeRecettesProtect"
      );
      // Redirigez immédiatement l'utilisateur vers la page d'accueil ou une autre page appropriée
      navigate("/PrivateRoute/HomeListeRecettesProtect", { replace: true });
    }
  }, [liste, navigate]);

  if (!liste || liste.length === 0) {
    // Si liste des recettes est vide, il ne faut pas rendre le composant
    return null;
  }

  useEffect(() => {
    // console.log("*******************************************");
    // console.log("useEffect HOME MENU prise en compte PREFERENCES");
    // console.log("*******************************************");
    //********** Gestion de dayOne */
    // console.log("Gestion de dayOne");
    // console.log(prefSelected[2]);
    handleDayOne();
    //*********** */
    // console.log("indicStopReset :");
    // console.log(indicStopReset);
    // console.log("indicStopResetDate");
    // console.log(indicStopResetDate);
    // console.log("prevPrefSelected.current :");
    // console.log(prevPrefSelected.current);
    // console.log("prefSelected :");
    // console.log(prefSelected);
    // console.log("liste");
    // console.log(liste);

    if (indicStopReset || indicStopResetDate) {
      // console.log(
      //   "**************** indicStopReset ou indicStopResetDate true ******************"
      // );
      // console.log(
      //   "********  on ne reset pas MenuRecipes et menuCompo*********"
      // );

      if (indicStopResetDate) {
        // console.log(
        //   "**************** indicStopResetDate true ******************"
        // );
        // console.log("**************** changement des dates ******************");
        if (prefSelected !== prevPrefSelected.current) {
          // console.log(
          //   "prevPrefSelected.current et prefSelected sont différents"
          // );
          // console.log("prevPrefSelected.current :");
          // console.log(prevPrefSelected.current);
          // console.log("prefSelected :");
          // console.log(prefSelected);
          // Ajout de la vérification du changement de prefSelected car le useEffect lance la fonction même si prefSelected n'a pas changé lorsque le composant monte la première fois
          handlePrefRecup(prefSelected);
          // Stocker la valeur de prefSelected pour la prochaine exécution
          prevPrefSelected.current = prefSelected;
        }
        // else {
        //   console.log(
        //     "prevPrefSelected.current et prefSelected sont égaux, composant monté pour la première fois, on ne fait rien"
        //   );
        //   console.log("prevPrefSelected.current :");
        //   console.log(prevPrefSelected.current);
        //   console.log("prefSelected :");
        //   console.log(prefSelected);
        // }
      }
    } else {
      // console.log("**************** indicStopReset false ******************");
      // console.log("********  RESET de MenuRecipes et menuCompo*********");
      dispatch(resetMenuRecipes());
      dispatch(resetCompo());
      selectedRecipesId = [];
      arrayW = [];
      handlePref(prefSelected);
    }
  }, [prefSelected]);

  let content;

  content = (
    <div className="homemenu">
      <div className="nav-container">
        <NavbarProtect />
      </div>
      <div className="homemenu-content">
        <div className="homemenu-text">
          <h1>Menu de la semaine</h1>
          <MenuPrefNavbarProtect
            handleChangeMenu={handleChangeMenu}
            handleValideMenu={handleValideMenu}
            handlePref={handlePref}
          />
          <div className="menucard-container">
            <MenuPref />
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );

  return content;
};

export default HomeMenu;
