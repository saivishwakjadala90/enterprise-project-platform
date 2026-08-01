import {
    Paper,
    Typography,
    Box,
    Grid,
    Chip,
    LinearProgress,
    Divider
} from "@mui/material";

export default function WorkspaceOverview({ workspace }) {

    if (!workspace) return null;

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                mt: 3,
                borderRadius: 3
            }}
        >

            <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
            >
                Project Overview
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={6}>

                    <Typography fontWeight="bold">
                        Description
                    </Typography>

                    <Typography color="text.secondary">
                        Enterprise AI Delivery Platform Workspace
                    </Typography>

                    <Divider sx={{my:2}} />

                    <Typography>
                        <b>Owner :</b> {workspace.manager}
                    </Typography>

                    <Typography>
                        <b>Deadline :</b> {workspace.dueDate}
                    </Typography>

                    <Typography>
                        <b>Risk :</b>
                    </Typography>

                    <Chip
                        sx={{mt:1}}
                        label={workspace.risk}
                        color={
                            workspace.risk==="LOW"
                                ?"success"
                                :workspace.risk==="MEDIUM"
                                    ?"warning"
                                    :"error"
                        }
                    />

                </Grid>

                <Grid item xs={12} md={6}>

                    <Typography fontWeight="bold">
                        Completion
                    </Typography>

                    <LinearProgress
                        sx={{
                            mt:2,
                            height:12,
                            borderRadius:5
                        }}
                        variant="determinate"
                        value={workspace.progress}
                    />

                    <Typography mt={2}>
                        {workspace.progress}% Completed
                    </Typography>

                    <Divider sx={{my:2}} />

                    <Typography>
                        <b>Total Tasks :</b> {workspace.totalTasks}
                    </Typography>

                    <Typography>
                        <b>Completed :</b> {workspace.completedTasks}
                    </Typography>

                    <Typography>
                        <b>Pending :</b> {workspace.pendingTasks}
                    </Typography>

                </Grid>

            </Grid>

        </Paper>

    );

}