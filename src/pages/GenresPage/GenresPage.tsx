import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { Link } from "react-router-dom";
import adventures from "../../assets/GenresPage/adventures.jpg";
import detectiv from "../../assets/GenresPage/detectiv.jpg";
import thriller from "../../assets/GenresPage/thriller.jpg";
import history from "../../assets/GenresPage/history.jpg";
import fantasy from "../../assets/GenresPage/fantasy.jpg";
import comedy from "../../assets/GenresPage/comedy.jpg";
import family from "../../assets/GenresPage/family.jpg";
import plugImg from "../../assets/GenresPage/plug.jpg";
import drama from "../../assets/GenresPage/drama.jpg";
import Api from "../../api/api";
import "./GenresPage.css";

export function GenresPage() {
    const { data: genres } = useQuery({
        queryFn: () => Api.getGenres(),
        queryKey: ["genres"],
    }, queryClient);

    const imagesArr = [
        history, plugImg, plugImg, plugImg, fantasy, drama, plugImg, family, comedy, plugImg, plugImg,
        detectiv, plugImg, plugImg, plugImg, thriller, plugImg, plugImg, plugImg, adventures,
    ];

    return (
        <section className="genres-section">
            <div className="container">
                <h1 className="genres__title">Жанры фильмов</h1>
                <ul className="genres__list">
                    {genres && genres.map((item: string, index: number) => (
                        <li className="genres__item" key={item}>
                            <Link className="genres__item-link" to={`/genres/${item}`}>
                                <img className="genres__item-img" src={imagesArr[index]} alt="Фото нет"/>
                                <span className="genres__item-title">{`${item?.slice(0, 1).toUpperCase()}${item?.slice(1)}`}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};