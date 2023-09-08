import { createSlice } from "@reduxjs/toolkit";

export const menucompoSlice = createSlice({
  name: "compo",
  initialState: {
    compoListe: [],
  },
  reducers: {
    setCompo: (state, { payload }) => {
      state.compoListe = payload;
    },
    createCompo: (state, { payload }) => {
      state.compoListe.push(payload);
    },
    editCompo: (state, { payload }) => {
      state.compoListe = state.compoListe.map((compo) => {
        if (compo.index === payload[1]) {
          if (payload[2] === "meal1") {
            return {
              ...compo,
              meal1Complete: payload[0],
              meal1: payload[0].title,
            };
          } else if (payload[2] === "meal2") {
            return {
              ...compo,
              meal2Complete: payload[0],
              meal2: payload[0].title,
            };
          }
          // } else {
          //   "pb ni meal1, ni meal2 : " + payload[2];
          // }
        } else {
          return compo;
        }
      });
    },
    editCompoDate: (state, { payload }) => {
      state.compoListe = state.compoListe.map((compo) => {
        console.log("EDITCOMPODATE compo.index");
        console.log(compo.index);
        console.log("EDITCOMPODATE payload");
        console.log(payload);
        console.log("EDITCOMPODATE payload[0]");
        console.log(payload[0]);
        console.log("EDITCOMPODATE payload[1]");
        console.log(payload[1]);
        if (compo.index === payload[0]) {
          console.log("EDITCOMPODATE index à MAJ");

          return {
            ...compo,
            date: payload[1],
          };
        } else {
          console.log("EDITCOMPODATE index non maj");
          return compo;
        }
      });
    },
    resetCompo: (state) => {
      state.compoListe = [];
    },
  },
});

export const { setCompo, createCompo, editCompo, resetCompo, editCompoDate } =
  menucompoSlice.actions;
export default menucompoSlice.reducer;
