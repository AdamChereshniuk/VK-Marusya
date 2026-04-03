import { hideLoginPopup } from "../../redux/Slices/doesShowLoginPopupSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { LoginForm } from "../LoginForm/LoginForm";
import close from "../../assets/Header/close.svg";
import logo from "../../assets/Header/logo.svg";
import "./LoginPopup.css";

export const LoginPopup = () => {
    const doesShowLoginPopup = useAppSelector((state) => state.showLoginPopup.doesShowLoginPopup);
    const handleOnClickCloseBtn = () => dispatch(hideLoginPopup());
    const dispatch = useAppDispatch();

    return (
        <>
            {doesShowLoginPopup && (
                <div className="login-popup">
                    <div className="login-popup__box">
                        <div className="login-popup__content">
                            <img className="login-popup__logo" src={logo} alt="Лого"/>
                            <LoginForm/>
                        </div>
                        <button className="login-popup__close-btn" onClick={handleOnClickCloseBtn}>
                            <img src={close} alt="Закрыть"/>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};