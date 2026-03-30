import footer_VK_icon from "../../assets/Footer/VK.png";
import footer_YouTube_icon from "../../assets/Footer/YouTube.png";
import footer_OK_icon from "../../assets/Footer/OK.png";
import footer_Telegram_icon from "../../assets/Footer/Telegram.png";
import "./Footer.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <ul className="footer__socials-list">
                    <li className="footer__socials-item">
                        <img src={footer_VK_icon} alt="VK" />
                    </li>
                    <li className="footer__socials-item">
                        <img src={footer_YouTube_icon} alt="YouTube" />
                    </li>
                    <li className="footer__socials-item">
                        <img src={footer_OK_icon} alt="OK" />
                    </li>
                    <li className="footer__socials-item">
                        <img src={footer_Telegram_icon} alt="Telegram" />
                    </li>
                </ul>
            </div>
        </footer>
    );
};