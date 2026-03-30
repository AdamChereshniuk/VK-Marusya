import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
    return (
        <section className="notfound-section">
            <div className="container">
                <div className="notfound__wrapper">
                    <h2 className="notfound__title">Ошибка 404</h2>
                    <p className="notfound__message">Ваша страница не найдена :(</p>

                    <button className="notfound__btn--mainpage">
                        <Link to={`/`}>Перейти на главную</Link>
                    </button>
                </div>
            </div>
        </section>
    );
};