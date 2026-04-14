import { hideRegisterPopup } from "../../redux/Slices/doesShowRegisterPopupSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import popup_logo from "../../assets/MainPage/popup-logo.png";
import closeBtnImg from "../../assets/Header/close.svg";
import "./RegisterPopup.css";

export const RegisterPopup = () => {
    const doesShowRegisterPopup = useAppSelector((state) => state.showRegisterPopup.doesShowRegisterPopup);
    const handleOnClickCloseBtn = () => dispatch(hideRegisterPopup());
    const dispatch = useAppDispatch();

    return (
        <>
            {doesShowRegisterPopup && (
                <div className="register-popup">
                    <div className="register-popup__box">
                        <div className="register-popup__content">
                            <img className="register-popup__logo" src={popup_logo} alt="Лого"/>
                            <RegisterForm/>
                            <button className="register-popup__mobile-close-btn" onClick={handleOnClickCloseBtn}>
                                <img className="register-popup__mobile-close-img" src={closeBtnImg} alt="Закрыть"/>
                            </button>
                        </div>

                        <button className="register-popup__close-btn" onClick={handleOnClickCloseBtn}>
                            <img className="register-popup__close-img" src={closeBtnImg} alt="Закрыть"/>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};