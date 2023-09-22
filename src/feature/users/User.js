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
    const cellStatus = user.active
      ? "table__cell--active"
      : "table__cell--inactive";
    console.log("cellStatus:", cellStatus);

    // Calculate the difference in days between dateIn and the current date
    const dateIn = new Date(user.createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate - dateIn;
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    // Define a CSS class to apply based on the condition
    const dateInClass = daysDifference > 28 ? "red-date" : "";
    console.log("daysDifference:", daysDifference);
    console.log("dateInClass:", dateInClass);

    return (
      <tr className="table__tr">
        <td className={`${cellStatus}`}>{user.username}</td>
        <td className={`${cellStatus}`}>{user.role}</td>
        <td className={`${cellStatus}`}>
          {user.active ? "Actif" : "Suspendu"}
        </td>
        <td className={`${cellStatus}`}>{user.email}</td>
        <td className={`${cellStatus}`}>{user.id}</td>
        <td className={`${cellStatus} ${dateInClass}`}>
          {user.createdAt
            ? new Date(user.createdAt).toLocaleDateString("fr")
            : null}
        </td>
        <td className={`${cellStatus}`}>
          {user.updatedAt && user.updatedAt > user.createdAt
            ? new Date(user.updatedAt).toLocaleDateString("fr")
            : null}
        </td>
        <td className={`${cellStatus}`}>
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
