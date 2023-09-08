import { useSelector } from "react-redux";
import { selectCurrentToken } from "../feature/auth/auth.slice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  console.log("useAuth");
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isAbo = false;
  let isInscrit = false;
  let userStatus = "";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, role } = decoded.UserInfo;

    isInscrit = role === "Inscrit";
    isAbo = role === "Abonné";
    isAdmin = role === "Administrateur";

    if (isInscrit) userStatus = "Inscrit";
    if (isAbo) userStatus = "Abonné";
    if (isAdmin) userStatus = "Administrateur";

    console.log("token ok");
    console.log("username : " + username);
    console.log("role : " + role);

    console.log("userStatus : " + userStatus);
    console.log("isAdmin : " + isAdmin);
    console.log("isAbo : " + isAbo);
    console.log("isInscrit : " + isInscrit);

    return { username, role, userStatus, isAdmin, isAbo, isInscrit };
  }
  console.log("token KO");

  console.log("userStatus : " + userStatus);
  console.log("isAdmin : " + isAdmin);
  console.log("isAbo : " + isAbo);
  console.log("isInscrit : " + isInscrit);
  return { username: "", role: "", isAdmin, isAbo, isInscrit, userStatus };
};

export default useAuth;
