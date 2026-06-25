import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";

function TaskDialog({
                        open,
                        handleClose,
                        editingId,
                        taskName,
                        setTaskName,
                        description,
                        setDescription,
                        status,
                        setStatus,
                        priority,
                        setPriority,
                        assignedTo,
                        setAssignedTo,
                        projectId,
                        setProjectId,
                        dueDate,
                        setDueDate,
                        createTask,
                        updateTask
                    }) {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {editingId ? "Edit Task" : "Create Task"}
            </DialogTitle>

            <DialogContent>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="TODO">TODO</MenuItem>
                    <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                    <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                    <MenuItem value="BLOCKED">BLOCKED</MenuItem>
                </TextField>

                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <MenuItem value="HIGH">HIGH</MenuItem>
                    <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                    <MenuItem value="LOW">LOW</MenuItem>
                </TextField>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Assigned To"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Project ID"
                    type="number"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />

            </DialogContent>

            <DialogActions>

                <Button onClick={handleClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={editingId ? updateTask : createTask}
                >
                    {editingId ? "Update" : "Create"}
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default TaskDialog;