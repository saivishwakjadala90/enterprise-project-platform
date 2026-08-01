import {
    Paper,
    Typography,
    Box,
    Chip,
    LinearProgress
} from "@mui/material";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

export default function WorkspaceHeader({ workspace }) {

    if (!workspace) return null;

    return (

        <Paper
            elevation={3}
            sx={{
                p: 4,
                mb: 3,
                borderRadius: 3
            }}
        >

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >

                <Box display="flex" alignItems="center" gap={2}>

                    <BusinessCenterIcon
                        sx={{
                            fontSize: 45,
                            color: "#1976d2"
                        }}
                    />

                    <Box>

                        <Typography variant="h4" fontWeight="bold">
                            {workspace.projectName}
                        </Typography>

                        <Typography color="text.secondary">
                            Enterprise AI Delivery Workspace
                        </Typography>

                    </Box>

                </Box>

                <Chip
                    color={
                        workspace.risk === "LOW"
                            ? "success"
                            : workspace.risk === "MEDIUM"
                                ? "warning"
                                : "error"
                    }
                    label={workspace.risk}
                />

            </Box>

            <Box mt={4}>

                <Typography gutterBottom>

                    Progress

                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={workspace.progress}
                    sx={{
                        height: 10,
                        borderRadius: 5
                    }}
                />

                <Typography mt={1}>
                    {workspace.progress}% Complete
                </Typography>

            </Box>

        </Paper>

    );

}