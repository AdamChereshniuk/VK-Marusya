import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { BrowserRouter, Link } from "react-router-dom";
import { Main } from "../Main/Main";
import { Loader } from "../Loader/Loader";
import { MouseEventHandler } from "react";
import { showLoginPopup } from "../../redux/Slices/doesShowLoginPopupSlice";
import { useDispatch } from "react-redux";
import person_icon from "../../assets/Header/person_icon.svg";
import Api from "../../api/api";
import "./Account.css";

export const Account = () => {
    const meQuery = useQuery(
        {
            queryFn: () => Api.fetchMe(),
            queryKey: ["users", "me"],
            retry: 0,
        },
        queryClient
    );

    const dispatch = useDispatch();
    const handleOnClickHeaderBtn: MouseEventHandler = () => {
        dispatch(showLoginPopup());
    };

    switch(meQuery.status) {
        case "pending":
            return <Loader/>
        case "error":
            return (
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    <Header
                        headerBtnNode={
                            <button className="header__login-btn" onClick={handleOnClickHeaderBtn}>Войти</button>
                        }
                        headerMobileBtnNode={
                            <button onClick={handleOnClickHeaderBtn}>
                                <img src={person_icon} alt="Профиль"/>
                            </button>
                        }
                    />
                    
                    <Main
                        isCurrentUserAuthorized={false}
                    />
                        
                    <Footer />
                </BrowserRouter>
            )
        case "success":
            return (
                <BrowserRouter>
                    <Header
                        headerBtnNode={
                            <button className="header__login-btn">
                                <Link to={`/currentUserAccount`}>
                                    {meQuery.data.name.charAt(0).toUpperCase() + meQuery.data.name.slice(1)}
                                </Link>
                            </button>
                        }
                        headerMobileBtnNode={
                            <Link to={`/currentUserAccount`}><img src={person_icon} alt="Профиль"/></Link>
                        }
                    />

                    <Main
                        currentUser={meQuery.data}
                        isCurrentUserAuthorized={true}
                    />

                    <Footer />
                </BrowserRouter>
            );
    };
};