import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./auth.slice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("Starting login query...");
      },
    }),
    // Logout endpoint
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState()); // clear le cache
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    // refresh endpoint
    refresh: builder.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // Mutation pour l'envoi d'e-mails
    sendEmail: builder.mutation({
      query: (emailData) => ({
        url: "/send-email",
        method: "POST",
        body: emailData,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          if (data && data.message === "E-mail envoyé avec succès") {
            console.log("E-mail envoyé avec succès");
          } else {
            // Gérer le cas où l'envoi d'e-mail a échoué
            console.log("Échec de l'envoi d'e-mail");
          }
        } catch (err) {
          console.log(err);
          // Gérer les erreurs d'envoi d'e-mails ici.
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useSendEmailMutation,
} = authApiSlice;
