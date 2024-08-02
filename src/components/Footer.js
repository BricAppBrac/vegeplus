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
              <NavLink to="/">Accueil</NavLink>
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
                to="https://fr.tipeee.com/casse-tes-lunettes-roses"
                id="buy-me-a-coffee"
                target="_blank"
              >
                <i className="fa-solid fa-mug-saucer"></i> Pour garder l'accès
                Abonné (conserver vos menus et générer les listes de courses -
                gratuit 30j): Merci de me soutenir sur Tipeee!
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="contact-footer">
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </div>
      </div>
      <div className="footer-container2">
        <div className="bab">
          <h3>BricAppBrac </h3>
        </div>
        <div className="copyright">
          <h3>2024 © Copyright - Tous droits réservés</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
