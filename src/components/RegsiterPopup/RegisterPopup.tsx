import popup_logo from "../../assets/MainPage/popup-logo.png";
import closeBtnImg from "../../assets/Header/close btn.svg";
import { MouseEventHandler } from "react";
import "./RegisterPopup.css";

type RegisterPopupProps = {
    doesShowRegisterPopup: boolean,
    handleOnClickCloseBtn: MouseEventHandler,
    handleOnClickSubmitBtn: MouseEventHandler,
};

export const RegisterPopup = ({doesShowRegisterPopup, handleOnClickCloseBtn, handleOnClickSubmitBtn}: RegisterPopupProps) => {
    return(
        <>
            {doesShowRegisterPopup && (
                <div className="register-popup">
                    <div className="register-popup__box">
                        <div className="register-popup__content">
                            <img className="register-popup__logo" src={popup_logo} alt="Логотип"/>
                            <h3 className="register-popup__title">Регистрация завершена</h3>
                            <p className="register-popup__text">Используйте вашу электронную почту для входа</p>

                            <button className="register-popup__btn--submit primary__btn" onClick={handleOnClickSubmitBtn}>Войти</button>
                        </div>
                        <button className="register-popup__btn--close" onClick={handleOnClickCloseBtn}>
                            <img src={closeBtnImg} alt="Крестик" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
