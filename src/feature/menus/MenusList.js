import { useGetMenusQuery } from "./menusApiSlice";
import Menu from "./Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";

const MenusList = () => {
  const { username, isAdmin, isAbo, isInscrit } = useAuth();

  const {
    data: menus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery("menuslist", {
    pollingIntervall: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();

  const [
    sendLogout,
    {
      isLoading: logoutIsLoading,
      isSuccess: logoutIsSuccess,
      isError: logoutIsError,
      error: logoutError,
    },
  ] = useSendLogoutMutation();

  const handleLogout = async () => {
    // console.log("handleLogout");
    try {
      await sendLogout();
    } catch (err) {
      console.log("err : ");
      console.log(err);
    }
    navigate("/");
  };

  const handleHome = async () => {
    // console.log("handleHome");
    if (isAdmin || isAbo || isInscrit) {
      navigate("/PrivateRoute/HomeListeRecettesProtect");
    } else {
      navigate("/");
    }
  };

  let content;

  if (isLoading)
    // content = <p>Loading...</p>;
    content = (
      <div>
        <PulseLoader color="#FFF" />
      </div>
    );

  if (isError) {
    content = (
      <div>
        <div className="title-errmsg">
          <h1>Gestion des Menus</h1>
        </div>
        <h3 className="errmsg">{error?.data?.message}</h3>
        <div>
          <h3 className="errmsg-link" onClick={() => handleHome()}>
            Accueil&nbsp;
            <i className="fa-solid fa-house"></i>
          </h3>
          <h3 className="errmsg-link" onClick={() => handleLogout()}>
            Déconnexion&nbsp;
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </h3>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    // const { ids } = menus;
    const { ids, entities } = menus;

    // Inutile car accès à cette page qu'en tant qu'Admin
    let filteredIds;
    if (isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (menuId) => entities[menuId].username === username
      );
    }

    // const tableContent = ids?.length
    //   ? ids.map((menuId) => <Menu key={menuId} menuId={menuId} />)
    //   : null;

    const tableContent =
      ids?.length &&
      filteredIds.map((menuId) => <Menu key={menuId} menuId={menuId} />);

    content = (
      <div className="gestion-admin">
        <div className="title-admin">
          <h1>Gestion des Menus</h1>
          <h3>
            <NavLink to="/PrivateRoute/HomeListeRecettesProtect">
              <i className="fa-solid fa-house"></i>
            </NavLink>
          </h3>
        </div>
        <table className="table table--menus">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th menu__dayone">
                DayOne
              </th>
              <th scope="col" className="table__th menu__username">
                Utilisateur
              </th>
              <th scope="col" className="table__th menu__id">
                Id
              </th>
              <th scope="col" className="table__th menu__edit">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return content;
};

export default MenusList;
