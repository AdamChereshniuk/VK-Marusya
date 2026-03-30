import { Route, Routes } from "react-router-dom";
import {
    MainPage,
    GenresPage,
    GenreFilmsPage,
    FilmPage,
    AccountPage,
    NotFoundPage
} from "../../pages";
import { User } from "../../api/AuthApi";

export const Main = ({ currentUser, isCurrentUserAuthorized }: { currentUser?: User, isCurrentUserAuthorized: boolean }) => {
    return (
        <main className="main">
            <Routes>
                <Route path="/" element={<MainPage isCurrentUserAuthorized={isCurrentUserAuthorized} currentUser={currentUser} />} />
                <Route path="/genres" element={<GenresPage />} />
                <Route path="/genres/:genreId" element={<GenreFilmsPage />} />
                <Route path="/movies/:movieId" element={<FilmPage isCurrentUserAuthorized={isCurrentUserAuthorized} currentUser={currentUser} />} />
                <Route path="*" element={<NotFoundPage />} />
                {currentUser && (
                    <Route path="/currentUserAccount" element={<AccountPage currentUser={currentUser} />} />
                )}
            </Routes>
        </main>
    );
};