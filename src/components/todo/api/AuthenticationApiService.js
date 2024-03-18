import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService = (token) =>
    apiClient.get(`/basic-auth`, {
        headers: {
            Authorization: token
        }
    });

export const executeJwtAuthenticationService = (username, password) =>
    apiClient.post(`/authenticate`, { username, password });
