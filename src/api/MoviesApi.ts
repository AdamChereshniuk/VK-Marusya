import { validateResponse } from "./api";
import { BASE_URL } from "./config";

export interface IMovie {
  keywords: string[],
  backdropUrl: string,
  production: string,
  trailerYoutubeId: string,
  language: string,
  tmdbRating: number,
  title: string,
  cast: string[],
  revenue: string,
  posterUrl: string,
  plot: string,
  genres: string[],
  id: number,
  budget: string,
  languages: string[],
  releaseYear: string,
  director: string,
  awardsSummary: string,
  runtime: number,
  trailerUrl: string,
  relaseYear: number,
  countriesOfOrigin: string[],
  originalTitle: string,
  searchL: string,
  homepage: string,
  status: string,
};

export const getRandomMovie = async(): Promise<IMovie> => {
  const response = await fetch(`${BASE_URL}/movie/random`).then(validateResponse);
  const data = response.json();

  return data;
};

export const getTop10Movies = async(): Promise<IMovie[]> => {
  const response = await fetch(`${BASE_URL}/movie/top10`).then(validateResponse);
  const data = response.json();

  return data;
};

export const getFilteredMovies = async(moviesCount: number, showNextPage: number, titleFilter: string, genreFilter: string): Promise<IMovie[]> => {
  const response = await fetch(`${BASE_URL}/movie?count=${moviesCount}&page=${showNextPage}&title=${titleFilter}&genre=${genreFilter}`).then(validateResponse);
  const data = response.json();

  return data;
};

export const getGenres = async(): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/movie/genres`).then(validateResponse);
  const data = response.json();

  return data;
};

export const getMovieById = async(movieId: number): Promise<IMovie> => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}`).then(validateResponse);
  const data = response.json();
  
  return data;
};