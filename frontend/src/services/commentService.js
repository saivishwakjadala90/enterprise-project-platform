import axios from "axios";

const API = "http://localhost:8080/api/comments";

const token = () => localStorage.getItem("token");

const authHeader = {
    headers: {
        Authorization: `Bearer ${token()}`
    }
};

export const getComments = (taskId) =>
    axios.get(`${API}/task/${taskId}`, authHeader);

export const addComment = (comment) =>
    axios.post(API, comment, authHeader);

export const deleteComment = (id) =>
    axios.delete(`${API}/${id}`, authHeader);