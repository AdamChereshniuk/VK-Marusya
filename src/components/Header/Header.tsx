import { SuccessRegistrationPopup } from "../SuccessRegistrationPopup/SuccessRegistrationPopup";
import { showLoginPopup } from "../../redux/Slices/doesShowLoginPopupSlice";
import { ChangeEventHandler, useEffect, useState } from "react";
import { RegisterPopup } from "../RegsiterPopup/RegisterPopup";
import { LoginPopup } from "../LoginPopup/LoginPopup";
import { useAppDispatch } from "../../redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";
import { queryClient } from "../../queryClient";
import { IUser } from "../../api/AuthApi";
import rating_star from "../../assets/MainPage/raiting-star.svg";
import genres_icon from "../../assets/Header/genres_icon.svg";
import search_icon from "../../assets/Header/search_icon.svg";
import person_icon from "../../assets/Header/person_icon.svg";
import header_logo from "../../assets/Header/logo.png";
import Api from "../../api/api";
import "./Header.css";

interface IHeaderProps {
    isUserAuthorized: boolean;
    userData?: IUser;
};

export const Header = ({ isUserAuthorized, userData }: IHeaderProps) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [isHeaderMoviesListOpen, setIsHeaderMoviesListOpen] = useState<boolean>(false);

    const { data: filteredMovies, refetch } = useQuery({
        queryFn: () => Api.getFilteredMovies(5, 0, searchValue, ""),
        queryKey: ["filteredMovies"],
    }, queryClient);

    useEffect(() => {
        refetch();

        if(searchValue.trim() !== "") {
            setIsHeaderMoviesListOpen(true);
        } else {
            setIsHeaderMoviesListOpen(false);
        };
    }, [searchValue, refetch]);
    
    const handleOnChangeSearchInput: ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);
    const handleOnClickHeaderBtn = () => dispatch(showLoginPopup());
    const dispatch = useAppDispatch();
    
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <Link className="header__logo" to="/">
                            <img className="header__logo-img" src={header_logo} alt="Лого" />
                        </Link>
            
                        <nav className="header__nav">
                            <ul className="header__list">
                                <li className="header__item">
                                    <NavLink className="header__item-link" to={"/"}>Главная</NavLink>
                                </li>
                                <li className="header__item">
                                    <NavLink className="header__item-link" to={"/genres"}>Жанры</NavLink>
                                </li>
                            </ul>
                            
                            <input className="header__search" placeholder="Поиск" type="text" onChange={handleOnChangeSearchInput} value={searchValue}/>
                            {isHeaderMoviesListOpen && filteredMovies && filteredMovies.length > 0 && (
                                <ul className="header__movies">
                                    {filteredMovies.map((item) => {
                                        let starColor: string = "";
                                        if(item.tmdbRating > 8) {
                                            starColor = "#308E21";
                                        } else if(item.tmdbRating > 7) {
                                            starColor = "#A59400";
                                        } else {
                                            starColor = "#777";
                                        };

                                        return (
                                            <Link to={`/movies/${item.id}`} key={item.id}>
                                                <li className="header__movie">
                                                    <img className="header__movie-img" src={item.backdropUrl} alt="Постер" />
                                                    <div className="header__movie-content">
                                                        <div className="header__movie-details">
                                                            <span className="header__rating-detail" style={{ backgroundColor: starColor }}>
                                                                <img src={rating_star} alt="Звезда" /> {item.tmdbRating}
                                                            </span>
                                                            <span className="header__relaseYear-detail">{item.releaseYear}</span>
                                                            <span className="header__genres-detail">
                                                                {
                                                                    Number(item.genres.length) === 1
                                                                    ? item.genres[0]
                                                                    : item.genres.map((genre: string, index: number) => index + 1 === item.genres.length ? genre : genre + ", ")
                                                                }
                                                            </span>
                                                            <span className="header__runtime-detail">{item.runtime} мин.</span>
                                                        </div>
                                                        <h3 className="header__movie-title">{item.title}</h3>
                                                    </div>
                                                </li>
                                            </Link>
                                        )
                                    })}
                                </ul>
                            )}
                        </nav>
                        
                        {
                            isUserAuthorized
                            ? <Link className="header__login-link" to={`/userAccount`}>{userData && userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}</Link>
                            : <button className="header__login-btn" onClick={handleOnClickHeaderBtn}>Войти</button>
                        }

                        <nav className="header__mobile-nav">
                            <ul className="header__mobile-list">
                                <li className="header__mobile-item">
                                    <Link to={`/genres`}>
                                        <img src={genres_icon} alt="Жанры"/>
                                    </Link>
                                </li>
                                <li className="header__mobile-item">
                                    <Link to={`/genres`}>
                                        <img src={search_icon} alt="Поиск"/>
                                    </Link>
                                </li>
                                <li className="header__mobile-item">
                                    {
                                        isUserAuthorized
                                        ? (
                                            <Link to={`/userAccount`}>
                                                <img src={person_icon} alt="Профиль"/>
                                            </Link>
                                        )
                                        : (
                                            <button onClick={handleOnClickHeaderBtn}>
                                                <img src={person_icon} alt="Профиль"/>
                                            </button>
                                        )
                                    }
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            
            <LoginPopup/>
            <RegisterPopup/>
            <SuccessRegistrationPopup/>
        </>
    );
};