import { showLoginPopup } from "../../redux/Slices/doesShowLoginPopupSlice";
import { TrailerPopup } from "../../components/TrailerPopup/TrailerPopup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import raiting_star from "../../assets/MainPage/raiting-star.png";
import update_movie from "../../assets/MainPage/update-movie.svg";
import full_heart from "../../assets/AccountPage/full_heart.svg";
import heart from "../../assets/MainPage/favourite.png";
import Api from "../../api/api";
import "./MainPage.css";

export function MainPage({ isUserAuthorized }: { isUserAuthorized: boolean }) {
    const { data: favoriteMovies } = useQuery({
        queryFn: () => Api.getFavoriteMovies(),
        queryKey: ["favoriteMovies"],
    }, queryClient);
    const { data: randomMovie, refetch } = useQuery({
        queryFn: () => Api.getRandomMovie(),
        queryKey: ["randomMovie"],
    }, queryClient);
    const { data: top10Movies } = useQuery({
        queryFn: () => Api.getTop10Movies(),
        queryKey: ["top10Movies"],
    }, queryClient);

    const [doesShowPlayer, setDoesShowPlayer] = useState<boolean>(false);
    const [isRandomMovieFavorite, setIsRandomMovieFavorite] = useState<boolean>(
        favoriteMovies && favoriteMovies.filter(item => item.id === randomMovie?.id).length > 0 || false
    );
    
    let starColor: string = "";
    if(Number(randomMovie?.tmdbRating) > 8) {
        starColor = "#308E21";
    } else if(Number(randomMovie?.tmdbRating) > 7) {
        starColor = "#A59400";
    } else {
        starColor = "#777";
    };

    const addMovieToFavoritesMutation = useMutation({
        mutationFn: () => Api.addMovieToFavorites(String(randomMovie?.id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
        }
    }, queryClient);
    const removeMovieFromFavoritesMutation = useMutation({
        mutationFn: () => Api.removeMovieFromFavorites(Number(randomMovie?.id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
        }
    }, queryClient);

    const dispatch = useDispatch();
    const handleOnClickFavouriteBtnOne = () => dispatch(showLoginPopup());
    const handleOnClickFavouriteBtnTwo = () => {
        setIsRandomMovieFavorite(!isRandomMovieFavorite);

        if(isRandomMovieFavorite) {
            removeMovieFromFavoritesMutation.mutate();
        } else {
            addMovieToFavoritesMutation.mutate();
        };
    };

    return (
        <>
            <section className="hero-section">
                <div className="container">
                    <div className="hero__inner">
                        <div className="hero__info">
                            <div className="hero__details">
                                <div className="hero__raiting-detail" style={{ backgroundColor: starColor }}>
                                    <img src={raiting_star} alt="Звезда"/>
                                    <span>{randomMovie?.tmdbRating}</span>
                                </div>
                                <span className="hero__relase-year-detail">{randomMovie?.relaseYear}</span>
                                <span className="hero__genres-detail">
                                    {
                                        Number(randomMovie?.genres.length) === 1
                                        ? randomMovie?.genres[0]
                                        : randomMovie?.genres.map((item: string, index: number) => index + 1 === randomMovie.genres.length ? item : item + ", ")
                                    }
                                </span>
                                <span className="hero__runtime-detail">{randomMovie?.runtime} мин</span>
                            </div>

                            <h1 className="hero__title">{randomMovie?.title}</h1>
                            <p className="hero__text">{randomMovie?.plot}</p>

                            <div className="hero__btns">
                                <button className="hero__trailer-btn primary__btn" onClick={() => setDoesShowPlayer(true)}>Трейлер</button>
                                <Link className="hero__info-btn" to={`/movies/${randomMovie?.id}`}>О фильме</Link>
                                <button className="hero__favorite-btn" onClick={isUserAuthorized ? handleOnClickFavouriteBtnTwo : handleOnClickFavouriteBtnOne}>
                                    <img src={isRandomMovieFavorite ? full_heart : heart} alt="Сердце"/>
                                </button>
                                <button className="hero__update-btn" onClick={() => refetch()}>
                                    <img src={update_movie} alt="Обновить фильм"/>
                                </button>
                            </div>
                        </div>
                        <img className="hero__poster" src={randomMovie?.posterUrl} alt="Постер фильма"/>
                    </div>
                    
                    {doesShowPlayer && (
                        <TrailerPopup
                            isOpen={true}
                            trailerUrl={randomMovie?.trailerUrl || ""}
                            onClose={() => setDoesShowPlayer(false)}
                        />
                    )}
                </div>
            </section>
            
            <section className="top-movies">
                <div className="container">
                    <h2 className="top-movies__heading">Топ 10 фильмов</h2>

                    <div className="top-movies__wrapper">
                        <ul className="top-movies__list">
                            {top10Movies?.map((item, index: number) => (
                                <li className="top-movies__item" key={index + 1}>
                                    <Link to={`/movies/${item.id}`}>
                                        <div>
                                            <span>{index + 1}</span>
                                            <img src={item.posterUrl} loading="lazy"/>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};