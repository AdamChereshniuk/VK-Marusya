import telegram from "../../assets/Footer/telegram.svg";
import youtube from "../../assets/Footer/youtube.svg";
import vk from "../../assets/Footer/vk.svg";
import ok from "../../assets/Footer/ok.svg";
import "./Footer.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <ul className="footer__socials-list">
                    <li className="footer__socials-item">
                        <img src={vk} alt="VK" />
                    </li>
                    <li className="footer__socials-item">
                        <img src={youtube} alt="YouTube" />
                    </li>
                    <li className="footer__socials-item">
                        <img src={ok} alt="OK" />
                    </li>
                    <li className="footer__socials-item">
                        <img src={telegram} alt="Telegram" />
                    </li>
                </ul>
            </div>
        </footer>
    );
};