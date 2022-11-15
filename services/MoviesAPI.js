import axios from "../utils";
import { key, moviImage } from "../utils";

const getMovies = async () => {
    const movies = await axios
        .get(`trending/all/week?api_key=${key}`)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    return movies
}

const getMovieDataById = async (id) =>{
    const movieDetails = await axios
    .get(`movie/${id}?api_key=${key}`)
            .then(res => {
               return res.data
            })
            .catch(error => {
              return error
            });
        return movieDetails;
}

export default {
    getMovies,
    getMovieDataById
}