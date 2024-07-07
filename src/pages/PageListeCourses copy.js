import React, { useEffect } from "react";
import Footer from "../components/Footer";
import NavbarProtect from "../components/NavbarProtect";
import ShoppingCardsList from "../components/ShoppingCardsList";
import CheeseburgerFont from "../assets/fonts/Cheeseburger.otf";
import * as fontkit from "fontkit";
import { PDFDocument, rgb } from "pdf-lib";
// import jsPDF from "jspdf"; // Importer jsPDF
// import JSZip from "jszip";
import { saveAs } from "file-saver";
import pdfMenu from "../assets/img/FondMenu.pdf";
import pdfCourses from "../assets/img/FondCourses.pdf"; // Importer l'image
import pdfRecettes from "../assets/img/FondRecettes.pdf"; // Importer l'image
import { useSelector } from "react-redux";

const PageListeCourses = () => {
  // Récupération de la liste de courses selon catégorie
  // Pour écriture dans un PDF
  const listeFL = useSelector(
    (state) => state.listeCourses.listeCoursesData[0]
  );
  const listeFR = useSelector(
    (state) => state.listeCourses.listeCoursesData[1]
  );
  const listeEP = useSelector(
    (state) => state.listeCourses.listeCoursesData[2]
  );

  // Récupération de la composition du Menu pour afficher
  // le détail des Recettes en PDF
  const menuCompo = useSelector((state) => state.menuCompo.compoListe);

  useEffect(() => {
    // Défilement vers le haut de la page au chargement
    window.scrollTo(0, 0);
  }, []);

  // ***********************************************************
  // Clic sur le bouton Générer le Menu en PDF
  // ***********************************************************

  const handlePDFCourses = async () => {
    // Créez une instance de JSZip pour créer le fichier ZIP
    // const zip = new JSZip();

    // Préparation du PDF
    const existingPdfBytesCourses = await fetch(pdfCourses).then((res) =>
      res.arrayBuffer()
    );
    const pdfDocCourses = await PDFDocument.load(existingPdfBytesCourses);
    // Enregistrer fontkit
    pdfDocCourses.registerFontkit(fontkit);

    const cheeseburgerFontBytes = await fetch(CheeseburgerFont).then((res) =>
      res.arrayBuffer()
    );
    const customFont = await pdfDocCourses.embedFont(cheeseburgerFontBytes);

    // **************************
    // Sélectionnez la première page du PDF (index 0)
    const pages = pdfDocCourses.getPages();
    let firstPage = pages[0];

    // Position (x, y) pour le texte à tamponner

    const addText = (text, x, y, size = 10) => {
      firstPage.drawText(text, {
        x,
        y,
        size,
        font: customFont,
        color: rgb(0, 0, 0),
      });
    };

    // const pageWidth = 595.28; // Standard A4 page width in points

    // Define positions for each category
    let xPositionFL = 30; // Starting X position for Fruits/Légumes
    let xPositionFR = 215; // Starting X position for Frais
    let xPositionEP = 400; // Starting X position for Epicerie
    let yPositionFL = 740; // Starting Y position for Fruits/Légumes
    let yPositionFR = 740; // Starting Y position for Frais
    let yPositionEP = 740; // Starting Y position for Epicerie

    // Ecrire dans le PDF les lignes de la catégorie Fruits et Légumes
    listeFL.ingredients.forEach((ingredient) => {
      addText(`${ingredient[0]}: ${ingredient[1]}`, xPositionFL, yPositionFL);
      yPositionFL -= 12; // Move to next line
    });
    // Ecrire dans le PDF les lignes de la catégorie Frais
    listeFR.ingredients.forEach((ingredient) => {
      addText(`${ingredient[0]}: ${ingredient[1]}`, xPositionFR, yPositionFR);
      yPositionFR -= 12; // Move to next line
    });

    // Ecrire dans le PDF les lignes de la catégorie Epicerie
    listeEP.ingredients.forEach((ingredient) => {
      addText(`${ingredient[0]}: ${ingredient[1]}`, xPositionEP, yPositionEP);
      yPositionEP -= 12; // Move to next line
    });

    // Générez le fichier PDF modifié
    const modifiedPdfBytesCourses = await pdfDocCourses.save();
    const blob = new Blob([modifiedPdfBytesCourses], {
      type: "application/pdf",
    });
    saveAs(blob, "CoursesSemaine.pdf");
  };

  const handlePDFRecettes = async () => {
    // Préparation du PDF
    const existingPdfBytesRecettes = await fetch(pdfRecettes).then((res) =>
      res.arrayBuffer()
    );

    const pdfDocRecettes = await PDFDocument.load(existingPdfBytesRecettes);
    // Enregistrer fontkit
    pdfDocRecettes.registerFontkit(fontkit);

    const cheeseburgerFontBytes = await fetch(CheeseburgerFont).then((res) =>
      res.arrayBuffer()
    );
    const customFont = await pdfDocRecettes.embedFont(cheeseburgerFontBytes);

    // **************************
    // Position (x, y) pour le texte à tamponner

    const addText = (page, text, x, y, size = 12) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: customFont,
        color: rgb(0, 0, 0),
      });
    };

    const createPage = async () => {
      const [existingPage] = await pdfDocRecettes.copyPages(pdfDocRecettes, [
        0,
      ]);
      const page = pdfDocRecettes.addPage(existingPage);
      return page;
    };

    // Sélectionnez la première page du PDF (index 0)
    let currentPage = await createPage();
    // const pages = pdfDocRecettes.getPages();
    // let currentPage = pages[0];
    // Define positions for each category
    let xPositionTitle = 90;
    let xPositionIng = 60;
    let xPositionStep = 40;
    let xPositionPageNb = 270;
    let yPositionTitle = 780;
    let yPositionIng = 705;
    let yPositionStep = 380;
    let yPositionPageNb = 30;
    let pageNumber = 1;

    // Boucle pour traiter chaque ligne de menuCompo
    for (let k = 0; k < menuCompo.length && k < 5000; k++) {
      // Si menuCompo[i].type === 1
      // on traite une recette par ligne
      if (menuCompo[k].type === 1) {
        addText(
          currentPage,
          `${menuCompo[k].meal1Complete.title}`,
          xPositionTitle,
          yPositionTitle,
          20
        );
        menuCompo[k].meal1Complete.ingredients.forEach((ingredient, index) => {
          const quantity = menuCompo[k].meal1Complete.quantities[index];
          addText(
            currentPage,
            `${ingredient}:   ${quantity}`,
            xPositionIng,
            yPositionIng
          );
          yPositionIng -= 14;
        });
        menuCompo[k].meal1Complete.steps.forEach((step) => {
          addText(currentPage, `${step}`, xPositionStep, yPositionStep);
          yPositionStep -= 16;
          14;
        });
        addText(
          currentPage,
          `Page ${pageNumber}`,
          xPositionPageNb,
          yPositionPageNb,
          12
        ); // Add page number at bottom
        pageNumber++;
      } else {
        addText(
          currentPage,
          `${menuCompo[k].meal1Complete.title}`,
          xPositionTitle,
          yPositionTitle,
          20
        );
        menuCompo[k].meal1Complete.ingredients.forEach((ingredient, index) => {
          const quantity = menuCompo[k].meal1Complete.quantities[index];
          addText(
            currentPage,
            `${ingredient}:   ${quantity}`,
            xPositionIng,
            yPositionIng
          );
          yPositionIng -= 14;
        });
        menuCompo[k].meal1Complete.steps.forEach((step) => {
          addText(currentPage, `${step}`, xPositionStep, yPositionStep);
          yPositionStep -= 16;
          14;
        });
        addText(
          currentPage,
          `Page ${pageNumber}`,
          xPositionPageNb,
          yPositionPageNb,
          12
        );
        pageNumber++;

        addText(
          currentPage,
          `${menuCompo[k].meal2Complete.title}`,
          xPositionTitle,
          yPositionTitle,
          20
        );
        menuCompo[k].meal2Complete.ingredients.forEach((ingredient, index) => {
          const quantity = menuCompo[k].meal2Complete.quantities[index];
          addText(
            currentPage,
            `${ingredient}:   ${quantity}`,
            xPositionIng,
            yPositionIng
          );
          yPositionIng -= 14;
        });
        menuCompo[k].meal2Complete.steps.forEach((step) => {
          addText(currentPage, `${step}`, xPositionStep, yPositionStep);
          yPositionStep -= 16;
          14;
        });
        addText(
          currentPage,
          `Page ${pageNumber}`,
          xPositionPageNb,
          yPositionPageNb,
          12
        );
        pageNumber++;
      }
      yPositionIng = 705;
      yPositionStep = 380;
      if (k < menuCompo.length - 1) {
        currentPage = await createPage();
      }
    }
    // Remove the first page (which is blank)
    pdfDocRecettes.removePage(0);
    // Générer le fichier PDF modifié
    const modifiedPdfBytesRecettes = await pdfDocRecettes.save();
    const blob = new Blob([modifiedPdfBytesRecettes], {
      type: "application/pdf",
    });
    saveAs(blob, "RecettesSemaine.pdf");
  };

  const handleGenerateEbook = async () => {
    const pdfDocCourses = await generatePDFCourses();
    const pdfDocRecettes = await generatePDFRecettes();

    const mergedPdf = await PDFDocument.create();
    const [coursesPages] = await mergedPdf.copyPages(
      pdfDocCourses,
      pdfDocCourses.getPageIndices()
    );
    coursesPages.forEach((page) => mergedPdf.addPage(page));

    const [recettesPages] = await mergedPdf.copyPages(
      pdfDocRecettes,
      pdfDocRecettes.getPageIndices()
    );
    recettesPages.forEach((page) => mergedPdf.addPage(page));

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    saveAs(blob, "Ebook.pdf");
  };

  const generatePDFCourses = async () => {
    const existingPdfBytesCourses = await fetch(pdfCourses).then((res) =>
      res.arrayBuffer()
    );
    const pdfDocCourses = await PDFDocument.load(existingPdfBytesCourses);
    pdfDocCourses.registerFontkit(fontkit);
    const cheeseburgerFontBytes = await fetch(CheeseburgerFont).then((res) =>
      res.arrayBuffer()
    );
    const customFont = await pdfDocCourses.embedFont(cheeseburgerFontBytes);

    const pages = pdfDocCourses.getPages();
    let firstPage = pages[0];

    const addText = (text, x, y, size = 10) => {
      firstPage.drawText(text, {
        x,
        y,
        size,
        font: customFont,
        color: rgb(0, 0, 0),
      });
    };

    let xPositionFL = 30;
    let xPositionFR = 215;
    let xPositionEP = 400;
    let yPositionFL = 740;
    let yPositionFR = 740;
    let yPositionEP = 740;

    listeFL.ingredients.forEach((ingredient) => {
      addText(`${ingredient[0]}: ${ingredient[1]}`, xPositionFL, yPositionFL);
      yPositionFL -= 12;
    });

    listeFR.ingredients.forEach((ingredient) => {
      addText(`${ingredient[0]}: ${ingredient[1]}`, xPositionFR, yPositionFR);
      yPositionFR -= 12;
    });

    listeEP.ingredients.forEach((ingredient) => {
      addText(`${ingredient[0]}: ${ingredient[1]}`, xPositionEP, yPositionEP);
      yPositionEP -= 12;
    });

    return pdfDocCourses;
  };

  const generatePDFRecettes = async () => {
    const existingPdfBytesRecettes = await fetch(pdfRecettes).then((res) =>
      res.arrayBuffer()
    );
    const pdfDocRecettes = await PDFDocument.load(existingPdfBytesRecettes);
    pdfDocRecettes.registerFontkit(fontkit);
    const cheeseburgerFontBytes = await fetch(CheeseburgerFont).then((res) =>
      res.arrayBuffer()
    );
    const customFont = await pdfDocRecettes.embedFont(cheeseburgerFontBytes);

    const addText = (page, text, x, y, size = 12) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: customFont,
        color: rgb(0, 0, 0),
      });
    };

    const createPage = async () => {
      const [existingPage] = await pdfDocRecettes.copyPages(pdfDocRecettes, [
        0,
      ]);
      const page = pdfDocRecettes.addPage(existingPage);
      return page;
    };

    let currentPage = await createPage();
    let xPositionTitle = 90;
    let xPositionIng = 60;
    let xPositionStep = 40;
    let xPositionPageNb = 270;
    let yPositionTitle = 780;
    let yPositionIng = 705;
    let yPositionStep = 380;
    let yPositionPageNb = 30;
    let pageNumber = 1;

    for (let k = 0; k < menuCompo.length && k < 5000; k++) {
      if (menuCompo[k].type === 1) {
        addText(
          currentPage,
          `${menuCompo[k].meal1Complete.title}`,
          xPositionTitle,
          yPositionTitle,
          20
        );
        menuCompo[k].meal1Complete.ingredients.forEach((ingredient, index) => {
          const quantity = menuCompo[k].meal1Complete.quantities[index];
          addText(
            currentPage,
            `${ingredient}:   ${quantity}`,
            xPositionIng,
            yPositionIng
          );
          yPositionIng -= 14;
        });
        menuCompo[k].meal1Complete.steps.forEach((step) => {
          addText(currentPage, `${step}`, xPositionStep, yPositionStep);
          yPositionStep -= 16;
        });
        addText(
          currentPage,
          `Page ${pageNumber}`,
          xPositionPageNb,
          yPositionPageNb,
          12
        );
        pageNumber++;
      } else {
        addText(
          currentPage,
          `${menuCompo[k].meal1Complete.title}`,
          xPositionTitle,
          yPositionTitle,
          20
        );
        menuCompo[k].meal1Complete.ingredients.forEach((ingredient, index) => {
          const quantity = menuCompo[k].meal1Complete.quantities[index];
          addText(
            currentPage,
            `${ingredient}:   ${quantity}`,
            xPositionIng,
            yPositionIng
          );
          yPositionIng -= 14;
        });
        menuCompo[k].meal1Complete.steps.forEach((step) => {
          addText(currentPage, `${step}`, xPositionStep, yPositionStep);
          yPositionStep -= 16;
        });
        addText(
          currentPage,
          `Page ${pageNumber}`,
          xPositionPageNb,
          yPositionPageNb,
          12
        );
        pageNumber++;

        addText(
          currentPage,
          `${menuCompo[k].meal2Complete.title}`,
          xPositionTitle,
          yPositionTitle,
          20
        );
        menuCompo[k].meal2Complete.ingredients.forEach((ingredient, index) => {
          const quantity = menuCompo[k].meal2Complete.quantities[index];
          addText(
            currentPage,
            `${ingredient}:   ${quantity}`,
            xPositionIng,
            yPositionIng
          );
          yPositionIng -= 14;
        });
        menuCompo[k].meal2Complete.steps.forEach((step) => {
          addText(currentPage, `${step}`, xPositionStep, yPositionStep);
          yPositionStep -= 16;
        });
        addText(
          currentPage,
          `Page ${pageNumber}`,
          xPositionPageNb,
          yPositionPageNb,
          12
        );
        pageNumber++;
      }
      yPositionIng = 705;
      yPositionStep = 380;
      if (k < menuCompo.length - 1) {
        currentPage = await createPage();
      }
    }
    pdfDocRecettes.removePage(0);
    return pdfDocRecettes;
  };

  return (
    <div className="pagelistecourses">
      <div className="nav-container">
        <NavbarProtect />
      </div>
      <div className="pagelistecourses-content">
        <div className="pagelistecourses-text">
          <h1>Liste de courses</h1>
          <h2>pour le Menu Choisi</h2>
          <h3> * * * * * * </h3>
          <div className="box-pdf-menu">
            <div className="box-button" onClick={() => handlePDFCourses()}>
              <h3>Liste en PDF</h3>
              <i className="fa-solid fa-file-pdf"></i>
            </div>

            <div className="box-button" onClick={() => handlePDFRecettes()}>
              <h3>Recettes en PDF</h3>
              <i className="fa-solid fa-file-pdf"></i>
            </div>

            <div className="box-button" onClick={handleGenerateEbook}>
              <h3>Ebook en PDF</h3>
              <i className="fa-solid fa-file-pdf"></i>
            </div>
          </div>
          <div className="shoppingcards-container">
            <ShoppingCardsList />
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default PageListeCourses;
