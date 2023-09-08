import React from "react";

const DayCard = ({ dayMenu }) => {
  return (
    <div>
      <div className="day-container">
        <h4>{dayMenu[2]}</h4>
        {/* {dayMenu[4] ? <h4> & </h4> : null} */}
        {dayMenu[4] ? <h4>{dayMenu[4]}</h4> : null}
      </div>
      <h6> * * * </h6>
    </div>
  );
};

export default DayCard;
