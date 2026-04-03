import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { useParams } from "react-router-dom";
import { IMovie } from "../../api/MoviesApi";
import { Link } from "react-router-dom";
import { useState } from "react";
import arrow  from "../../assets/GenreFilmsPage/arrow.svg";
import Api from "../../api/api";
import "./GenreMoviesPage.css";

export function GenreMoviesPage() {
    const { data: genreMoviesList } = useQuery({
        queryFn: () => Api.getFilteredMovies(50, 1, "", String(genreId)),
        queryKey: ["genreMoviesList"],
    }, queryClient);

    const [visibleGenreMoviesList, setVisibleGenreMoviesList] = useState<IMovie[]>(genreMoviesList?.slice(0, 10) || []);
    const [doesHaveMoreMovies] = useState<boolean>(true);
    const { genreId } = useParams();

    const handleOnClickMoreBtn = () => {
        if(!doesHaveMoreMovies || !genreMoviesList) return;

        const nextVisibleMoviesList = genreMoviesList.slice(visibleGenreMoviesList.length).length < 10
        ? genreMoviesList.slice(visibleGenreMoviesList.length)
        : genreMoviesList.slice(visibleGenreMoviesList.length, visibleGenreMoviesList.length + 10);

        setVisibleGenreMoviesList([...visibleGenreMoviesList, ...nextVisibleMoviesList]);
    };
    
    return (
        <section className="genre-movies-section">
            <div className="container">
                <h2 className="genre-movies__heading">
                    <Link to={"/genres"}>
                        <img src={arrow} alt="Стрелка"/> {genreId}
                    </Link>
                </h2>

                <ul className="genre-movies__list">
                    {visibleGenreMoviesList && visibleGenreMoviesList.map((item, index) => {
                        return (
                            <li className="genre-movies__item" key={index + 1} style={{color: "red"}}>
                                <Link to={`/movies/${item.id}`}>
                                    <img src={item.posterUrl} alt="Фото нет"/>
                                </Link>
                            </li>  
                        )
                    })}
                </ul>

                <button className="genre-movies__more-btn primary__btn" onClick={handleOnClickMoreBtn}>Показать ещё</button>
            </div>
        </section>
    );
};