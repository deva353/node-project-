import {
    createContext,
    useContext,
    useState
} from "react";

import {
    registerUser,
    loginUser
} from "../services/api";


const AuthContext =
    createContext();


export const AuthProvider = ({
    children
}) => {

    const [user, setUser] =
        useState(
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            )
        );


    const register = async (
        data
    ) => {

        return await registerUser(
            data
        );
    };


    const login = async (
        data
    ) => {

        const result =
            await loginUser(
                data
            );


        localStorage.setItem(
            "token",
            result.token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(
                result.user
            )
        );


        setUser(
            result.user
        );


        return result;
    };


    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setUser(null);
    };


    return (

        <AuthContext.Provider
            value={{
                user,
                register,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};


export const useAuth = () =>
    useContext(AuthContext);