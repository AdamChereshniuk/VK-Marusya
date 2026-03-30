import { showLoginPopup } from "../../redux/Slices/doesShowLoginPopupSlice";
import { TrailerPopup } from "../../components/TrailerPopup/TrailerPopup";
import { MouseEventHandler, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../../api/AuthApi";
import raiting_star from "../../assets/MainPage/raiting-star.png";
import Api from "../../api/api";
import heart from "../../assets/MainPage/favourite.png";
import full_heart from "../../assets/AccountPage/full_heart.svg";
import "./FilmPage.css";

export function FilmPage({ isCurrentUserAuthorized, currentUser }: { isCurrentUserAuthorized: boolean, currentUser?: User }) {
    const { movieId } = useParams();
    
    const { data: movieObj } = useQuery({
        queryFn: () => Api.getMovieById(movieId),
        queryKey: ["movieObj"],
    }, queryClient);
    const { data: favoriteMovies } = useQuery({
        queryFn: () => Api.getFavoriteMovies(),
        queryKey: ["favoriteMovies"],
    }, queryClient);

    const addMovieToFavoritesMutation = useMutation({
        mutationFn: () => Api.addMovieToFavorites(movieObj?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
        }
    }, queryClient);
     const removeMovieFromFavoritesMutation = useMutation({
        mutationFn: () => Api.removeMovieFromFavorites(movieObj?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
        }
    }, queryClient);

    const [doesShowPlayer, setDoesShowPlayer] = useState<boolean>(false);
    const [favouriteBtnImg, setFavouriteBtnImg] = useState(heart);
    const handleOnClickCloseBtn = () => {
        setDoesShowPlayer(false);
    };
    const handleOnClickTrailerBtn: MouseEventHandler = () => {
        setDoesShowPlayer(true);
    };

    const dispatch = useDispatch();
    const handleOnClickFavouriteBtnOne = () => {
        dispatch(showLoginPopup());
    };
    const handleOnClickFavouriteBtnTwo = () => {
        if(favoriteMovies !== undefined) {
            let isRandomMovieFavorite = false;
            for(const item of favoriteMovies) {
                if(item.id === movieObj?.id) isRandomMovieFavorite = true;
            };

            if(isRandomMovieFavorite) {
                removeMovieFromFavoritesMutation.mutate();
                setFavouriteBtnImg(heart);
            } else {
                addMovieToFavoritesMutation.mutate();
                setFavouriteBtnImg(full_heart);
            };
        };
    };

    const favouriteBtnNode = isCurrentUserAuthorized ? <button className="hero__btn--favourite" onClick={handleOnClickFavouriteBtnTwo}><img src={favouriteBtnImg} alt="Сердце" /></button> : <button className="hero__btn--favourite" onClick={handleOnClickFavouriteBtnOne}><img src={favouriteBtnImg} alt="Сердце" /></button>;

    let starColor: string = "";
    if(movieObj?.tmdbRating > 8) {
        starColor = "#308E21";
    } else if(movieObj?.tmdbRating > 7) {
        starColor = "#A59400";
    } else {
        starColor = "#777";
    }

    return (
        <>
            {movieObj && (
                <>
                    <section className="movie-section">
                        <div className="container">
                            <div className="movie__inner">
                                <div className="movie__info">
                                    <div className="movie__details">
                                        <div className="movie__detail--raiting" style={{
                                            backgroundColor: starColor,
                                        }}>
                                            <img src={raiting_star} alt="Звезда" />
                                            <span>{movieObj.tmdbRating}</span>
                                        </div>
                                        <span className="movie__detail--realeaseYear">{movieObj.releaseYear}</span>
                                        <span className="movie__detail--genres">
                                            {movieObj.genres.length === 1
                                            ? movieObj.genres[0]
                                            : movieObj.genres.map((item: string, index: number) => {
                                                return (
                                                    index + 1 === movieObj.genres.length ? item : item + ", "
                                                )
                                            })}
                                        </span>
                                        <span className="movie__detail--runtime">{movieObj.runtime} мин</span>
                                    </div>

                                    <h1 className="movie__title">{movieObj.title}</h1>
                                    <p className="movie__text">{movieObj.plot}</p>

                                    <div className="movie__btns">
                                        <button className="movie__btn--trailer primary__btn" onClick={handleOnClickTrailerBtn}>Трейлер</button>
                                        
                                        {favouriteBtnNode}
                                    </div>
                                </div>
                                <img className="movie__poster" src={movieObj.posterUrl} alt="Постер фильма" />
                            </div>
                            
                            {doesShowPlayer && (
                                <TrailerPopup
                                    isOpen={true}
                                    movieTitle={movieObj.title}
                                    trailerUrl={movieObj.trailerUrl}
                                    onClose={handleOnClickCloseBtn}
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
                                    <span>{movieObj.language}</span>
                                </li>
                                <li className="info__item">
                                    <span>Бюджет</span>
                                    <span>{movieObj.budget + " $" || "не указан"}</span>
                                </li>
                                <li className="info__item">
                                    <span>Выручка</span>
                                    <span>{movieObj.revenue + " $" || "не указана"}</span>
                                </li>
                                <li className="info__item">
                                    <span>Режиссёр</span>
                                    <span>{movieObj.director || "не указан"}</span>
                                </li>
                                <li className="info__item">
                                    <span>Продакшен</span>
                                    <span>{movieObj.production || "не указано"}</span>
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
}