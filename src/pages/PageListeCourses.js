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
// import pdfMenu from "/pdf/FondMenu.pdf";
// import pdfCourses from "/pdf/FondCourses.pdf"; // Importer l'image
// import pdfRecettes from "/pdf/FondRecettes.pdf"; // Importer l'image
import { useSelector } from "react-redux";

const PageListeCourses = () => {
  // Récupération de la liste de courses selon catégorie
  // Pour écriture dans un PDF
  const pdfMenu = process.env.PUBLIC_URL + "/pdf/FondMenu.pdf";
  const pdfCourses = process.env.PUBLIC_URL + "/pdf/FondCourses.pdf";
  const pdfRecettes = process.env.PUBLIC_URL + "/pdf/FondRecettes.pdf";
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
    const pdfDocCourses = await generatePDFCourses();
    const pdfBytesCourses = await pdfDocCourses.save();
    const blob = new Blob([pdfBytesCourses], { type: "application/pdf" });
    saveAs(blob, "CoursesSemaine.pdf");
  };

  const handlePDFRecettes = async () => {
    const pdfDocRecettes = await generatePDFRecettes();
    const pdfBytesRecettes = await pdfDocRecettes.save();
    const blob = new Blob([pdfBytesRecettes], { type: "application/pdf" });
    saveAs(blob, "RecettesSemaine.pdf");
  };

  const handleGenerateEbook = async () => {
    // console.log("handleGenerateEbook called");

    // const pdfDocMenu = await generatePDFMenu();
    // console.log("PDF Menu generated");

    // const pdfDocCourses = await generatePDFCourses();
    // console.log("PDF Courses generated");
    // const pdfDocRecettes = await generatePDFRecettes();
    // console.log("PDF Recettes generated");

    // const menuBytes = await pdfDocMenu.save();
    // const coursesBytes = await pdfDocCourses.save();
    // const recettesBytes = await pdfDocRecettes.save();

    // const combinedPdf = await PDFDocument.create();

    // // Copy pages from the menu document
    // const menuPages = await combinedPdf.copyPages(
    //   pdfDocMenu,
    //   pdfDocMenu.getPageIndices()
    // );
    // menuPages.forEach((page) => combinedPdf.addPage(page));

    // // Copy pages from the courses document
    // const coursesPages = await combinedPdf.copyPages(
    //   pdfDocCourses,
    //   pdfDocCourses.getPageIndices()
    // );
    // coursesPages.forEach((page) => combinedPdf.addPage(page));

    // // Copy pages from the recettes document
    // const recettesPages = await combinedPdf.copyPages(
    //   pdfDocRecettes,
    //   pdfDocRecettes.getPageIndices()
    // );
    // recettesPages.forEach((page) => combinedPdf.addPage(page));

    // const combinedPdfBytes = await combinedPdf.save();
    // const blob = new Blob([combinedPdfBytes], { type: "application/pdf" });
    // saveAs(blob, "Ebook.pdf");
    try {
      console.log("📢 Début de handleGenerateEbook");

      const pdfDocMenu = await generatePDFMenu();
      console.log("✅ PDF Menu généré");

      const pdfDocCourses = await generatePDFCourses();
      console.log("✅ PDF Courses généré");

      const pdfDocRecettes = await generatePDFRecettes();
      console.log("✅ PDF Recettes généré");

      const combinedPdf = await PDFDocument.create();
      console.log("🆕 Nouveau PDF combiné créé");

      const menuPages = await combinedPdf.copyPages(
        pdfDocMenu,
        pdfDocMenu.getPageIndices()
      );
      console.log(`📄 ${menuPages.length} pages copiées du PDF Menu`);
      menuPages.forEach((page) => combinedPdf.addPage(page));

      const coursesPages = await combinedPdf.copyPages(
        pdfDocCourses,
        pdfDocCourses.getPageIndices()
      );
      console.log(`📄 ${coursesPages.length} pages copiées du PDF Courses`);
      coursesPages.forEach((page) => combinedPdf.addPage(page));

      const recettesPages = await combinedPdf.copyPages(
        pdfDocRecettes,
        pdfDocRecettes.getPageIndices()
      );
      console.log(`📄 ${recettesPages.length} pages copiées du PDF Recettes`);
      recettesPages.forEach((page) => combinedPdf.addPage(page));
      console.log("🛠️ Tentative de sauvegarde du PDF combiné...");
      const combinedPdfBytes = await combinedPdf.save();
      console.log(
        "✅ PDF combiné sauvegardé - Taille :",
        combinedPdfBytes.length
      );

      const downloadPDF = (pdfBlob, fileName = "Ebook.pdf") => {
        // 🔹 Créer une nouvelle URL Blob
        const fileURL = URL.createObjectURL(pdfBlob);
        console.log("📥 Nouvelle URL Blob :", fileURL);

        // ⏳ Ajouter un délai pour éviter un blocage du navigateur
        setTimeout(() => {
          // 🔹 Ouvrir le PDF dans un nouvel onglet au lieu d’un téléchargement direct
          window.open(fileURL, "_blank");
          console.log("📥 PDF ouvert dans un nouvel onglet :", fileURL);
        }, 500);
      };

      const blob = new Blob([combinedPdfBytes], { type: "application/pdf" });
      // saveAs(blob, "Ebook.pdf");
      // Remplace `saveAs()` par :
      downloadPDF(blob, "Ebook.pdf");

      console.log("📥 Ebook téléchargé");
    } catch (error) {
      console.error("❌ Erreur lors de la génération du PDF :", error);
      alert(
        "Une erreur s'est produite lors de la génération du PDF. Veuillez réessayer."
      );
    }
  };

  const generatePDFMenu = async () => {
    // const existingPdfBytesMenu = await fetch(pdfMenu).then((res) =>
    //   res.arrayBuffer()
    // );
    // Désactiver le cache pour les fichiers PDF

    const existingPdfBytesMenu = await fetch(pdfMenu, {
      cache: "no-store",
    }).then((res) => {
      if (!res.ok)
        throw new Error(
          `Erreur de chargement du PDF : ${res.status} ${res.statusText}`
        );
      return res.arrayBuffer();
    });

    const pdfDocMenu = await PDFDocument.load(existingPdfBytesMenu);
    pdfDocMenu.registerFontkit(fontkit);
    const cheeseburgerFontBytes = await fetch(CheeseburgerFont).then((res) =>
      res.arrayBuffer()
    );
    const customFont = await pdfDocMenu.embedFont(cheeseburgerFontBytes);
    const pages = pdfDocMenu.getPages();
    let firstPage = pages[0];
    const addText = (text, x, y, size = 22) => {
      firstPage.drawText(text, {
        x,
        y,
        size,
        font: customFont,
        color: rgb(0, 0, 0),
      });
    };

    const pageWidth = 595.28;
    let containsAsterisk = false;

    for (let index = 0; index < menuCompo.length; index++) {
      const day = new Date(menuCompo[index].date);
      let mealDetails = "";
      let symbolWidth = null;
      let symbolX = null;
      if (menuCompo[index].type === 1) {
        mealDetails = `${menuCompo[index].meal1 ? menuCompo[index].meal1 : ""}`;
        symbolWidth = customFont.widthOfTextAtSize(mealDetails, 22);
        symbolX = (pageWidth - symbolWidth) / 2;
        addText(mealDetails, symbolX, 650 + index * -60);
        mealDetails = "< < < > > >";
        symbolWidth = customFont.widthOfTextAtSize(mealDetails, 22);
        symbolX = (pageWidth - symbolWidth) / 2;
        addText(mealDetails, symbolX, 620 + index * -60, 18);
        if (menuCompo[index].meal1 && menuCompo[index].meal1.includes("*")) {
          containsAsterisk = true;
        }
      } else {
        mealDetails = `${menuCompo[index].meal1 ? menuCompo[index].meal1 : ""}`;
        symbolWidth = customFont.widthOfTextAtSize(mealDetails, 22);
        symbolX = (pageWidth - symbolWidth) / 2;
        addText(mealDetails, symbolX, 650 + index * -80);
        mealDetails = `${menuCompo[index].meal2 ? menuCompo[index].meal2 : ""}`;
        symbolWidth = customFont.widthOfTextAtSize(mealDetails, 22);
        symbolX = (pageWidth - symbolWidth) / 2;
        addText(mealDetails, symbolX, 620 + index * -80);
        mealDetails = "< < < > > >";
        symbolWidth = customFont.widthOfTextAtSize(mealDetails, 22);
        symbolX = (pageWidth - symbolWidth) / 2;
        addText(mealDetails, symbolX, 595 + index * -80, 18);
        if (menuCompo[index].meal1 && menuCompo[index].meal1.includes("*")) {
          containsAsterisk = true;
        }
        if (menuCompo[index].meal2 && menuCompo[index].meal2.includes("*")) {
          containsAsterisk = true;
        }
      }
    }

    if (containsAsterisk) {
      addText(
        "* Temps de trempage depuis la veille recommandé (plus digeste) mais facultatif",
        25,
        60,
        16
      );
    }
    return pdfDocMenu;
  };

  const generatePDFCourses = async () => {
    // const existingPdfBytesCourses = await fetch(pdfCourses).then((res) =>
    //   res.arrayBuffer()
    // );
    // Désactiver le cache pour les fichiers PDF
    const existingPdfBytesCourses = await fetch(pdfCourses, {
      cache: "no-store",
    }).then((res) => {
      if (!res.ok)
        throw new Error(
          `Erreur de chargement du PDF : ${res.status} ${res.statusText}`
        );
      return res.arrayBuffer();
    });

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
    // const existingPdfBytesRecettes = await fetch(pdfRecettes).then((res) =>
    //   res.arrayBuffer()
    // );
    // Désactiver le cache pour les fichiers PDF
    const existingPdfBytesRecettes = await fetch(pdfRecettes, {
      cache: "no-store",
    }).then((res) => {
      if (!res.ok)
        throw new Error(
          `Erreur de chargement du PDF : ${res.status} ${res.statusText}`
        );
      return res.arrayBuffer();
    });

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
