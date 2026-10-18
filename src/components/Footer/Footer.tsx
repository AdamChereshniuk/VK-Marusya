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
                        <a className="footer__socials-link" href="/" target="_blank">
                            <img className="footer__socials-img" src={vk} alt="VK" />
                        </a>
                    </li>
                    <li className="footer__socials-item">
                        <a className="footer__socials-link" href="/" target="_blank">
                            <img className="footer__socials-img" src={youtube} alt="YouTube" />
                        </a>
                    </li>
                    <li className="footer__socials-item">
                        <a className="footer__socials-link" href="/" target="_blank">
                            <img className="footer__socials-img" src={ok} alt="OK" />
                        </a>
                    </li>
                    <li className="footer__socials-item">
                        <a className="footer__socials-link" href="/" target="_blank">
                            <img className="footer__socials-img" src={telegram} alt="Telegram" />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};