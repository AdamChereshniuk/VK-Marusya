import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { useParams } from "react-router-dom";
import { Movie } from "../../api/MoviesApi";
import { Link } from "react-router-dom";
import { useState } from "react";
import arrow  from "../../assets/GenreFilmsPage/arrow.svg";
import Api from "../../api/api";
import "./GenreFilmsPage.css";

export function GenreFilmsPage() {
    const { genreId } = useParams();

    const { data: genreFilmsList } = useQuery({
        queryFn: () => Api.getFilteredMovies(50, 1, "", genreId),
        queryKey: ["genreFilmsList"],
    }, queryClient);

    const [visibleGenreMoviesList, setVisibleGenreMoviesList] = useState<Movie[] | undefined>(genreFilmsList?.slice(0, 10));
    const [doesHaveMoreMovies, setDoesHaveMoreMovies] = useState<boolean>(true);

    const handleOnClickMoreBtn = () => {
        if(!doesHaveMoreMovies) return;

        const nextVisibleMoviesList = genreFilmsList?.slice(
            visibleGenreMoviesList?.length,
            Number(visibleGenreMoviesList?.length) + 10
        );

        setVisibleGenreMoviesList([...visibleGenreMoviesList, ...nextVisibleMoviesList]);
    };
    
    return (
        <section className="films-section">
            <div className="container">
                <h2 className="films__heading">
                    <Link to={"/genres"}>
                        <img src={arrow} alt="Стрелка" />
                        {genreId}
                    </Link>
                </h2>

                <ul className="films__list">
                    {visibleGenreMoviesList && visibleGenreMoviesList?.map((item, index) => {
                        return (
                            <li className="films__item" key={index + 1} style={{color: "red"}}>
                                <Link to={`/movies/${item.id}`}>
                                    <img src={item.posterUrl} alt="Фото нет" />
                                </Link>
                            </li>  
                        )
                    })}
                </ul>

                <button className="films__btn--more primary__btn" onClick={handleOnClickMoreBtn}>Показать ещё</button>
            </div>
        </section>
    );
};