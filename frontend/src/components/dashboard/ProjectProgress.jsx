import {
    Card,
    CardContent,
    LinearProgress,
    Box,
    Typography
} from "@mui/material";

function ProjectProgress() {

    const projects = [
        {
            name: "Enterprise AI Platform",
            progress: 82
        },
        {
            name: "Customer Portal",
            progress: 61
        },
        {
            name: "HR Management",
            progress: 95
        },
        {
            name: "Mobile Banking",
            progress: 43
        }
    ];

    return (
        <Card elevation={4} sx={{ borderRadius: 3 }}>
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    Project Progress
                </Typography>

                {projects.map((project) => (

                    <Box key={project.name} sx={{ mb: 3 }}>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1
                            }}
                        >
                            <Typography variant="body2">
                                {project.name}
                            </Typography>

                            <Typography variant="body2" fontWeight="bold">
                                {project.progress}%
                            </Typography>
                        </Box>

                        <LinearProgress
                            variant="determinate"
                            value={project.progress}
                            sx={{
                                height: 10,
                                borderRadius: 5
                            }}
                        />

                    </Box>

                ))}

            </CardContent>
        </Card>
    );
}

export default ProjectProgress;