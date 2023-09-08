export const ROLES = {
  // Les utilisateurs / Abonnés / Administrateur ont fourni email, pseudo et mdp
  // Accès Inconnu : pas d'identification, les inconnus ne voient que la liste des recettes et détails des recettes avec possibilité d'inscription => ne fait pas partie de la liste de la BDD users
  // Accès Inscrit (gratuit): Liste des Recettes, Détails des Recettes, Génération de menus et liste de courses mais pas de sauvegarde dans la BDD
  Inscrit: "Inscrit",
  // Accès Abonné (payant) : accès utilisateur + sauvegarde menus
  Abonné: "Abonné",
  // Accès Administrateur : tous les accès dont gestion BDD
  Administrateur: "Administrateur",
};
