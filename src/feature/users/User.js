import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("userslist", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => {
      // console.log("Users handleEdit");
      // console.log("id : " + `${userId}`);
      navigate(`/users/${userId}`);
    };
    const cellStatus = user.active ? "" : "table__cell--inactive";
    return (
      <tr className="table__tr">
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{user.role}</td>
        <td className={`table__cell ${cellStatus}`}>
          {user.active ? "Actif" : "Suspendu"}
        </td>
        <td className={`table__cell ${cellStatus}`}>{user.email}</td>
        <td className={`table__cell ${cellStatus}`}>{user.id}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
    );
  }
};

const memoizedUser = memo(User);

export default memoizedUser; // rerender only if changes in the data
