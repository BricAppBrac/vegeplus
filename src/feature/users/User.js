import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId }) => {
  console.log("User.js");
  console.log("userId : " + userId);
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => {
      console.log("Users handleEdit");
      console.log("id : " + `${userId}`);
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
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  }
};

export default User;
