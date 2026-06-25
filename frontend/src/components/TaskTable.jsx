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

function TaskTable({ tasks, editTask, deleteTask }) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Task</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Assigned To</TableCell>
                        <TableCell>Project ID</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id} hover>
                            <TableCell>{task.id}</TableCell>
                            <TableCell>{task.taskName}</TableCell>

                            <TableCell>
                                <StatusChip status={task.status} />
                            </TableCell>

                            <TableCell>
                                <PriorityChip priority={task.priority} />
                            </TableCell>

                            <TableCell>{task.assignedTo}</TableCell>
                            <TableCell>{task.projectId}</TableCell>
                            <TableCell>{task.dueDate}</TableCell>

                            <TableCell>
                                <IconButton color="primary" onClick={() => editTask(task)}>
                                    <EditIcon />
                                </IconButton>

                                <IconButton color="error" onClick={() => deleteTask(task.id)}>
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

export default TaskTable;