import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { NavLink, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import { PulseLoader } from "react-spinners";

const UsersList = () => {
  // console.log("UsersList");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("userslist", {
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

  let content;

  if (isLoading)
    content = (
      <p>
        <PulseLoader color="#FFF" />
      </p>
    );

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

  if (isError) {
    content = (
      <div>
        <div className="title-errmsg">
          <h1>Gestion des Utilisateurs</h1>
        </div>
        <h3 className="errmsg">{error?.data?.message}</h3>
        <div>
          <h3 className="errmsg" onClick={() => handleLogout()}>
            Accueil&nbsp;
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </h3>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <div className="gestion-admin">
        <div className="title-admin">
          <h1>Gestion des Utilisateurs</h1>
          <h3>
            <NavLink to="/PrivateRoute/HomeListeRecettesProtect">
              <i className="fa-solid fa-house"></i>
            </NavLink>
          </h3>
        </div>
        <table className="table table--users">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__username">
                Username
              </th>
              <th scope="col" className="table__th user__role">
                Role
              </th>
              <th scope="col" className="table__th user__active">
                Statut
              </th>
              <th scope="col" className="table__th user__email">
                Email
              </th>
              <th scope="col" className="table__th user__id ">
                Id
              </th>
              <th scope="col" className="table__th user__edit">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="table__tbody">{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return content;
};

export default UsersList;
