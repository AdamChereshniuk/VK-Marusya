import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
    return (
        <section className="notfound-section">
            <div className="container">
                <div className="notfound__wrapper">
                    <h2 className="notfound__title">Ошибка 404</h2>
                    <p className="notfound__text">Ваша страница не найдена :(</p>
                    <Link className="notfound__link" to={`/`}>Перейти на главную</Link>
                </div>
            </div>
        </section>
    );
};