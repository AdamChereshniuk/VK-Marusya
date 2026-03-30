import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { Link } from "react-router-dom";
import Api from "../../api/api";
import drama from "../../assets/GenresPage/drama.jpg";
import comedy from "../../assets/GenresPage/comedy.jpg";
import detectiv from "../../assets/GenresPage/detectiv.jpg";
import family from "../../assets/GenresPage/family.jpg";
import history from "../../assets/GenresPage/history.jpg";
import thriller from "../../assets/GenresPage/thriller.jpg";
import fantasy from "../../assets/GenresPage/fantasy.jpg";
import adventures from "../../assets/GenresPage/adventures.jpg";
import plugImg from "../../assets/GenresPage/plug.jpg";
import "./GenresPage.css";

const imagesArr = [
    history,
    plugImg,
    plugImg,
    plugImg,
    fantasy,
    drama,
    plugImg,
    family,
    comedy,
    plugImg,
    plugImg,
    detectiv,
    plugImg,
    plugImg,
    plugImg,
    thriller,
    plugImg,
    plugImg,
    plugImg,
    adventures,
];
export function GenresPage() {
    const { data: genres } = useQuery({
        queryFn: () => Api.getGenres(),
        queryKey: ["genres"],
    }, queryClient);

    return (
        <section className="genres-section">
            <div className="container">
                <h1 className="genres__title">Жанры фильмов</h1>
                <ul className="genres__list">
                    {genres && genres?.map((item: string, index: number) => {
                        return (
                            <li className="genres__item" key={item}>
                                <Link to={`/genres/${item}`}>
                                    <img src={imagesArr[index]} alt="Фото нет" />
                                    <div>
                                        <span>{item}</span>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}