import { useNavigate } from "react-router-dom";
import { useGetMenusQuery, useDeleteMenuMutation } from "./menusApiSlice";
import { memo } from "react";

const Menu = ({ menuId }) => {
  const { menu } = useGetMenusQuery("menuslist", {
    selectFromResult: ({ data }) => ({
      menu: data?.entities[menuId],
    }),
  });

  const navigate = useNavigate();

  const { refetch } = useGetMenusQuery();

  const [deleteMenu, { isDelSuccess, isDelError, delerror }] =
    useDeleteMenuMutation();

  const handleSupprMenu = async () => {
    // console.log("-------------- handleSupprMenu DEBUT --------------");
    // console.log("props menuId: " + menuId);

    try {
      const result = await deleteMenu({
        id: menuId,
      });

      if (result.error) {
        console.log(result.error.data.message);
        console.log("error");
        console.log(result.error);
      } else {
        console.log("Suppression réussie");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }

    // Après une mise à jour réussie, appeler refetch() pour actualiser la liste des utilisateurs
    refetch();
    navigate("/PrivateRoute/homebase");

    // console.log("-------------- handleSupprMenu FIN --------------");
  };

  if (menu) {
    const cellStatus = menu.active ? "" : "table__cell--inactive";
    return (
      <tr className="table__tr">
        <td className={`table__cell ${cellStatus}`}>{menu.prefDayOne}</td>
        <td className={`table__cell ${cellStatus}`}>{menu.user}</td>
        <td className={`table__cell ${cellStatus}`}>{menu.id}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button
            className="icon-button table__button"
            onClick={handleSupprMenu}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  }
};

const memoizedMenu = memo(Menu);

export default memoizedMenu; // rerender only if changes in the data
