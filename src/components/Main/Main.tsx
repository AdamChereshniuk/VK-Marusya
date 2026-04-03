import { MainPage, GenresPage, GenreMoviesPage, MoviePage, AccountPage, NotFoundPage } from "../../pages";
import { Route, Routes } from "react-router-dom";
import { IUser } from "../../api/AuthApi";

interface IMainProps {
    isUserAuthorized: boolean;
    userData?: IUser;
};

export const Main = ({ isUserAuthorized, userData }: IMainProps) => {
    return (
        <main className="main">
            <Routes>
                <Route path="/" element={<MainPage isUserAuthorized={isUserAuthorized}/>}/>
                <Route path="/genres" element={<GenresPage/>}/>
                <Route path="/genres/:genreId" element={<GenreMoviesPage/>}/>
                <Route path="/movies/:movieId" element={<MoviePage isUserAuthorized={isUserAuthorized}/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                {isUserAuthorized && userData && <Route path="/userAccount" element={<AccountPage userData={userData}/>}/>}
            </Routes>
        </main>
    );
};