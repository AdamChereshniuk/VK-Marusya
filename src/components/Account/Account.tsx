import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Main } from "../Main/Main";
import Api from "../../api/api";

export const Account = () => {
    const meQuery = useQuery({
        queryFn: () => Api.fetchMe(),
        queryKey: ["users", "me"],
        retry: 0,
    }, queryClient);

    switch(meQuery.status) {
        case "error":
            return (
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    <Header isUserAuthorized={false}/>
                    <Main isUserAuthorized={false}/>
                    <Footer/>
                </BrowserRouter>
            )
        case "success":
            return (
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    <Header isUserAuthorized={true} userData={meQuery.data}/>
                    <Main isUserAuthorized={true} userData={meQuery.data}/>
                    <Footer/>
                </BrowserRouter>
            );
    };
};