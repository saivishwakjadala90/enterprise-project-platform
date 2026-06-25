import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";

function ProjectDialog({
                           open,
                           handleClose,
                           editingId,
                           projectName,
                           setProjectName,
                           description,
                           setDescription,
                           status,
                           setStatus,
                           priority,
                           setPriority,
                           ownerEmail,
                           setOwnerEmail,
                           createProject,
                           updateProject
                       }) {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>
                {editingId ? "Edit Project" : "Create Project"}
            </DialogTitle>

            <DialogContent>
                <TextField
                    label="Project Name"
                    fullWidth
                    margin="normal"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />

                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <TextField
                    select
                    label="Status"
                    fullWidth
                    margin="normal"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                    <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                    <MenuItem value="BLOCKED">BLOCKED</MenuItem>
                </TextField>

                <TextField
                    select
                    label="Priority"
                    fullWidth
                    margin="normal"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <MenuItem value="HIGH">HIGH</MenuItem>
                    <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                    <MenuItem value="LOW">LOW</MenuItem>
                </TextField>

                <TextField
                    label="Owner Email"
                    fullWidth
                    margin="normal"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>

                <Button
                    variant="contained"
                    onClick={editingId ? updateProject : createProject}
                >
                    {editingId ? "Update" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProjectDialog;