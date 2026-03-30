import { BASE_URL } from "./config";
import { validateResponse } from "./api";
import { Movie } from "./MoviesApi";

export const addMovieToFavorites = async(movieId: number) => {
    await fetch(`${BASE_URL}/favorites`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: String(movieId) }),
    });
};

export const removeMovieFromFavorites = async(movieId: number) => {
    await fetch(`${BASE_URL}/favorites/${movieId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
        credentials: "include",
    });
};

export const getFavoriteMovies = async(): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/favorites`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then(validateResponse);

    const data = response.json();
    return data;
};