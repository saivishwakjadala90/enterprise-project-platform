import { Card, CardContent, Grid, Typography } from "@mui/material";

function ExecutiveMetricsCards({ metrics }) {
    return (
        <Grid container spacing={3}>
            <MetricCard title="Active Projects" value={metrics.activeProjects} />
            <MetricCard title="Completed Projects" value={metrics.completedProjects} />
            <MetricCard title="High Priority Tasks" value={metrics.highPriorityTasks} />
            <MetricCard title="Unread Notifications" value={metrics.unreadNotifications} />
        </Grid>
    );
}

function MetricCard({ title, value }) {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        {title}
                    </Typography>

                    <Typography variant="h4">
                        {value}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ExecutiveMetricsCards;