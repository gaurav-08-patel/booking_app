import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

let AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const validateToken = async () => {
        let response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/validateToken`,
            {
                credentials: "include",
            },
        );

        let responseBody = await response.json();
        if (!response.ok) {
            throw new Error(response.message);
        }

        return responseBody;
    };

    let { isError } = useQuery({
        queryKey: ["validateToken"],
        queryFn: validateToken,
        retry: false,
    });

    return (
        <AppContext.Provider value={{ isLoggedIn: !isError }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
