import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ProjectDialog from "../components/ProjectDialog";
import ProjectTable from "../components/ProjectTable";
import api from "../services/api";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("IN_PROGRESS");
    const [priority, setPriority] = useState("MEDIUM");
    const [ownerEmail, setOwnerEmail] = useState("admin@test.com");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const response = await api.get("/api/projects");
        setProjects(response.data);
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
        setProjectName("");
        setDescription("");
        setStatus("IN_PROGRESS");
        setPriority("MEDIUM");
        setOwnerEmail("admin@test.com");
    };

    const createProject = async () => {
        await api.post("/api/projects", {
            projectName,
            description,
            status,
            priority,
            ownerEmail
        });

        closeDialog();
        fetchProjects();
    };

    const updateProject = async () => {
        await api.put(`/api/projects/${editingId}`, {
            projectName,
            description,
            status,
            priority,
            ownerEmail
        });

        closeDialog();
        fetchProjects();
    };

    const editProject = (project) => {
        setEditingId(project.id);
        setProjectName(project.projectName);
        setDescription(project.description);
        setStatus(project.status);
        setPriority(project.priority);
        setOwnerEmail(project.ownerEmail);
        setDialogOpen(true);
    };

    const deleteProject = async (id) => {
        await api.delete(`/api/projects/${id}`);
        fetchProjects();
    };

    const filteredProjects = projects.filter((project) =>
        project.projectName?.toLowerCase().includes(searchText.toLowerCase())
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
                        Projects
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={openCreateDialog}
                    >
                        New Project
                    </Button>
                </Box>

                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <ProjectTable
                    projects={filteredProjects}
                    editProject={editProject}
                    deleteProject={deleteProject}
                />

                <ProjectDialog
                    open={dialogOpen}
                    handleClose={closeDialog}
                    editingId={editingId}
                    projectName={projectName}
                    setProjectName={setProjectName}
                    description={description}
                    setDescription={setDescription}
                    status={status}
                    setStatus={setStatus}
                    priority={priority}
                    setPriority={setPriority}
                    ownerEmail={ownerEmail}
                    setOwnerEmail={setOwnerEmail}
                    createProject={createProject}
                    updateProject={updateProject}
                />
            </Box>
        </div>
    );
}

export default Projects;