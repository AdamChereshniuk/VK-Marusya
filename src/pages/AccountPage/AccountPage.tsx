import { useState } from "react";
import { User } from "../../api/AuthApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { Link } from "react-router-dom";
import { Movie } from "../../api/MoviesApi";
import Api from "../../api/api";
import mail from "../../assets/AccountPage/mail.svg";
import person from "../../assets/AccountPage/person.svg";
import heart from "../../assets/AccountPage/heart.svg";
import cross from "../../assets/AccountPage/cross.svg";
import "./AccountPage.css";

export function AccountPage({currentUser}: {currentUser: User}) {
    const { data: favouriteMovies } = useQuery({
        queryFn: () => Api.getFavoriteMovies(),
        queryKey: ["favoriteMovies"],
    }, queryClient);

    const [currentTab, setCurrentTab] = useState<"favorites" | "settings">("favorites");
    const [favouriteMoviesList, setFavouriteMoviesList] = useState<Movie[] | undefined>(favouriteMovies || undefined);

    const removeMovieFromFavoritesMutation = useMutation({
        mutationFn: (movieId: number) => Api.removeMovieFromFavorites(movieId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
        }
    }, queryClient);
    const logoutUserMutation = useMutation({
        mutationFn: () => Api.logoutUser(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["logoutUser"] });
            queryClient.invalidateQueries({ queryKey: ["users", "me"] });
        },
    }, queryClient);

    const handleOnClickFavoritesTabBtn = () => {
        setCurrentTab("favorites");
    };
    const handleOnClickSettingsTabBtn = () => {
        setCurrentTab("settings");
    };
    const handleOnClickSettingsLogoutBtn = () => {
        logoutUserMutation.mutate();
    };

    return (
        <section className="account-section">
            <div className="container">
                <h2 className="account__title">Мой аккаунт</h2>

                <ul className="account__tabs">
                    <li className="account__tab">
                        <button className="account__tab-btn" onClick={handleOnClickFavoritesTabBtn}>
                            <img src={heart} alt="" />
                            <p className="account__tab-text">Избранные фильмы</p>
                            <p className="account__tab-text--mobile">Избранное</p>
                        </button>
                    </li>
                    <li className="account__tab">
                        <button className="account__tab-btn" onClick={handleOnClickSettingsTabBtn}>
                            <img src={person} alt="" />
                            <p className="account__tab-text">Настройки аккаунта</p>
                            <p className="account__tab-text--mobile">Настройки</p>
                        </button>
                    </li>
                </ul>

                {currentTab === "favorites" ? (
                    <div className="favorites">
                        {favouriteMovies?.length !== 0 ? (
                            <ul className="favorites__list">
                                {favouriteMovies?.map((item) => {
                                    const handleOnClickFavouritesRemoveBtn = () => {
                                        removeMovieFromFavoritesMutation.mutate(item.id);

                                        // setFavouriteMoviesList((prevFavoriteMoviesList) => prevFavoriteMoviesList?.filter((favoriteMovie) => favoriteMovie.id !== item.id));
                                    };
                                    
                                    return (
                                        <li className="favorites__item" key={item.id}>
                                            <Link to={`/movies/${item.id}`}>
                                                <div>
                                                    <img src={item.posterUrl} alt="Нет фото" />
                                                </div>
                                            </Link>

                                            <button className="favorites__item-btn--remove" onClick={handleOnClickFavouritesRemoveBtn}>
                                                <img className="favorites__item-btn--remove__img" src={cross} alt="Крестик" />
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : (
                            <h2 className="favorites__heading--nofilms">У Вас нет избранных фильмов</h2>
                        )}
                    </div>
                ) : (
                    <div className="settings">
                        <ul className="settings__list">
                            <li className="settings__item">
                                <p>{currentUser.name.charAt(0).toUpperCase() + currentUser.surname.charAt(0).toUpperCase()}</p>
                                <div className="settings__item-content">
                                    <span className="settings__item-label">Имя Фамилия</span>
                                    <p className="settings__item-text">{currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1)} {currentUser.surname.charAt(0).toUpperCase() + currentUser.surname.slice(1)}</p>
                                </div>
                            </li>
                            <li className="settings__item">
                                <img src={mail} alt="" />
                                <div className="settings__item-content">
                                    <span className="settings__item-label">Электронная почта</span>
                                    <p className="settings__item-text">{currentUser.email}</p>
                                </div>
                            </li>
                        </ul>

                        <button className="settings__btn" onClick={handleOnClickSettingsLogoutBtn}>
                            <Link to={`/`}>
                                Выйти из аккаунта
                            </Link>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};