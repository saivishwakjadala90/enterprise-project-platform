import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography
} from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WarningIcon from "@mui/icons-material/Warning";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import RecentActivity from "../components/dashboard/RecentActivity";

import Navbar from "../components/Navbar";
import KPICard from "../components/dashboard/KPICard";
import ProjectStatusChart from "../components/charts/ProjectStatusChart";
import TaskPriorityChart from "../components/charts/TaskPriorityChart";
import ExecutiveMetricsCards from "../components/charts/ExecutiveMetricsCards";
import TeamWorkload from "../components/dashboard/TeamWorkload";
import ProjectProgress from "../components/dashboard/ProjectProgress";


import api from "../services/api";

function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [projectsByStatus, setProjectsByStatus] = useState([]);
    const [tasksByPriority, setTasksByPriority] = useState([]);
    const [executiveMetrics, setExecutiveMetrics] = useState(null);
    const [aiInsight, setAiInsight] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const [recentActivities, setRecentActivities] = useState([]);


    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            const [
                summaryResponse,
                projectsResponse,
                tasksResponse,
                metricsResponse,
                aiResponse,
                activityResponse
            ] = await Promise.all([
                api.get("/api/dashboard/summary"),
                api.get("/api/dashboard/projects-by-status"),
                api.get("/api/dashboard/tasks-by-priority"),
                api.get("/api/dashboard/executive-metrics"),
                api.get("/api/ai/insights"),
                api.get("/api/activity-logs/recent")
            ]);

            setSummary(summaryResponse.data);
            setProjectsByStatus(projectsResponse.data);
            setTasksByPriority(tasksResponse.data);
            setExecutiveMetrics(metricsResponse.data);
            setAiInsight(aiResponse.data);
            setRecentActivities(activityResponse.data);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
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

    const filteredProjectsByStatus = projectsByStatus.filter((item) => {
        const status = item.status || item.name || "";
        const matchesStatus =
            statusFilter === "ALL" || status === statusFilter;

        const matchesSearch = status
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    const filteredTasksByPriority = tasksByPriority.filter((item) => {
        const priority = item.priority || item.name || "";
        const matchesPriority =
            priorityFilter === "ALL" || priority === priorityFilter;

        const matchesSearch = priority
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesPriority && matchesSearch;
    });

    return (
        <div>
            <Navbar />

            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Enterprise Dashboard
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ marginBottom: 3 }}
                >
                    Monitor projects, tasks, delivery health and AI-driven insights.
                </Typography>

                {aiInsight && (
                    <Card
                        elevation={4}
                        sx={{
                            marginBottom: 4,
                            backgroundColor: "#f5f7ff",
                            borderRadius: 3,
                            borderLeft: "6px solid #1976d2"
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                            >
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
                    <DashboardFilters
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        priorityFilter={priorityFilter}
                        setPriorityFilter={setPriorityFilter}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </Button>

                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: 300
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : summary ? (
                    <>
                        <Grid
                            container
                            spacing={3}
                            sx={{ marginBottom: 4 }}
                        >
                            <Grid item xs={12} sm={6} md={3}>
                                <KPICard
                                    icon={<GroupIcon color="primary" />}
                                    title="Users"
                                    value={summary.totalUsers ?? 0}
                                    color="#1976d2"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <KPICard
                                    icon={<FolderIcon color="warning" />}
                                    title="Projects"
                                    value={summary.totalProjects ?? 0}
                                    color="#ff9800"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <KPICard
                                    icon={<AssignmentIcon color="secondary" />}
                                    title="Tasks"
                                    value={summary.totalTasks ?? 0}
                                    color="#9c27b0"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <KPICard
                                    icon={<CheckCircleIcon color="success" />}
                                    title="Completed"
                                    value={summary.completedTasks ?? 0}
                                    color="#2e7d32"
                                />
                            </Grid>

                            {aiInsight && (
                                <>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <KPICard
                                            icon={<FavoriteIcon color="error" />}
                                            title="Delivery Health"
                                            value={`${aiInsight.healthScore ?? 0}%`}
                                            color="#43a047"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <KPICard
                                            icon={<WarningIcon color="warning" />}
                                            title="Risk Level"
                                            value={aiInsight.riskLevel ?? "UNKNOWN"}
                                            color="#fb8c00"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <KPICard
                                            icon={<SmartToyIcon color="primary" />}
                                            title="AI Engine"
                                            value="ACTIVE"
                                            color="#1976d2"
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>

                        {executiveMetrics && (
                            <Box sx={{ marginBottom: 4 }}>
                                <ExecutiveMetricsCards
                                    metrics={executiveMetrics}
                                />
                            </Box>
                        )}

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card
                                    elevation={4}
                                    sx={{
                                        borderRadius: 3,
                                        height: "100%"
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            Projects by Status
                                        </Typography>

                                        <ProjectStatusChart
                                            data={filteredProjectsByStatus}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Card
                                    elevation={4}
                                    sx={{
                                        borderRadius: 3,
                                        height: "100%"
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            Tasks by Priority
                                        </Typography>

                                        <TaskPriorityChart
                                            data={filteredTasksByPriority}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} sx={{ marginTop: 1 }}>
                            <Grid item xs={12} md={6}>
                                <RecentActivity
                                    activities={recentActivities}
                                    loading={loading}
                                 />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TeamWorkload />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} sx={{ marginTop: 1 }}>
                            <Grid item xs={12}>
                                <ProjectProgress />
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <Typography color="error">
                        Dashboard data could not be loaded.
                    </Typography>
                )}
            </Box>
        </div>
    );
}

export default Dashboard;