import {
    Card,
    CardContent,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box
} from "@mui/material";

function RecentActivity({ activities = [], loading = false }) {
    return (
        <Card
            elevation={4}
            sx={{
                borderRadius: 3,
                height: "100%"
            }}
        >
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Recent Activity
                </Typography>

                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: 3
                        }}
                    >
                        <CircularProgress size={30} />
                    </Box>
                ) : activities.length === 0 ? (
                    <Typography color="text.secondary">
                        No recent activity available.
                    </Typography>
                ) : (
                    <List>
                        {activities.map((activity) => (
                            <ListItem
                                key={activity.id}
                                divider
                                disableGutters
                            >
                                <ListItemText
                                    primary={activity.message}
                                    secondary={
                                        activity.createdAt
                                            ? new Date(
                                                activity.createdAt.endsWith("Z")
                                                    ? activity.createdAt
                                                    : activity.createdAt + "Z"
                                            ).toLocaleString("en-US", {
                                                timeZone: "America/Chicago",
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true
                                            })
                                            : activity.type
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    );
}

export default RecentActivity;