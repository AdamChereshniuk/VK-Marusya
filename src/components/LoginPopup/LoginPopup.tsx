import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";
import popup_logo from "../../assets/MainPage/popup-logo.png";
import closeBtnImg from "../../assets/Header/close btn.svg";
import { MouseEventHandler } from "react";
import "./LoginPopup.css";

type LoginPopupProps = {
    doesShowLoginPopup: boolean,
    doesShowLoginPopupRegisterPart: boolean,
    doesShowLoginPopupLoginPart: boolean,
    handleOnClickCloseBtn: MouseEventHandler,
    handleOnClickRegisterChangeBtn: MouseEventHandler,
    handleOnClickRegisterFormBtn: () => void,
};

export const LoginPopup = ({doesShowLoginPopup, doesShowLoginPopupRegisterPart, doesShowLoginPopupLoginPart, handleOnClickCloseBtn, handleOnClickRegisterChangeBtn, handleOnClickRegisterFormBtn}: LoginPopupProps) => {
    return (
        <>
            {doesShowLoginPopup && (
                <div className="login-popup">
                    <div className="login-popup__box">
                        <div className="login-popup__content">
                            <img className="login-popup__logo" src={popup_logo} alt="Логотип"/>
                            
                            {doesShowLoginPopupRegisterPart && (
                                <div className="register-user">
                                    <h3 className="register-user__title">Регистрация</h3>
                                    <RegisterForm
                                        handleOnClickRegisterFormBtn={handleOnClickRegisterFormBtn}
                                    />
                                    <button className="register-user__btn--change" onClick={handleOnClickRegisterChangeBtn}>У меня есть пароль</button>
                                </div>
                            )}
                            {doesShowLoginPopupLoginPart && (
                                <div className="login-user">
                                    <LoginForm/>
                                </div>
                            )}
                        </div>
                        <button className="login-popup__btn--close" onClick={handleOnClickCloseBtn}>
                            <img src={closeBtnImg} alt="Крестик" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};