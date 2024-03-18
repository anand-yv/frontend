import { createContext, useState, useContext } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

// 1. Create Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 2. Share the created context with other components
export default function AuthProvider({ children }) {
    // 3. Put Some state in context
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    // Authentication by comparing.
    /*
        function login(username, password) {
            if (username === "anand" && password === "12345") {
                setUsername(username);
                setAuthenticated(true);
                return true;
            } else {
                setAuthenticated(false);
                setUsername(null);
                return false;
            }
        }
    */

    // BASIC AUTHENTICATION through Base64
    /*
        async function login(username, password) {

        const batoken = "Basic " + window.btoa(username + ":" + password);

        try {
            const response = await executeBasicAuthenticationService(batoken);
            if (response.status === 200) {
                setUsername(username);
                setAuthenticated(true);
                setToken(batoken);

                apiClient.interceptors.request.use(
                    (config) => {
                        // console.log("intercepting and adding token");
                        config.headers.Authorization = batoken;
                        return config;
                    }
                );

                return true;
            } else {
                logout();
                return false;
            }
        }
        catch {
            logout();
            return false;
        }
    }
    */


    // Authentication using JWT
    async function login(username, password) {

        try {
            const response = await executeJwtAuthenticationService(username, password);
            if (response.status === 200) {
                const jwtToken = "Bearer " + response.data.token
                setUsername(username);
                setAuthenticated(true);
                setToken(jwtToken);

                apiClient.interceptors.request.use(
                    (config) => {
                        // console.log("intercepting and adding token");
                        config.headers.Authorization = jwtToken;
                        return config;
                    }
                );

                return true;
            } else {
                logout();
                return false;
            }
        }
        catch {
            logout();
            return false;
        }
    }

    function logout() {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    }


    return (
        <>
            <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
                {children}
            </AuthContext.Provider>
        </>
    );
}




