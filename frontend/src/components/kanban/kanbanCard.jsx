import {
    Card,
    CardContent,
    Typography,
    Chip,
    Avatar,
    Box
} from "@mui/material";

export default function KanbanCard({ task }) {

    if (!task) return null;

    return (

        <Card
            sx={{
                mb: 2,
                borderRadius: 2,
                cursor: "pointer"
            }}
        >

            <CardContent>

                <Typography
                    fontWeight="bold"
                    mb={1}
                >
                    {task.taskName}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={2}
                >
                    {task.description}
                </Typography>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Chip
                        label={task.priority}
                        color={
                            task.priority === "HIGH"
                                ? "error"
                                : task.priority === "MEDIUM"
                                    ? "warning"
                                    : "success"
                        }
                        size="small"
                    />

                    <Avatar
                        sx={{
                            width: 32,
                            height: 32
                        }}
                    >
                        {task.assignedTo
                            ? task.assignedTo.charAt(0).toUpperCase()
                            : "?"}
                    </Avatar>

                </Box>

            </CardContent>

        </Card>

    );

}