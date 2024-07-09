import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DayCard from "./DayCard";
import { setPref } from "../feature/pref.slice";
import { setCompo } from "../feature/menucompo.slice";
import {
  useDeleteMenuMutation,
  useGetMenusQuery,
} from "../feature/menus/menusApiSlice";

import {
  createMenuRecipe,
  resetMenuRecipes,
} from "../feature/menurecipes.slice";
import { deleteListeMenu } from "../feature/menusliste.slice";

// import axios from "axios";
import { setStopReset } from "../feature/indicstopreset.slice";
import { setStopResetDate } from "../feature/indicstopresetdate.slice";
import CheeseburgerFont from "../assets/fonts/Cheeseburger.otf"; // Importer la police
import * as fontkit from "fontkit";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import jsPDF from "jspdf"; // Importer jsPDF
// import JSZip from "jszip";
import { saveAs } from "file-saver";
import pdfMenu from "../assets/img/FondMenu.pdf"; // Importer l'image

const MenusListeCard = ({ menu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [message, setMessage] = useState("");
  const [deleteMenuMutation] = useDeleteMenuMutation();
  const { refetch } = useGetMenusQuery();
  const liste = useSelector((state) => state.listeRecipes.listeData);

  let arrayNew = [];

  // **** GESTION FORMAT DATE **********************************

  let dDay = new Date(menu.prefDayOne);
  let dayFormat = new Date().toISOString().substring(0, 10);
  let nextdayFormat = new Date().toISOString().substring(0, 10);

  dayFormat = dDay.toLocaleDateString("fr-FR");

  // ***********************************************
  // Choix d'un menu => mise en phase des préférences dans le store
  // prefSelect / prefSelected
  // ***********************************************
  const handlePhasePref = (menu) => {
    arrayNew = [menu.prefNbJ, menu.prefNbMeal, menu.prefDayOne];
    dispatch(setPref(arrayNew));
  };

  // Choix d'un menu => mise en phase des de la compo du Menu
  // dans le store : menuCompo / compoListe
  // Choix d'un menu => mise en phase des recettes du Menu
  // dans le store : menuRecipes / menuRecipesData
  const handlePhaseMenuCompo = (menu) => {
    // console.log("*******************************************");
    // console.log("Alimentation de compoListe et de menuRecipesData");
    // console.log("*******************************************");

    // Alimentation de arrayW avec la liste des id des recettes du Menu

    let arrayW = [];
    // console.log("Nbre de jours du Menu : ");
    // console.log(menu.prefNbJ);

    menu.menuJ.forEach((dayMenu) => {
      if (menu.prefNbMeal === 2) {
        arrayW = [...arrayW, dayMenu[1], dayMenu[3]];
      } else {
        arrayW = [...arrayW, dayMenu[1]];
      }
    });

    // console.log("liste des ids du Menu");
    // console.log(arrayW);

    // Récupération des recettes complètes à partir des id, pour alimentation de menuRecipes

    let arrayRecipes = [];
    dispatch(resetMenuRecipes());

    for (let k = 0; k < arrayW.length && k < 9000; k++) {
      const recipe = liste.find((recipe) => recipe._id === arrayW[k]);
      if (recipe) {
        arrayRecipes = [...arrayRecipes, recipe];
        dispatch(createMenuRecipe(recipe));
      }
      if (k === 9000) {
        console.log("boucle k infinie");
      }
    }

    // console.log("liste des recettes du Menu");
    // console.log(arrayRecipes);

    // Alimentation de menuCompo

    let firstday = new Date(menu.prefDayOne);
    // let nextday = new Date(menu.prefDayOne);
    let nextday = new Date(firstday);

    let jMeal = 0;

    let arrayCompo = [];
    let newCompo = {};

    for (let j = 0; j < menu.prefNbJ && j < 9000; j++) {
      // nextday.setDate(firstday.getDate() + j);
      if (j !== 0) {
        nextday.setDate(nextday.getDate() + 1);
      }
      // console.log("*** calcul des jours *** index : " + j);

      nextdayFormat = nextday.toLocaleDateString("fr-FR");
      // console.log("nextdayFormat : " + nextdayFormat);

      // Alimentation de menuCompo lorsqu'il n'y a qu'un repas/jour
      if (menu.prefNbMeal === 1) {
        newCompo = {
          index: j,
          type: 1,
          date: nextdayFormat,
          meal1Complete: arrayRecipes[j],
          meal1: arrayRecipes[j].title,
          meal2Complete: null,
          meal2: null,
        };
        arrayCompo = [...arrayCompo, newCompo];
        // console.log("arrayCompo");
        // console.log(arrayCompo);

        dispatch(setCompo(arrayCompo));
      } else {
        // Alimentation de menuCompo lorsqu'il y a 2 repas/jour
        jMeal = j * 2;
        const meal1 = arrayRecipes[jMeal].title;
        // console.log("meal1 : " + meal1);
        const meal2 = arrayRecipes[jMeal + 1].title;
        // console.log("meal2 : " + meal2);

        newCompo = {
          index: j,
          type: 2,
          date: nextdayFormat,
          meal1Complete: arrayRecipes[jMeal],
          meal1: meal1,
          meal2Complete: arrayRecipes[jMeal + 1],
          meal2: meal2,
        };
        arrayCompo = [...arrayCompo, newCompo];
        // console.log("arrayCompo");
        // console.log(arrayCompo);
        dispatch(setCompo(arrayCompo));
      }
    }
  };

  // ***********************************************************
  // Clic sur le bouton Générer Liste de courses
  // ***********************************************************

  const handleListeCourses = (menu) => {
    // console.log("handleListeCourses : " + menu.prefDayOne);
    handlePhasePref(menu);
    handlePhaseMenuCompo(menu);
    navigate("/listecourses");
  };

  // ***********************************************************
  // Clic sur le bouton Générer le Menu en PDF
  // Et les Recettes détaillées en PDF, 1 par page
  // ***********************************************************

  const handlePDFMenu = async (menu) => {
    console.log("handlePDFMenu : ");
    // Créez une instance de JSZip pour créer le fichier ZIP
    // const zip = new JSZip();

    // URL du fichier Menu en PDF

    const existingPdfBytesMenu = await fetch(pdfMenu).then((res) =>
      res.arrayBuffer()
    );
    const pdfDocMenu = await PDFDocument.load(existingPdfBytesMenu);
    // Enregistrer fontkit
    pdfDocMenu.registerFontkit(fontkit);

    const cheeseburgerFontBytes = await fetch(CheeseburgerFont).then((res) =>
      res.arrayBuffer()
    );
    const customFont = await pdfDocMenu.embedFont(cheeseburgerFontBytes);
    const helveticaFont = await pdfDocMenu.embedFont(StandardFonts.Helvetica);

    // **************************
    // Sélectionnez la première page du PDF (index 0)
    const pages = pdfDocMenu.getPages();
    let firstPage = pages[0];

    // Position (x, y) pour le texte à tamponner

    const addText = (text, x, y, size = 22) => {
      firstPage.drawText(text, {
        x,
        y,
        size,
        font: customFont,
        color: rgb(0, 0, 0),
      });
    };

    const pageWidth = 595.28; // Standard A4 page width in points
    let containsAsterisk = false;

    for (let index = 0; index < menu.menuJ.length; index++) {
      const dayMenu = menu.menuJ[index];
      const day = new Date(menu.prefDayOne);
      // day.setDate(day.getDate() + index);
      // const dayFormat = day.toLocaleDateString("fr-FR");

      // let mealDetails = `Jour ${index + 1} (${dayFormat}): `;
      // let mealDetails = `Jour ${index + 1} : `;
      let mealDetails = ``;
      let symbolWidth = null;
      let symbolX = null;
      if (menu.prefNbMeal === 1) {
        mealDetails = `${menu.menuJ[index][2] ? menu.menuJ[index][2] : ""}`;
        // centrer le texte
        symbolWidth = customFont.widthOfTextAtSize(mealDetails, 22);
        symbolX = (pageWidth - symbolWidth) / 2;
        // addText(mealDetails, 75, 650 + index * -60);
        addText(mealDetails, symbolX, 650 + index * -60);
        mealDetails = "< < < > > >";
        // centrer le texte
        symbolWidth = customFont.widthOfTextAtSize(mealDetails, 22);
        symbolX = (pageWidth - symbolWidth) / 2;
        // addText(mealDetails, 245, 620 + index * -60);
        addText(mealDetails, symbolX, 620 + index * -60, 18);
        if (menu.menuJ[index][2] || menu.menuJ[index][2].includes("*")) {
          containsAsterisk = true;
        }
      } else {
        mealDetails = `${menu.menuJ[index][2] ? menu.menuJ[index][2] : ""}`;
        // centrer le texte
        symbolWidth = customFont.widthOfTextAtSize(mealDetails, 22);
        symbolX = (pageWidth - symbolWidth) / 2;
        // addText(mealDetails, 75, 650 + index * -60);
        addText(mealDetails, symbolX, 650 + index * -80);
        mealDetails = `${menu.menuJ[index][4] ? menu.menuJ[index][4] : ""}`;
        // centrer le texte
        symbolWidth = customFont.widthOfTextAtSize(mealDetails, 22);
        symbolX = (pageWidth - symbolWidth) / 2;
        // addText(mealDetails, 75, 650 + (index * -60 - 30));
        addText(mealDetails, symbolX, 620 + index * -80);
        mealDetails = "< < < > > >";
        // centrer le texte
        symbolWidth = customFont.widthOfTextAtSize(mealDetails, 22);
        symbolX = (pageWidth - symbolWidth) / 2;
        // addText(mealDetails, 245, 610 + index * -60);
        addText(mealDetails, symbolX, 595 + index * -80, 18);
        // Check for asterisk in meal details
        if (menu.menuJ[index][2] || menu.menuJ[index][2].includes("*")) {
          containsAsterisk = true;
        }
        if (menu.menuJ[index][4] || menu.menuJ[index][4].includes("*")) {
          containsAsterisk = true;
        }
      }
      // doc.text(mealDetails, 10, 20 + index * 10);
    }

    // Add a line at the bottom if any meal contains "*"
    if (containsAsterisk) {
      addText(
        "* Temps de trempage depuis la veille recommandé (plus digeste) mais facultatif",
        25,
        60,
        16
      );
    }
    // Générez le fichier PDF modifié
    const modifiedPdfBytesMenu = await pdfDocMenu.save();
    const blob = new Blob([modifiedPdfBytesMenu], { type: "application/pdf" });
    saveAs(blob, "MenuSemaine.pdf");
    // doc.save("MenuSemaine.pdf");
  };

  // ***********************************************************
  // Clic sur le bouton Supprimer le Menu Validé
  // ***********************************************************

  const handleDeleteMenuValide = async (menu) => {
    console.log("handleDeleteMenuValide : " + menu.prefDayOne);

    try {
      // Call the deleteMenu mutation with the menu id
      const response = await deleteMenuMutation({ id: menu._id });

      // Check if the mutation was successful
      if (response.error) {
        console.error("Failed to delete menu:", response.error);
      } else {
        console.log("DELETE MENU BDD");
        dispatch(deleteListeMenu(menu._id));

        // Après une mise à jour réussie, appeler refetch() pour actualiser la liste des utilisateurs
        refetch();
        navigate("/menusvalides");
      }
    } catch (error) {
      console.error("An error occurred while deleting menu:", error);
    }
  };

  // ***********************************************************
  // Clic sur le bouton Récupérer un ancien Menu Validé
  // ***********************************************************
  const handleRecupMenu = (menu) => {
    // console.log("handleRecupMenu : " + menu.prefDayOne);
    // on indique qu'il ne faut pas changer la date des préférences
    // on indique qu'il ne faut pas recharger un menu aléatoire
    dispatch(setStopResetDate(true));
    dispatch(setStopReset(true));
    // Appel mise en phase des préférences dans le store
    // prefSelect / prefSelected
    handlePhasePref(menu);

    // Appel mise en phase des de la compo du Menu
    // dans le store : menuCompo / compoListe
    // Appel mise en phase des recettes du Menu
    // dans le store : menuRecipes / menuRecipesData
    handlePhaseMenuCompo(menu);

    // on indique qu'il ne faut pas recharger un menu aléatoire
    dispatch(setStopReset(true));
    navigate("/homemenu");
  };

  return (
    <div className="menusliste-card">
      <div className="menusliste-card-content">
        <div className="button-container">
          <h3>Semaine du {dayFormat}</h3>

          <div className="box-copy" onClick={() => handleRecupMenu(menu)}>
            <i className="fa-solid fa-copy"></i>
          </div>
          <div className="box-basket" onClick={() => handleListeCourses(menu)}>
            <i className="fa-solid fa-basket-shopping"></i>
          </div>
          <div className="box-pdf-menu" onClick={() => handlePDFMenu(menu)}>
            <i className="fa-solid fa-file-pdf"></i>
          </div>
          <div
            className="box-delete"
            onClick={() => handleDeleteMenuValide(menu)}
          >
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>

        <div className="days-liste">
          {menu.menuJ.map((dayMenu) => (
            <DayCard key={dayMenu[0]} dayMenu={dayMenu} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenusListeCard;
