import { showLoginPopup } from "../../redux/Slices/doesShowLoginPopupSlice";
import { TrailerPopup } from "../../components/TrailerPopup/TrailerPopup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import raiting_star from "../../assets/MainPage/raiting-star.png";
import full_heart from "../../assets/AccountPage/full_heart.svg";
import heart from "../../assets/MainPage/favourite.png";
import Api from "../../api/api";
import "./MoviePage.css";

export function MoviePage({ isUserAuthorized }: { isUserAuthorized: boolean }) {
    const { movieId } = useParams();
    
    const { data: movieObj } = useQuery({
        queryFn: () => Api.getMovieById(Number(movieId)),
        queryKey: ["movieObj"],
    }, queryClient);
    const { data: favoriteMovies } = useQuery({
        queryFn: () => Api.getFavoriteMovies(),
        queryKey: ["favoriteMovies"],
    }, queryClient);

    const [doesShowPlayer, setDoesShowPlayer] = useState<boolean>(false);
    const [isMovieFavorite, setIsMovieFavorite] = useState<boolean>(
        favoriteMovies && movieObj && favoriteMovies.filter(item => item.id === movieObj.id).length > 0 || false
    );

    let starColor: string = "";
    if(Number(movieObj?.tmdbRating) > 8) {
        starColor = "#308E21";
    } else if(Number(movieObj?.tmdbRating) > 7) {
        starColor = "#A59400";
    } else {
        starColor = "#777";
    };

    const addMovieToFavoritesMutation = useMutation({
        mutationFn: () => Api.addMovieToFavorites(String(movieObj?.id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
        }
    }, queryClient);
     const removeMovieFromFavoritesMutation = useMutation({
        mutationFn: () => Api.removeMovieFromFavorites(Number(movieObj?.id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
        }
    }, queryClient);
    
    const dispatch = useDispatch();
    const handleOnClickFavoriteBtnOne = () => dispatch(showLoginPopup());
    const handleOnClickFavoriteBtnTwo = () => {
        setIsMovieFavorite(!isMovieFavorite);

        if(isMovieFavorite) {
            removeMovieFromFavoritesMutation.mutate();
        } else {
            addMovieToFavoritesMutation.mutate();
        };
    };
    
    return (
        <>
            {movieObj && (
                <>
                    <section className="movie-section">
                        <div className="container">
                            <div className="movie__inner">
                                <div className="movie__info">
                                    <div className="movie__details">
                                        <div className="movie__raiting-detail" style={{ backgroundColor: starColor }}>
                                            <img src={raiting_star} alt="Звезда"/>
                                            <span>{movieObj.tmdbRating}</span>
                                        </div>
                                        <span className="movie__relase-year-detail">{movieObj.relaseYear}</span>
                                        <span className="movie__genres-detail">
                                            {
                                                Number(movieObj.genres.length) === 1
                                                ? movieObj.genres[0]
                                                : movieObj.genres.map((item: string, index: number) => index + 1 === movieObj.genres.length ? item : item + ", ")
                                            }
                                        </span>
                                        <span className="movie__runtime-detail">{movieObj.runtime} мин</span>
                                    </div>

                                    <h1 className="movie__title">{movieObj.title}</h1>
                                    <p className="movie__text">{movieObj.plot}</p>

                                    <div className="movie__btns">
                                        <button className="movie__trailer-btn primary__btn" onClick={() => setDoesShowPlayer(true)}>Трейлер</button>
                                        <button className="movie__favorite-btn" onClick={isUserAuthorized ? handleOnClickFavoriteBtnTwo : handleOnClickFavoriteBtnOne}>
                                            <img src={isMovieFavorite ? full_heart : heart} alt="Сердце"/>
                                        </button>
                                    </div>
                                </div>
                                <img className="movie__poster" src={movieObj.posterUrl} alt="Постер фильма"/>
                            </div>
                            
                            {doesShowPlayer && (
                                <TrailerPopup
                                    isOpen={true}
                                    trailerUrl={movieObj.trailerUrl}
                                    onClose={() => setDoesShowPlayer(false)}
                                />
                            )}
                        </div>
                    </section>

                    <section className="info-section">
                        <div className="container">
                            <h2 className="info__title">О фильме</h2>

                            <ul className="info__list">
                                <li className="info__item">
                                    <span>Язык оригинала</span>
                                    <span>{movieObj.language || "не указан"}</span>
                                </li>
                                <li className="info__item">
                                    <span>Бюджет</span>
                                    <span>{movieObj.budget ? movieObj.budget + " $" : "не указан"}</span>
                                </li>
                                <li className="info__item">
                                    <span>Выручка</span>
                                    <span>{movieObj.revenue ? movieObj.revenue + " $" : "не указана"}</span>
                                </li>
                                <li className="info__item">
                                    <span>Режиссёр</span>
                                    <span>{movieObj.director || "не указан"}</span>
                                </li>
                                <li className="info__item">
                                    <span>Продакшен</span>
                                    <span>{movieObj.production || "не указан"}</span>
                                </li>
                                <li className="info__item">
                                    <span>Награды</span>
                                    <span>{movieObj.awardsSummary || "нет информации"}</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};