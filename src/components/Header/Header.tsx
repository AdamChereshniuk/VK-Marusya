import { Link, NavLink } from "react-router-dom";
import { ChangeEventHandler, FocusEventHandler, ReactNode, useEffect, useState } from "react";
import { queryClient } from "../../queryClient";
import { useQuery } from "@tanstack/react-query";
import { LoginPopup } from "../LoginPopup/LoginPopup";
import { RegisterPopup } from "../RegsiterPopup/RegisterPopup";
import { showLoginPopup, hideLoginPopup } from "../../redux/Slices/doesShowLoginPopupSlice";
import { showRegisterPopup, hideRegisterPopup } from "../../redux/Slices/doesShowRegisterPopupSlice";
import { hideLoginPopupLoginPart, showLoginPopupLoginPart } from "../../redux/Slices/doesShowLoginPopupLoginPartSlice";
import { hideLoginPopupRegisterPart, showLoginPopupRegisterPart } from "../../redux/Slices/doesShowLoginPopupRegisterPartSlice"
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import header_logo from "../../assets/Header/logo.png";
import rating_star from "../../assets/MainPage/raiting-star.svg";
import genres_icon from "../../assets/Header/genres_icon.svg";
import search_icon from "../../assets/Header/search_icon.svg";
import person_icon from "../../assets/Header/person_icon.svg";
import Api from "../../api/api";
import "./Header.css";

export const Header = ({headerBtnNode, headerMobileBtnNode}: {headerBtnNode: ReactNode, headerMobileBtnNode: ReactNode}) => {
    const [isHeaderSpanNone, setIsHeaderSpanNone] = useState<boolean>(true);
    const [filteredMoviesAmount, setFilteredMoviesAmount] = useState<number>(5);

    const [searchValue, setSearchValue] = useState<string>("");
    const { data: filteredMovies, refetch } = useQuery({
        queryFn: () => Api.getFilteredMovies(filteredMoviesAmount, 0, searchValue, ""),
        queryKey: ["filteredMovies"],
    }, queryClient);

    useEffect(() => {
        refetch();
    }, [searchValue, refetch]);
    
    let headerMoviesSecondClass: string = searchValue.trim() === "" ? "none" : "flex";
    let headerAllMoviesSecondClass: string = isHeaderSpanNone ? "none" : "flex";
    const handleOnChangeSearchInput: ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsHeaderSpanNone(true);
        setFilteredMoviesAmount(5);
        setSearchValue(e.target.value);
    };
    const handleOnFocusSearchInput: FocusEventHandler = () => {
        setSearchValue("");
        setIsHeaderSpanNone(false);
        setFilteredMoviesAmount(50);
    };
    const handleOnBlurSearchInput: FocusEventHandler = () => {
        setTimeout(() => {
            setSearchValue("");
            setIsHeaderSpanNone(true);
            setFilteredMoviesAmount(50);
        }, 200);
    };
    
    const doesShowLoginPopup = useAppSelector((state) => state.showLoginPopup.doesShowLoginPopup);
    const doesShowRegisterPopup = useAppSelector((state) => state.showRegister.doesShowRegisterPopup);
    const doesShowLoginPopupLoginPart = useAppSelector((state) => state.showLoginPopupLoginPart.doesShowLoginPopupLoginPart);
    const doesShowLoginPopupRegisterPart = useAppSelector((state) => state.showLoginPopupRegisterPart.doesShowLoginPopupRegisterPart);

    const dispatch = useAppDispatch();
    const handleOnClickLoginPopupCloseBtn = () => {
        dispatch(hideLoginPopupRegisterPart());
        dispatch(hideLoginPopup());
        dispatch(showLoginPopupLoginPart());
    };
    const handleOnClickLoginPopupChangeBtn = () => {
        dispatch(hideLoginPopupLoginPart());
        dispatch(showLoginPopupRegisterPart());
    };

    const handleOnClickRegisterPopupCloseBtn = () => {
        dispatch(hideLoginPopupRegisterPart());
        dispatch(hideLoginPopup());
        dispatch(showLoginPopupLoginPart());
    };
    const handleOnClickRegisterPopupSubmitBtn = () => {
        dispatch(hideRegisterPopup());
        dispatch(showLoginPopup());
        
        dispatch(hideLoginPopupRegisterPart());
        dispatch(showLoginPopupLoginPart());
    };

    const handleOnClickRegisterFormBtn = () => {
        dispatch(hideLoginPopup());
        dispatch(showRegisterPopup());
    };
    
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <Link to={"/"} className="header__logo">
                            <img src={header_logo} alt="Логотип" className="header__logo-img" />
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
                            
                            <input onFocus={handleOnFocusSearchInput} onBlur={handleOnBlurSearchInput} onChange={handleOnChangeSearchInput} className="header__search" placeholder="Поиск" type="text" value={searchValue}/>
                            <ul className={"header__movies " + headerMoviesSecondClass}>
                                {filteredMovies && filteredMovies?.map((item) => {
                                    let starColor: string = "";
                                    if(item.tmdbRating > 8) {
                                        starColor = "#308E21";
                                    } else if(item.tmdbRating > 7) {
                                        starColor = "#A59400";
                                    } else {
                                        starColor = "#777";
                                    }

                                    return (
                                        <Link to={`/movies/${item.id}`} key={item.id}>
                                            <li className="header__movie">
                                                <img src={item.backdropUrl} alt="Постер" className="header__movie-img" />
                                                <div className="header__movie-content">
                                                    <div className="header__details">
                                                        <span className="header__detail--rating" style={{
                                                            backgroundColor: starColor,
                                                        }}>
                                                            <img src={rating_star} alt="Звезда" />
                                                            {item.tmdbRating}
                                                        </span>
                                                        <span className="header__detail--releaseYear">{item.releaseYear}</span>
                                                        <span className="header__detail--genres">
                                                            {item.genres.length === 1
                                                                ? item.genres[0]
                                                                : item.genres.map((genre: string, index: number) => {
                                                                    return (
                                                                        index + 1 === item.genres.length ? genre : genre + ", "
                                                                    )
                                                            })}
                                                        </span>
                                                        <span className="header__detail--runtime">{item.runtime} мин.</span>
                                                    </div>
                                                    <h3 className="header__movie-title">{item.title}</h3>
                                                </div>
                                            </li>
                                        </Link>
                                    )
                                })}
                            </ul>
                            <ul className={"header__movies " + headerAllMoviesSecondClass}>
                                {filteredMovies && filteredMovies?.map((item) => {
                                    let starColor: string = "";
                                    if(item.tmdbRating > 8) {
                                        starColor = "#308E21";
                                    } else if(item.tmdbRating > 7) {
                                        starColor = "#A59400";
                                    } else {
                                        starColor = "#777";
                                    }

                                    return (
                                        <Link to={`/movies/${item.id}`} key={item.id}>
                                            <li className="header__movie">
                                                <img src={item.backdropUrl} alt="Постер" className="header__movie-img" />
                                                <div className="header__movie-content">
                                                    <div className="header__details">
                                                        <span className="header__detail--rating" style={{
                                                            backgroundColor: starColor,
                                                        }}>
                                                            <img src={rating_star} alt="Звезда" />
                                                            {item.tmdbRating}
                                                        </span>
                                                        <span className="header__detail--releaseYear">{item.releaseYear}</span>
                                                        <span className="header__detail--genres">
                                                            {item.genres.length === 1
                                                                ? item.genres[0]
                                                                : item.genres.map((genre: string, index: number) => {
                                                                    return (
                                                                        index + 1 === item.genres.length ? genre : genre + ", "
                                                                    )
                                                            })}
                                                        </span>
                                                        <span className="header__detail--runtime">{item.runtime} мин.</span>
                                                    </div>
                                                    <h3 className="header__movie-title">{item.title}</h3>
                                                </div>
                                            </li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </nav>
                        
                        {headerBtnNode}

                        <nav className="header__nav--mobile">
                            <ul className="header__list--mobile">
                                <li className="header__item--mobile">
                                    <Link to={`/genres`}>
                                        <img src={genres_icon} alt="Жанры"/>
                                    </Link>
                                </li>
                                <li className="header__item--mobile">
                                    <Link to={`/genres`}>
                                        <img src={search_icon} alt="Поиск"/>
                                    </Link>
                                </li>
                                <li className="header__item--mobile">
                                    {headerMobileBtnNode}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <LoginPopup
                doesShowLoginPopup={doesShowLoginPopup}
                doesShowLoginPopupRegisterPart={doesShowLoginPopupRegisterPart}
                doesShowLoginPopupLoginPart={doesShowLoginPopupLoginPart}
                handleOnClickCloseBtn={handleOnClickLoginPopupCloseBtn}
                handleOnClickRegisterChangeBtn={handleOnClickLoginPopupChangeBtn}
                handleOnClickRegisterFormBtn={handleOnClickRegisterFormBtn}
            />
            <RegisterPopup
                doesShowRegisterPopup={doesShowRegisterPopup}
                handleOnClickCloseBtn={handleOnClickRegisterPopupCloseBtn}
                handleOnClickSubmitBtn={handleOnClickRegisterPopupSubmitBtn}
            />
        </>
    );
};