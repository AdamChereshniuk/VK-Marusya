import { BASE_URL } from "./config";
import { validateResponse } from "./api";

export type Movie = {
    keywords: [
      "keyword",
      "keyword"
    ],
    backdropUrl: "backdropUrl",
    production: "production",
    trailerYoutubeId: "trailerYoutubeId",
    language: "language",
    tmdbRating: 5,
    title: "title",
    cast: [
      "cast",
      "cast",
    ],
    revenue: "revenue",
    posterUrl: "posterUrl",
    plot: "plot",
    genres: [
      "genre",
      "genre",
    ],
    id: 0,
    budget: "budget",
    languages: [
      "language",
      "language",
    ],
    releaseDate: "releaseDate",
    director: "director",
    awardsSummary: "awardsSummary",
    runtime: 1,
    trailerUrl: "trailerUrl",
    relaseYear: 6,
    countriesOfOrigin: [
      "countriesOfOrigin",
      "countriesOfOrigin",
    ],
    originalTitle: "originalTitle",
    searchL: "searchL",
    homepage: "homepage",
    status: "status",
};

export const getRandomMovie = async(): Promise<Movie> => {
    const response = await fetch(`${BASE_URL}/movie/random`).then(validateResponse);
    const data = response.json();
    return data;
};
export const getTop10Movies = async(): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/movie/top10`).then(validateResponse);
    const data = response.json();
    return data;
};
export const getFilteredMovies = async(filmsCount: number, showNextPage: number, titleFilter: string, genreFilter: string): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/movie?count=${filmsCount}&page=${showNextPage}&title=${titleFilter}&genre=${genreFilter}`).then(validateResponse);

    const data = response.json();
    return data;
};
export const getGenres = async(): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/movie/genres`).then(validateResponse);

    const data = response.json();
    return data;
};
export const getMovieById = async(movieId: number): Promise<Movie> => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}`).then(validateResponse);

  const data = response.json();
  return data;
};