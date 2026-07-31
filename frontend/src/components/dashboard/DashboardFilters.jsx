import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";

function DashboardFilters({
                              statusFilter,
                              setStatusFilter,
                              priorityFilter,
                              setPriorityFilter,
                              searchTerm,
                              setSearchTerm
                          }) {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                marginBottom: 4
            }}
        >
            <TextField
                label="Search"
                size="small"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                sx={{ minWidth: 220 }}
            />

            <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Project Status</InputLabel>

                <Select
                    value={statusFilter}
                    label="Project Status"
                    onChange={(event) => setStatusFilter(event.target.value)}
                >
                    <MenuItem value="ALL">All Statuses</MenuItem>
                    <MenuItem value="PLANNING">Planning</MenuItem>
                    <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                    <MenuItem value="COMPLETED">Completed</MenuItem>
                    <MenuItem value="ON_HOLD">On Hold</MenuItem>
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Task Priority</InputLabel>

                <Select
                    value={priorityFilter}
                    label="Task Priority"
                    onChange={(event) => setPriorityFilter(event.target.value)}
                >
                    <MenuItem value="ALL">All Priorities</MenuItem>
                    <MenuItem value="LOW">Low</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="HIGH">High</MenuItem>
                    <MenuItem value="CRITICAL">Critical</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default DashboardFilters;