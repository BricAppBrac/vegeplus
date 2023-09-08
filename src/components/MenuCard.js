import React from "react";

const MenuCard = (props) => {
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
