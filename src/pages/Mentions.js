import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarProtect from "../components/NavbarProtect";
import SignUp from "../components/SignUp";
import Login from "../feature/auth/Login";
import useAuth from "../hooks/useAuth";

const Mentions = () => {
  const { username, isAdmin, isAbo, isInscrit } = useAuth();

  return (
    <div className="mentions">
      <div className="mentions-content">
        {isAdmin || isAbo || isInscrit ? <NavbarProtect /> : <Navbar />}
        <SignUp />
        <Login />
        <div className="mentions-text">
          <div>
            <h2>Propriétaire du site et de l'application:</h2>
            <p>Sandrine STEIGER</p>
            <p>contact : bricappbrac@gmail.com</p>
            <h2>Hébergeur</h2>
            <p>Render.com</p>
            <h2>Responsabilités</h2>
            <p>
              L’éditrice de l'application partage du contenu informatif. Il ne
              s’agit pas de recommandations rédigées par un professionnel de
              santé, dans un cadre médical.
            </p>
            <p>
              Il est de la responsabilité de l’utilisateur de s’assurer de la
              pertinence des contenus proposés pour son propre cas.
              L’utilisateur ne pourra pas tenir pour responsable l’éditrice de
              toute utilisation des informations fournies. L’utilisateur est
              responsable de ses choix de vie et donc de ses choix alimentaires.
            </p>
            <p>
              L’éditrice préconise de consulter plusieurs sources d’informations
              fiables pour avoir un avis éclairé.
            </p>
            <h2>Copyright</h2>
            <p>
              L’ensemble de ce site est régi par la législation française sur le
              droit d’auteur et la propriété intellectuelle. Tous les contenus
              (publications, textes, images, graphismes, logos, icônes,
              vidéos…), présentés sur ce blog appartiennent à l’éditrice du site
              et de l'application sauf mention contraire et à l’exception des
              marques, logos ou contenus appartenant à d’autres sociétés
              partenaires ou auteurs.
            </p>
            <h2>Contenus payants :</h2>
            <p>
              Il est interdit de copier, reproduire ou redistribuer les contenus
              payants sous quelque forme que ce soit, à moins d’une autorisation
              préalable.
            </p>
            <h2>Contenus gratuits :</h2>
            <p>
              Il est autorisé de copier les contenus gratuits et de les
              republier à condition de ne pas les modifier, de citer bricappbrac
              et de mettre un lien vers le site ou l'application.
            </p>
            <p>
              Diffusion de correspondances privées : un courriel ne peut être
              diffusé publiquement sans l’autorisation écrite de son auteur. Il
              est donc illégal de publier des extraits d’emails reçus et
              envoyés.
            </p>
            {/* <h2> Affiliation</h2>
            <p>
              Lorsque l’éditrice présente certains produits qu’elle n’a pas
              créés, c’est toujours en adéquation avec ses valeurs. Il peut
              s’agir de lien d’affilié. Si l’utilisateur passe par ces liens
              pour effectuer ses achats, une commission sera éventuellement
              reversée à l’éditrice sans qu’il y ait un impact sur le prix
              proposé à l’utilisateur.
            </p> */}
            <h2> Cookies</h2>
            <p>
              Afin d’améliorer et de personnaliser la navigation, des cookies
              peuvent être déposés sur l’ordinateur de l’utilisateur.
              L’utilisateur a la possibilité de refuser ces cookies en
              paramétrant son navigateur. Le site de la CNIL permet d’en savoir
              plus sur le fonctionnement des cookies.
            </p>
            <h2> Collecte de données</h2>
            <p>
              Pour le fonctionnement de l'application, seul l'email de
              l'utilisateur est conservé dans le base de données, le mot de
              passe est quand à lui crypté dans la base de données. Aucune
              information n'est communiquée à des tiers.
            </p>
            <h2> Consentement</h2>
            <p>
              En s'inscrivant sur l'application, l'utilisateur consent à
              l'utilisation de son email pour le fonctionnement de
              l'appplication (création d'un compte utilisateur sur l'application
              et identification de l'utilisateur par son email lors du login à
              l'application).
            </p>
            <h2>Conformité avec la CNIL</h2>
            <p>
              L’utilisateur a la possibilité de se désinscrire de l'application
              en envoyant un email à bricappbrac@gmail.com. Son compte sera
              alors désactivé (s'il souhaite voir son compte réactivé
              ultérieurement) ou supprimé définitement, selon sa demande.
            </p>
            {/* <h2>Newsletter</h2> */}
            {/* <p>
              L’utilisateur a la possibilité de s’inscrire à la newsletter du
              blog bricappbrac.fr. Dans ce cas, il recevra des emails
              informatifs de la part de l’éditrice. L’utilisateur à la
              possibilité de se désinscrire en cliquant sur le lien de
              désinscription, qui se trouve dans chaque email envoyé.
            </p> */}
            <p>
              {" "}
              Ce site respecte les dispositions de la loi 78-17 du 6 janvier
              1978 relative à l’informatique, aux fichiers et aux libertés.
            </p>
            <p>
              « En application de la loi nº 78-17 du 6 janvier 1978 relative à
              l'informatique, aux fichiers et aux libertés, vous disposez des
              droits d'opposition (art. 26 de la loi), d'accès (art. 34 à 38 de
              la loi) et de rectification (art. 36 de la loi) des données vous
              concernant ».
            </p>
            <p>
              Pour cela, l’utilisateur peut en faire la demande en écrivant à
              bricappbrac@gmail.com.
            </p>
            <p>
              {" "}
              Les données personnelles sont conservées de manière confidentielle
              et ne sont ni cédées ni vendues à des tiers.
            </p>
            <h2> Liens vers d’autres sites</h2>
            <p>
              bricappbrac.fr peut contenir des liens hypertextes vers d’autres
              sites Internet ou blogs qui n’ont pas été développés par
              l’éditrice du site. La responsabilité de l’éditrice ne saurait
              être engagée du fait des informations et des recommandations
              formulées par des tiers.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Mentions;
