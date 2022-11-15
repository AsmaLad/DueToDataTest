import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value:[],
}
export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMovies: (state, action) => {
      // console.log("payload" , action.payload)
      // console.log("state", state)
      state.value = action.payload.results

        // state.title = action.payload.title;
        // state.id = action.payload.id;
        // state.backdrop_path = action.payload.backdrop_path;
        // state.overview = action.payload.overview;

        // state.movies = state.movies.concat(finalPosts)
        // state.last_page = action.payload.last_page

    },
  }
})

export const selectMovies = (state) => state.movies.value;
export const { getMovies } = movieSlice.actions;

export default movieSlice.reducer;
