import axios from 'axios';
export const key = 'c559996ac8559f62e571ce505deda61f'
export const moviImage = "https://image.tmdb.org/t/p/w300/"

const instance = axios.create({ baseURL: 'https://api.themoviedb.org/3/' });
export default instance