import store from "../../app/store";
import { menusApiSlice } from "../menus/menusApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { recipesApiSlice } from "../recipes/recipesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const menus = store.dispatch(menusApiSlice.endpoints.getMenus.initiate());
    const recipes = store.dispatch(
      recipesApiSlice.endpoints.getRecipes.initiate()
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    return () => {
      console.log("unsubscribing");
      menus.unsubscribe();
      recipes.unsubscribe();
      users.unsubscribe();
    };
  }, []);
  return <Outlet />;
};

export default Prefetch;
