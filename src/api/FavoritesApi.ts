import { validateResponse } from "./api";
import { IMovie } from "./MoviesApi";
import { BASE_URL } from "./config";

export const addMovieToFavorites = async(movieId: string) => {
    await fetch(`${BASE_URL}/favorites`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: movieId }),
    });
};

export const removeMovieFromFavorites = async(movieId: number) => {
    await fetch(`${BASE_URL}/favorites/${movieId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
    });
};

export const getFavoriteMovies = async(): Promise<IMovie[]> => {
    const response = await fetch(`${BASE_URL}​/favorites`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(validateResponse);
    const data = response.json();
    
    return data;
};