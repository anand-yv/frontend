import { apiClient } from "./ApiClient";

export const retrieveAllTodosforUsernameApi = (username) =>
    apiClient.get(`/users/${username}/todos`);

export const deleteTodoByIdApi = (username, id) =>
    apiClient.delete(`/users/${username}/todos/${id}`);

export const retrieveTodoApi = (username, id) =>
    apiClient.get(`/users/${username}/todos/${id}`);

export const updateTodoByApi = (username, id, todo) =>
    apiClient.put(`/users/${username}/todos/${id}`, todo);

export const createTodoByApi = (username, todo) =>
    apiClient.post(`/users/${username}/todos`, todo);