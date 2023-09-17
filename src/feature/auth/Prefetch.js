import store from "../../app/store";
import { menusApiSlice } from "../menus/menusApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { recipesApiSlice } from "../recipes/recipesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    // const menus = store.dispatch(menusApiSlice.endpoints.getMenus.initiate());
    // const recipes = store.dispatch(
    //   recipesApiSlice.endpoints.getRecipes.initiate()
    // );
    // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    store.dispatch(
      menusApiSlice.util.prefetch("getMenus", "menuslist", { force: true })
    );
    store.dispatch(
      recipesApiSlice.util.prefetch("getRecipes", "recipeslist", {
        force: true,
      })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "userslist", { force: true })
    );

    //   return () => {
    //     // console.log("unsubscribing");
    //     menus.unsubscribe();
    //     recipes.unsubscribe();
    //     users.unsubscribe();
    //   };
  }, []);
  return <Outlet />;
};

export default Prefetch;
