import { getRandomMovie, getTop10Movies, getFilteredMovies, getGenres, getMovieById } from "./MoviesApi";
import { loginUser, registerUser, logoutUser, fetchMe } from "./AuthApi";
import { addMovieToFavorites, getFavoriteMovies, removeMovieFromFavorites } from "./FavoritesApi";

export async function validateResponse(response: Response): Promise<Response> {
    if(!response.ok) throw new Error(await response.text()); 

    return response;
};

const Api = {
    getRandomMovie,
    getTop10Movies,
    getFilteredMovies,
    loginUser,
    registerUser,
    logoutUser,
    fetchMe,
    addMovieToFavorites,
    removeMovieFromFavorites,
    getFavoriteMovies,
    getGenres,
    getMovieById,
};

export default Api;