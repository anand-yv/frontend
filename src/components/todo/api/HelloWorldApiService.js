import { apiClient } from "./ApiClient";

export const retrieveHelloWorldBean = () =>
    apiClient.get("/hello-world-bean");


export const retrieveHelloWorldPathVariable = (username) =>
    apiClient.get(`/hello-world/path-variable/${username}`
    );
