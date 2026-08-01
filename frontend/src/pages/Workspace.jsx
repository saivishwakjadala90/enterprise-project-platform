import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkspaceOverview } from "../services/workspaceService";

import {
    Box,
    Grid,
    Paper,
    Typography,
    LinearProgress
} from "@mui/material";

export default function Workspace() {

    const { projectId } = useParams();

    const [workspace, setWorkspace] = useState(null);

    useEffect(() => {

        loadWorkspace();

    }, []);

    async function loadWorkspace() {

        const data = await getWorkspaceOverview(projectId);

        setWorkspace(data);

    }

    if (!workspace)
        return <Typography>Loading...</Typography>;

    return (

        <Box p={4}>

            <Typography variant="h4" gutterBottom>

                {workspace.projectName}

            </Typography>

            <Typography>

                Project Owner

            </Typography>

            <Typography>

                {workspace.manager}

            </Typography>

            <br/>

            <Typography>

                Progress

            </Typography>

            <LinearProgress
                variant="determinate"
                value={workspace.progress}
            />

            <br/>

            <Grid container spacing={3}>

                <Grid item xs={3}>
                    <Paper sx={{p:3}}>
                        <Typography>Total Tasks</Typography>
                        <Typography variant="h4">
                            {workspace.totalTasks}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper sx={{p:3}}>
                        <Typography>Completed</Typography>
                        <Typography variant="h4">
                            {workspace.completedTasks}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper sx={{p:3}}>
                        <Typography>Pending</Typography>
                        <Typography variant="h4">
                            {workspace.pendingTasks}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper sx={{p:3}}>
                        <Typography>Risk</Typography>
                        <Typography variant="h4">
                            {workspace.risk}
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

        </Box>

    );

}