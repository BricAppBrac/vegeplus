import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../feature/auth/auth.slice";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000", // DEVELOPPEMENT
  baseUrl: "https://vegeplusback.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    // console.log("apiSlice baseQuery");
    if (token) {
      // console.log("token authorization with Bearer");
      headers.set("authorization", `Bearer ${token}`);
    }
    // else {
    //   console.log("NO token NO authorization with Bearer");
    // }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log("apiSlice baseQueryWithReauth");
  // console.log(args); // request url, method, body
  // console.log(api); // signal, dispatch, getState()
  // console.log(extraOptions); // custom like {shout: true}

  // Check if the error is due to isError
  if (args.error && args.error.source === "isError") {
    return baseQuery(args, api, extraOptions);
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Votre session a expirée.";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Menu", "User", "Recipe"],
  endpoints: (builder) => ({}),
});
