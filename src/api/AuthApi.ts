import { validateResponse } from "./api";
import { BASE_URL } from "./config";

export interface IUser {
    name: string;
    surname: string;
    email: string;
    favorites: string[];
};

export const loginUser = async(email: string, password: string) => {
    await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then(validateResponse);
};

export const registerUser = async(email: string, password: string, name: string, surname: string): Promise<any> => {
    await fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, surname }),
    });
};

export const logoutUser = async() => {
    await fetch(`${BASE_URL}/auth/logout`, { credentials: "include" });
};

export const fetchMe = async(): Promise<IUser> => {
    const response = await fetch(`${BASE_URL}/profile`, { credentials: "include" }).then(validateResponse);
    const data = response.json();

    return data;
};