import React, { useState } from "react";
import { useSelector } from "react-redux";

const MenuCard = (props) => {
  const liste = useSelector((state) => state.listeRecipes.listeData);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);

  const handleKeywordChange = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    filterMeals(newKeyword);
  };

  const filterMeals = (keyword) => {
    console.log("filterMeals");
    if (!keyword) {
      console.log("absence de keyword");
      setFilteredMeals([]);
      return;
    }

    const filtered = liste.filter((meal) =>
      meal.title.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log("liste filtrée sur keyword");
    console.log(filtered);
    setFilteredMeals(filtered);
  };

  const handleChooseMealClick = (mealComplete, index, mealType) => {
    console.log("handleChooseMealClick");
    // Affiche ou non (TOGGLE) l'input pour saisir un mot-clé
    if (
      selectedMeal &&
      selectedMeal.mealComplete === mealComplete &&
      selectedMeal.index === index &&
      selectedMeal.mealType === mealType
    ) {
      setSelectedMeal(null);
      setKeyword("");
      setFilteredMeals([]);
    } else {
      setSelectedMeal({ mealComplete, index, mealType });
      setKeyword("");
      setFilteredMeals([]);
    }
  };

  const handleMealSelect = (meal, index, mealType) => {
    console.log("handleMealSelect");
    console.log("meal");
    console.log(meal);
    console.log("index : " + index);
    console.log("mealType : " + mealType);
    // Appel de handleChooseMeal pour sauvegarder le repas choisi pour le remplacement
    props.handleChooseMeal(meal, index, mealType);
    setSelectedMeal(null);
    setKeyword("");
    setFilteredMeals([]);
  };

  return (
    <div className="compo-card">
      <div className="compo-card-content">
        <h3>Repas du {props.compo.date}</h3>
        <div className="meal-content">
          <h4>{props.compo.meal1}</h4>
          <div className="box-options">
            <div className="box-change-meal">
              <button
                onClick={() =>
                  props.handleChangeMeal(
                    props.compo.meal1Complete,
                    props.compo.index,
                    "meal1"
                  )
                }
              >
                <i className="fa-solid fa-rotate-left"></i>
              </button>
            </div>
            <div className="box-choose-meal">
              <button
                onClick={() =>
                  handleChooseMealClick(
                    props.compo.meal1Complete,
                    props.compo.index,
                    "meal1"
                  )
                }
              >
                <i className="fa-solid fa-star"></i>
              </button>
              {selectedMeal &&
                selectedMeal.mealType === "meal1" &&
                selectedMeal.index === props.compo.index && (
                  <div className="meal-filter">
                    <input
                      type="text"
                      placeholder="Mot-clé repas"
                      value={keyword}
                      onChange={handleKeywordChange}
                    />
                    {filteredMeals.length > 0 && (
                      <div className="filtered-meals">
                        {filteredMeals.map((meal) => (
                          <div key={meal._id}>
                            <h4>{meal.title}</h4>
                            <button
                              onClick={() =>
                                handleMealSelect(
                                  meal,
                                  props.compo.index,
                                  "meal1"
                                )
                              }
                            >
                              <i className="fa-solid fa-check"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
            </div>
            <div className="box-delete-meal">
              <button
                onClick={() =>
                  props.handleDeleteMeal(
                    props.compo.meal1Complete,
                    props.compo.index,
                    "meal1"
                  )
                }
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
            <div className="box-details-meal">
              <button
                onClick={() =>
                  props.handleDetailsMeal(props.compo.meal1Complete)
                }
              >
                <i id="detailsicon" className="fa-solid fa-file"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="meal-content">
          <h4>{props.compo.type === 2 ? props.compo.meal2 : null}</h4>
          {props.compo.type === 2 ? (
            <div className="box-options">
              <div className="box-change-meal">
                <button
                  onClick={() =>
                    props.handleChangeMeal(
                      props.compo.meal2Complete,
                      props.compo.index,
                      "meal2"
                    )
                  }
                >
                  <i id="changeicon" className="fa-solid fa-rotate-left"></i>
                </button>
              </div>
              <div className="box-choose-meal">
                <button
                  onClick={() =>
                    handleChooseMealClick(
                      props.compo.meal2Complete,
                      props.compo.index,
                      "meal2"
                    )
                  }
                >
                  <i id="chooseicon" className="fa-solid fa-star"></i>
                </button>

                {selectedMeal &&
                  selectedMeal.mealType === "meal2" &&
                  selectedMeal.index === props.compo.index && (
                    <div className="meal-filter">
                      <input
                        type="text"
                        placeholder="Mot-clé repas"
                        value={keyword}
                        onChange={handleKeywordChange}
                      />
                      {filteredMeals.length > 0 && (
                        <div className="filtered-meals">
                          {filteredMeals.map((meal) => (
                            <div key={meal._id}>
                              <h4>{meal.title}</h4>
                              <button
                                onClick={() =>
                                  handleMealSelect(
                                    meal,
                                    props.compo.index,
                                    "meal2"
                                  )
                                }
                              >
                                <i className="fa-solid fa-check"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
              </div>
              <div className="box-delete-meal">
                <button
                  onClick={() =>
                    props.handleDeleteMeal(
                      props.compo.meal2Complete,
                      props.compo.index,
                      "meal2"
                    )
                  }
                >
                  <i id="deleteicon" className="fa-solid fa-trash"></i>
                </button>
              </div>
              <div className="box-details-meal">
                <button
                  onClick={() =>
                    props.handleDetailsMeal(props.compo.meal2Complete)
                  }
                >
                  <i id="detailsicon" className="fa-solid fa-file"></i>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
