import api from "./api";

export const getKanbanBoard = async (projectId) => {

    const response = await api.get(`/api/kanban/${projectId}`);

    return response.data;

};

export const updateTaskStatus = async (taskId, status) => {

    const response = await api.put(
        `/api/tasks/${taskId}/status`,
        null,
        {
            params: {
                status
            }
        }
    );

    return response.data;

};