import React from "react";

import { NavLink } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="homebase">
      <h1>Accès direct interdit</h1>
      <h3>
        <NavLink to="/">
          <i className="fa-solid fa-house"></i>
        </NavLink>
      </h3>
    </div>
  );
};

export default AccessDenied;
