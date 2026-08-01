import api from "./api";

export const getRecentActivity = async () => {

    const response = await api.get("/api/activity-logs/recent");

    return response.data;

};