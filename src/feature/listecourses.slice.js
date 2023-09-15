import { createSlice } from "@reduxjs/toolkit";

export const listecoursesSlice = createSlice({
  name: "listecourses",
  initialState: {
    // listeCoursesData: [
    //   ["Fruits/Légumes", []],
    //   ["Frais", []],
    //   ["Epicerie", []],
    //   ["Sauvages", []],
    // ],
    listeCoursesData: [],
  },
  reducers: {
    getListeCourses: (state, { payload }) => {
      state.listeCoursesData = payload;
    },

    createListeCourses: (state, { payload }) => {
      // console.log("SLICE CREATE-LISTE-COURSES");

      state.listeCoursesData = payload;
    },
    deleteListeCourses: (state) => {
      state.listeCoursesData = [];
    },
  },
});

export const { getListeCourses, deleteListeCourses, createListeCourses } =
  listecoursesSlice.actions;
export default listecoursesSlice.reducer;
