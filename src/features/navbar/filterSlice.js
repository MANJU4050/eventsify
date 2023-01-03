import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search:"",
    place:"",
    category:""
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    getPlaceFilter: {
      reducer(state, action) {
        state.place = action.payload;
        console.log(state.place)
        return state;
      },
      prepare(place) {
        return {
          payload: place,
        };
      },
    },
    getCategoryFilter: {
        reducer(state, action) {
          state.category = action.payload;
          console.log(state.category)
          return state;
        },
        prepare(category) {
          return {
            payload: category,
          };
        },
      },
      getSearchFilter: {
        reducer(state, action) {
          state.search = action.payload;
          console.log(state.search)
          return state;
        },
        prepare(search) {
          return {
            payload: search,
          };
        },
      }
  },
});

export const { getPlaceFilter, getCategoryFilter, getSearchFilter } = filterSlice.actions;
export default filterSlice.reducer;
export const allFilters = (state) => {
  return state.filters;
};
