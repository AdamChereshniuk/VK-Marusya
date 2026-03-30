import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { Link } from "react-router-dom";
import { MouseEventHandler, useState } from "react";
import { showLoginPopup } from "../../redux/Slices/doesShowLoginPopupSlice";
import { useDispatch } from "react-redux";
import { TrailerPopup } from "../../components/TrailerPopup/TrailerPopup";
import { User } from "../../api/AuthApi";
import full_heart from "../../assets/AccountPage/full_heart.svg";
import raiting_star from "../../assets/MainPage/raiting-star.png";
import update_movie from "../../assets/MainPage/update-movie.svg";
import heart from "../../assets/MainPage/favourite.png";
import Api from "../../api/api";
import "./MainPage.css";

export function MainPage({ isCurrentUserAuthorized, currentUser }: { isCurrentUserAuthorized: boolean, currentUser?: User }) {
    const { data: randomMovie, refetch } = useQuery({
        queryFn: () => Api.getRandomMovie(),
        queryKey: ["randomMovie"],
    }, queryClient);
    const { data: top10Movies } = useQuery({
        queryFn: () => Api.getTop10Movies(),
        queryKey: ["top10Movies"],
    }, queryClient);
    const { data: favoriteMovies } = useQuery({
        queryFn: () => Api.getFavoriteMovies(),
        queryKey: ["favoriteMovies"],
    }, queryClient);

    const [doesShowPlayer, setDoesShowPlayer] = useState<boolean>(false);
    const [favouriteBtnImg, setFavouriteBtnImg] = useState(heart);

    let starColor: string = "";
    if(randomMovie?.tmdbRating > 8) {
        starColor = "#308E21";
    } else if(randomMovie?.tmdbRating > 7) {
        starColor = "#A59400";
    } else {
        starColor = "#777";
    }

    const addMovieToFavoritesMutation = useMutation({
        mutationFn: () => Api.addMovieToFavorites(randomMovie?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
        }
    }, queryClient);
    const removeMovieFromFavoritesMutation = useMutation({
        mutationFn: () => Api.removeMovieFromFavorites(randomMovie?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
        }
    }, queryClient);

    const dispatch = useDispatch();
    const handleOnClickFavouriteBtnOne = () => {
        dispatch(showLoginPopup());
    };
    const handleOnClickFavouriteBtnTwo = () => {
        if(favoriteMovies !== undefined) {
            let isRandomMovieFavorite = false;
            for(const item of favoriteMovies) {
                if(item.id === randomMovie?.id) isRandomMovieFavorite = true;
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
    
    const handleOnClickCloseBtn = () => {
        setDoesShowPlayer(false);
    };
    const handleOnClickTrailerBtn: MouseEventHandler = () => {
        setDoesShowPlayer(true);
    };

    return (
        <>
            {randomMovie && (
                <section className="hero-section">
                    <div className="container">
                        <div className="hero__inner">
                            <div className="hero__info">
                                <div className="hero__details">
                                    <div className="hero__detail--raiting" style={{
                                        backgroundColor: starColor,
                                    }}>
                                        <img src={raiting_star} alt="Звезда" />
                                        <span>{randomMovie.tmdbRating}</span>
                                    </div>
                                    <span className="hero__detail--realeaseYear">{randomMovie.releaseYear}</span>
                                    <span className="hero__detail--genres">
                                        {randomMovie.genres.length === 1
                                        ? randomMovie.genres[0]
                                        : randomMovie.genres.map((item: string, index: number) => {
                                            return (
                                                index + 1 === randomMovie.genres.length ? item : item + ", "
                                            )
                                        })}
                                    </span>
                                    <span className="hero__detail--runtime">{randomMovie.runtime} мин</span>
                                </div>

                                <h1 className="hero__title">{randomMovie.title}</h1>
                                <p className="hero__text">{randomMovie.plot}</p>

                                <div className="hero__btns">
                                    <button className="hero__btn--trailer primary__btn" onClick={handleOnClickTrailerBtn}>Трейлер</button>
                                    <Link className="hero__btn--info" to={`/movies/${randomMovie.id}`}>О фильме</Link>
                                    
                                    {favouriteBtnNode}
                                    <button className="hero__btn--update" onClick={() => refetch()}><img src={update_movie} alt="Обновить фильм" /></button>
                                </div>
                            </div>
                            <img className="hero__poster" src={randomMovie.posterUrl} alt="Постер фильма" />
                        </div>
                        
                        {(doesShowPlayer && randomMovie.trailerUrl) && (
                            <TrailerPopup
                                isOpen={true}
                                movieTitle={randomMovie.title}
                                trailerUrl={randomMovie.trailerUrl}
                                onClose={handleOnClickCloseBtn}
                            />
                        )}
                    </div>
                </section>
            )}
            
            <section className="top-movies">
                <div className="container">
                    <h2 className="top-movies__heading">Топ 10 фильмов</h2>

                    <div className="top-movies__wrapper">
                        <ul className="top-movies__list">
                            {top10Movies && (top10Movies.map((item, index: number) => {
                                return (
                                    <li className="top-movies__item" key={index + 1}>
                                        <Link to={`/movies/${item.id}`}>
                                            <div>
                                                <span>{index + 1}</span>
                                                <img src={item.posterUrl} loading="lazy"/>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            }))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};