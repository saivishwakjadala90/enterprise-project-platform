import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import TaskDialog from "../components/TaskDialog";
import TaskTable from "../components/TaskTable";
import api from "../services/api";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("TODO");
    const [priority, setPriority] = useState("MEDIUM");
    const [assignedTo, setAssignedTo] = useState("admin@test.com");
    const [projectId, setProjectId] = useState(1);
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await api.get("/api/tasks");
        setTasks(response.data);
    };

    const openCreateDialog = () => {
        clearForm();
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        clearForm();
    };

    const clearForm = () => {
        setEditingId(null);
        setTaskName("");
        setDescription("");
        setStatus("TODO");
        setPriority("MEDIUM");
        setAssignedTo("admin@test.com");
        setProjectId(1);
        setDueDate("");
    };

    const createTask = async () => {
        await api.post("/api/tasks", {
            taskName,
            description,
            status,
            priority,
            assignedTo,
            projectId,
            dueDate
        });

        closeDialog();
        fetchTasks();
    };

    const updateTask = async () => {
        await api.put(`/api/tasks/${editingId}`, {
            taskName,
            description,
            status,
            priority,
            assignedTo,
            projectId,
            dueDate
        });

        closeDialog();
        fetchTasks();
    };

    const editTask = (task) => {
        setEditingId(task.id);
        setTaskName(task.taskName);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
        setAssignedTo(task.assignedTo);
        setProjectId(task.projectId);
        setDueDate(task.dueDate || "");
        setDialogOpen(true);
    };

    const deleteTask = async (id) => {
        await api.delete(`/api/tasks/${id}`);
        fetchTasks();
    };

    const filteredTasks = tasks.filter((task) =>
        task.taskName?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <Navbar />

            <Box sx={{ padding: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 3
                    }}
                >
                    <Typography variant="h4">
                        Tasks
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={openCreateDialog}
                    >
                        New Task
                    </Button>
                </Box>

                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <TaskTable
                    tasks={filteredTasks}
                    editTask={editTask}
                    deleteTask={deleteTask}
                />

                <TaskDialog
                    open={dialogOpen}
                    handleClose={closeDialog}
                    editingId={editingId}
                    taskName={taskName}
                    setTaskName={setTaskName}
                    description={description}
                    setDescription={setDescription}
                    status={status}
                    setStatus={setStatus}
                    priority={priority}
                    setPriority={setPriority}
                    assignedTo={assignedTo}
                    setAssignedTo={setAssignedTo}
                    projectId={projectId}
                    setProjectId={setProjectId}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    createTask={createTask}
                    updateTask={updateTask}
                />
            </Box>
        </div>
    );
}

export default Tasks;