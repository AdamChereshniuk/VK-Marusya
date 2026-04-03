import { hideSuccessRegistrationPopup } from "../../redux/Slices/doesShowSuccessRegistrationPopupSlice";
import { showLoginPopup } from "../../redux/Slices/doesShowLoginPopupSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import cross from "../../assets/Header/close.svg";
import logo from "../../assets/Header/logo.svg";
import "./SuccessRegistrationPopup.css";

export const SuccessRegistrationPopup = () => {
    const doesShowSuccessRegistrationPopup = useAppSelector((state) => state.showSuccessRegistrationPopup.doesShowSuccessRegistrationPopup);
    const handleOnClickCloseBtn = () => dispatch(hideSuccessRegistrationPopup());
    const handleOnClickSubmitBtn = () => {
        dispatch(hideSuccessRegistrationPopup());
        dispatch(showLoginPopup());
    };
    const dispatch = useAppDispatch();
    
    return (
        <>
            {doesShowSuccessRegistrationPopup && (
                <div className="success-registration-popup">
                    <div className="success-registration-popup__box">
                        <div className="success-registration-popup__content">
                            <img className="success-registration-popup__logo" src={logo} alt="Лого"/>
                            <div className="success-registration-popup__info">
                                <span className="success-registration-popup__title">Регистрация завершена</span>
                                <span className="success-registration-popup__text">Используйте вашу электронную почту для входа</span>
                                <button className="success-registration-popup__submit-btn" onClick={handleOnClickSubmitBtn}>Войти</button>
                            </div>
                        </div>
                        <button className="success-registration-popup__close-btn" onClick={handleOnClickCloseBtn}>
                            <img src={cross} alt="Закрыть"/>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};