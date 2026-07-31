import axios from "axios";

const API = "http://localhost:8080/api/attachments";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const uploadAttachment = async (taskId, file, uploadedBy) => {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("uploadedBy", uploadedBy);

    return axios.post(
        `${API}/upload/${taskId}`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );
};

export const getAttachments = async (taskId) => {
    return axios.get(
        `${API}/task/${taskId}`,
        authHeader()
    );
};

export const deleteAttachment = async (id) => {
    return axios.delete(
        `${API}/${id}`,
        authHeader()
    );
};

export const downloadAttachment = (id) => {
    window.open(
        `${API}/download/${id}`,
        "_blank"
    );
};