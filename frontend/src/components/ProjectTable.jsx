import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import StatusChip from "./StatusChip";
import PriorityChip from "./PriorityChip";

function ProjectTable({
                          projects,
                          editProject,
                          deleteProject
                      }) {

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
                        <TableCell>Actions</TableCell>

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

                            <TableCell>

                                <IconButton
                                    color="primary"
                                    onClick={() => editProject(project)}
                                >
                                    <EditIcon />
                                </IconButton>

                                <IconButton
                                    color="error"
                                    onClick={() => deleteProject(project.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </TableContainer>

    );

}

export default ProjectTable;