import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        fetchDashboardSummary();
    }, []);

    const fetchDashboardSummary = async () => {
        try {
            const response = await api.get("/api/dashboard/summary");
            setSummary(response.data);
        } catch (error) {
            console.error("Failed to fetch dashboard summary", error);
        }
    };

    return (
        <div>
            <Navbar />

            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Enterprise Dashboard
                </Typography>

                {summary ? (
                    <Grid container spacing={3}>
                        <DashboardCard title="Total Users" value={summary.totalUsers} />
                        <DashboardCard title="Total Projects" value={summary.totalProjects} />
                        <DashboardCard title="Total Tasks" value={summary.totalTasks} />
                        <DashboardCard title="Completed Tasks" value={summary.completedTasks} />
                        <DashboardCard title="Pending Tasks" value={summary.pendingTasks} />
                    </Grid>
                ) : (
                    <Typography>Loading dashboard...</Typography>
                )}
            </Box>
        </div>
    );
}

function DashboardCard({ title, value }) {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card elevation={4}>
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        {title}
                    </Typography>

                    <Typography variant="h3">
                        {value}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Dashboard;