import {
    Grid,
    Paper,
    Typography,
    Box
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function StatCard({ title, value, icon }) {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
                height: "100%"
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box>
                    <Typography color="text.secondary">
                        {title}
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        {value}
                    </Typography>
                </Box>

                {icon}
            </Box>
        </Paper>
    );
}

export default function WorkspaceStats({ workspace }) {

    if (!workspace) {
        return null;
    }

    return (

        <Grid container spacing={3} mt={1}>

            <Grid item xs={12} md={3}>
                <StatCard
                    title="Total Tasks"
                    value={workspace.totalTasks}
                    icon={<AssignmentIcon color="primary" fontSize="large" />}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <StatCard
                    title="Completed"
                    value={workspace.completedTasks}
                    icon={<CheckCircleIcon color="success" fontSize="large" />}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <StatCard
                    title="Pending"
                    value={workspace.pendingTasks}
                    icon={<PendingActionsIcon color="warning" fontSize="large" />}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <StatCard
                    title="Risk"
                    value={workspace.risk}
                    icon={<WarningAmberIcon color="error" fontSize="large" />}
                />
            </Grid>

        </Grid>

    );

}