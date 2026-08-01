import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";

import StatusChip from "./StatusChip";
import PriorityChip from "./PriorityChip";

function ProjectTable({
                          projects,
                          editProject,
                          deleteProject
                      }) {

    const navigate = useNavigate();

    return (
        <TableContainer component={Paper}>
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                    {projects.map((project) => (

                        <TableRow key={project.id} hover>

                            <TableCell>{project.id}</TableCell>

                            <TableCell>{project.projectName}</TableCell>

                            <TableCell>
                                <StatusChip status={project.status} />
                            </TableCell>

                            <TableCell>
                                <PriorityChip priority={project.priority} />
                            </TableCell>

                            <TableCell>{project.ownerEmail}</TableCell>

                            <TableCell align="center">

                                <Tooltip title="Edit Project">
                                    <IconButton
                                        color="primary"
                                        onClick={() => editProject(project)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete Project">
                                    <IconButton
                                        color="error"
                                        onClick={() => deleteProject(project.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Open Workspace">
                                    <IconButton
                                        color="success"
                                        onClick={() => navigate(`/workspace/${project.id}`)}
                                    >
                                        <LaunchIcon />
                                    </IconButton>
                                </Tooltip>

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>
        </TableContainer>
    );
}

export default ProjectTable;