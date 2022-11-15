import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../actions/movieSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
