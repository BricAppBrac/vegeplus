import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
// import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./auth.slice";
import { Link, Outlet } from "react-router-dom";

const PersistLogin = () => {
  const persistedValue = localStorage.getItem("persist"); // Intégrer la logique de persist directement
  const persistState = persistedValue ? JSON.parse(persistedValue) : false;
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    // React 18 StrictMode , en développement, le composant monte, démonte et remonte, effectRan === true la seconde fois seulement
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("useEFFECT verifying refresh token");
        try {
          // const response =
          await refresh();
          // const { accessToken } = response.data
          setTrueSuccess(true); // permet de prendre le temps pour set credentials
        } catch (err) {
          console.err(err);
        }
      };

      if (!token && persistState) verifyRefreshToken();
    }

    return () => (effectRan.current = true);
    // eslint-disable-next-line
  }, []);

  let content;

  if (!persistState) {
    // persist: no, on ne veut pas prolonger le login
    console.log("No persist");
    content = <Outlet />;
  } else if (isLoading) {
    // persist: yes, token: no
    console.log("loading...");
    content = <p>Loading...</p>;
  } else if (isError) {
    //persist: yes, token: no
    console.log("error");
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Veuillez vous reconnecter</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    // persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
