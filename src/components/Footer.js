import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Footer = () => {
  const { username, userStatus } = useAuth();

  // console.log("username : " + username);
  // console.log("userStatus : " + userStatus);

  return (
    <footer>
      <div className="footer-container1">
        <div className="liens-footer">
          <ul>
            <li>
              <NavLink
                to="/"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <p>
                {userStatus ? userStatus : "Inscription"}:{" "}
                {username ? username : "recommandée"}
              </p>
            </li>
          </ul>
        </div>
        <div className="mentions-footer">
          <ul>
            <li>
              <NavLink to="/mentions-legales">Mentions Légales</NavLink>
            </li>
            <li className="buy-me-a-coffee">
              <NavLink
                to="https://www.buymeacoffee.com/bricappbrac"
                id="buy-me-a-coffee"
              >
                <i className="fa-solid fa-mug-saucer"></i> Pour me soutenir: buy
                me a coffee! Merci!
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/plan-du-site"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
              >
                Plan du site
              </NavLink>
            </li> */}
          </ul>
        </div>
        <div className="contact-footer">
          <li>
            <NavLink
              to="/contact"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Contact
            </NavLink>
          </li>
        </div>
      </div>
      <div className="footer-container2">
        <div className="bab">
          <h3>BricAppBrac </h3>
        </div>
        <div className="copyright">
          <h3>2023 © Copyright - Tous droits réservés</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
