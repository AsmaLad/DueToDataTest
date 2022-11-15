// Actions 
import axios from "../../utils";
import { key, moviImage } from "../../utils";


import MoviesAPI from "../../services/MoviesAPI"


export const getMovies = () => async (dispatch) => {
    return await MoviesAPI.getMovies()
    .then(res => {
        // console.log("Res appAPI/getMovies", res);
        dispatch({
            type: "movies/getMovies",
            payload: res.data,
        });
    })

}

export const liveSearch = (searchResult) => async (dispatch) => {

        dispatch({
            type: "movies/getMovies",
            payload: searchResult,
        });
    

}


export const getUser = (lang, setLoading) => async (dispatch) => {
    setLoading(true);

    return axios
        .get(`${host}/getUser/${lang}`)
        .then(res => {
            console.log("Res appAPI/getUser", res.data);
            dispatch({
                type: "app/setConnectedUser",
                payload: res.data,
            });
            setLoading(false);
        })
        .catch(error => {
            console.log("Error appAPI/getUser", error);
            setLoading(false);
        });
};