import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import api from "../services/api";

import ProjectStatusChart from "../components/charts/ProjectStatusChart";
import TaskPriorityChart from "../components/charts/TaskPriorityChart";
import ExecutiveMetricsCards from "../components/charts/ExecutiveMetricsCards";

function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [projectsByStatus, setProjectsByStatus] = useState([]);
    const [tasksByPriority, setTasksByPriority] = useState([]);
    const [executiveMetrics, setExecutiveMetrics] = useState(null);
    const [aiInsight, setAiInsight] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const summaryResponse = await api.get("/api/dashboard/summary");
            const projectsResponse = await api.get("/api/dashboard/projects-by-status");
            const tasksResponse = await api.get("/api/dashboard/tasks-by-priority");
            const metricsResponse = await api.get("/api/dashboard/executive-metrics");
            const aiResponse = await api.get("/api/ai/insights");

            setSummary(summaryResponse.data);
            setProjectsByStatus(projectsResponse.data);
            setTasksByPriority(tasksResponse.data);
            setExecutiveMetrics(metricsResponse.data);
            setAiInsight(aiResponse.data);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        }
    };

    const generateDemoData = async () => {
        try {
            await api.post("/api/demo/generate");
            await fetchDashboardData();
            alert("Demo data generated successfully");
        } catch (error) {
            console.error("Failed to generate demo data", error);
            alert("Failed to generate demo data");
        }
    };

    return (
        <div>
            <Navbar />

            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Enterprise Dashboard
                </Typography>

                {aiInsight && (
                    <Card
                        elevation={4}
                        sx={{
                            marginBottom: 4,
                            backgroundColor: "#f5f7ff",
                            borderRadius: 3
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                🤖 AI Executive Summary
                            </Typography>

                            <Typography color="text.secondary">
                                {aiInsight.executiveSummary}
                            </Typography>
                        </CardContent>
                    </Card>
                )}

                <Button
                    variant="contained"
                    onClick={generateDemoData}
                    sx={{ marginBottom: 3 }}
                >
                    Generate Demo Data
                </Button>

                {summary ? (
                    <Grid container spacing={3} sx={{ marginBottom: 4 }}>
                        <DashboardCard title="Total Users" value={summary.totalUsers} />
                        <DashboardCard title="Total Projects" value={summary.totalProjects} />
                        <DashboardCard title="Total Tasks" value={summary.totalTasks} />
                        <DashboardCard title="Completed Tasks" value={summary.completedTasks} />
                    </Grid>
                ) : (
                    <Typography>Loading dashboard...</Typography>
                )}

                {executiveMetrics && (
                    <Box sx={{ marginBottom: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Executive Metrics
                        </Typography>
                        <ExecutiveMetricsCards metrics={executiveMetrics} />
                    </Box>
                )}

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Projects By Status
                                </Typography>
                                <ProjectStatusChart data={projectsByStatus} />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Tasks By Priority
                                </Typography>
                                <TaskPriorityChart data={tasksByPriority} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
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