import api from "./api";

export const getWorkspaceOverview = async (projectId) => {
    const response = await api.get(`/api/workspaces/${projectId}/overview`);
    return response.data;
};