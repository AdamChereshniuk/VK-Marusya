import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { IUser } from "../../api/AuthApi";
import { Link } from "react-router-dom";
import { useState } from "react";
import person from "../../assets/AccountPage/person.svg";
import heart from "../../assets/AccountPage/heart.svg";
import cross from "../../assets/AccountPage/cross.svg";
import mail from "../../assets/AccountPage/mail.svg";
import Api from "../../api/api";
import "./AccountPage.css";

export function AccountPage({ userData }: { userData: IUser }) {
    const [currentTab, setCurrentTab] = useState<"favorites" | "settings">("favorites");

    const { data: favoriteMovies } = useQuery({
        queryFn: () => Api.getFavoriteMovies(),
        queryKey: ["favoriteMovies"],
    }, queryClient);

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

    const handleOnClickFavoritesTabBtn = () => setCurrentTab("favorites");
    const handleOnClickSettingsTabBtn = () => setCurrentTab("settings");
    const handleOnClickSettingsLogoutBtn = () => logoutUserMutation.mutate();

    return (
        <section className="account-section">
            <div className="container">
                <h2 className="account__title">Мой аккаунт</h2>

                <ul className="account__tabs">
                    <li className={`account__tab ${currentTab === "favorites" && "current"}`}>
                        <button className="account__tab-btn" onClick={handleOnClickFavoritesTabBtn}>
                            <img src={heart} alt="Избранное"/>
                            <p className="account__tab-text">Избранные фильмы</p>
                            <p className="account__tab-mobile-text">Избранное</p>
                        </button>
                    </li>
                    <li className={`account__tab ${currentTab === "settings" && "current"}`}>
                        <button className="account__tab-btn" onClick={handleOnClickSettingsTabBtn}>
                            <img src={person} alt="Настройки"/>
                            <p className="account__tab-text">Настройки аккаунта</p>
                            <p className="account__tab-mobile-text">Настройки</p>
                        </button>
                    </li>
                </ul>

                {currentTab === "favorites" ? (
                    <div className="favorites">
                        {favoriteMovies && favoriteMovies.length > 0 ? (
                            <ul className="favorites__list">
                                {favoriteMovies.map((item) => {
                                    const handleOnClickFavoritesRemoveBtn = () => removeMovieFromFavoritesMutation.mutate(item.id);
                                    
                                    return (
                                        <li className="favorites__item" key={item.id}>
                                            <Link className="favorites__poster-link" to={`/movies/${item.id}`}>
                                                <img className="favorites__poster-img" src={item.posterUrl} alt="Нет фото"/>
                                            </Link>

                                            <button className="favorites__remove-btn" onClick={handleOnClickFavoritesRemoveBtn}>
                                                <img className="favorites__remove-img" src={cross} alt="Крестик"/>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : <h2 className="favorites__heading">У Вас нет избранных фильмов</h2>}
                    </div>
                ) : (
                    <div className="settings">
                        <ul className="settings__list">
                            <li className="settings__item settings__name-item">
                                <p className="settings__item-icon">{userData.name.charAt(0).toUpperCase() + userData.surname.charAt(0).toUpperCase()}</p>
                                <div className="settings__item-content">
                                    <span className="settings__item-title">Имя Фамилия</span>
                                    <p className="settings__item-text">{userData.name.charAt(0).toUpperCase() + userData.name.slice(1)} {userData.surname.charAt(0).toUpperCase() + userData.surname.slice(1)}</p>
                                </div>
                            </li>
                            <li className="settings__item settings__email-item">
                                <img className="settings__item-icon" src={mail} alt="Почта"/>
                                <div className="settings__item-content">
                                    <span className="settings__item-title">Электронная почта</span>
                                    <p className="settings__item-text">{userData.email}</p>
                                </div>
                            </li>
                        </ul>

                        <Link className="settings__link" onClick={handleOnClickSettingsLogoutBtn} to={`/`}>Выйти из аккаунта</Link>
                    </div>
                )}
            </div>
        </section>
    );
};