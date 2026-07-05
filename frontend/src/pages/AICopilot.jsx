import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

import Navbar from "../components/Navbar";
import api from "../services/api";

function AICopilot() {
    const [summary, setSummary] = useState(null);
    const [executiveMetrics, setExecutiveMetrics] = useState(null);
    const [deliveryAnalytics, setDeliveryAnalytics] = useState(null);

    useEffect(() => {
        fetchAIData();
    }, []);

    const fetchAIData = async () => {
        try {
            const summaryResponse = await api.get("/api/dashboard/summary");
            const metricsResponse = await api.get("/api/dashboard/executive-metrics");
            const deliveryResponse = await api.get("/api/dashboard/delivery-analytics");

            setSummary(summaryResponse.data);
            setExecutiveMetrics(metricsResponse.data);
            setDeliveryAnalytics(deliveryResponse.data);
        } catch (error) {
            console.error("Failed to fetch AI Copilot data", error);
        }
    };

    const getHealthScore = () => {
        if (!deliveryAnalytics) return 0;

        let score = deliveryAnalytics.completionRate;

        if (executiveMetrics?.highPriorityTasks > 5) {
            score -= 10;
        }

        if (executiveMetrics?.activeProjects > executiveMetrics?.completedProjects + 5) {
            score -= 10;
        }

        return Math.max(0, Math.round(score));
    };

    const getRiskLevel = () => {
        const score = getHealthScore();

        if (score >= 80) return "Low Risk";
        if (score >= 50) return "Medium Risk";
        return "High Risk";
    };

    const getRecommendations = () => {
        const recommendations = [];

        if (executiveMetrics?.highPriorityTasks > 0) {
            recommendations.push("Review high priority tasks first.");
        }

        if (summary?.pendingTasks > summary?.completedTasks) {
            recommendations.push("Reduce pending task backlog before starting new work.");
        }

        if (executiveMetrics?.unreadNotifications > 0) {
            recommendations.push("Check unread notifications for pending updates.");
        }

        if (recommendations.length === 0) {
            recommendations.push("Project delivery is healthy. Continue current execution plan.");
        }

        return recommendations;
    };

    return (
        <div>
            <Navbar />

            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    AI Copilot
                </Typography>

                <Typography color="text.secondary" sx={{ marginBottom: 4 }}>
                    AI-powered delivery insights generated from your real project data.
                </Typography>

                {summary && executiveMetrics && deliveryAnalytics ? (
                    <>
                        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
                            <AICard
                                icon={<PsychologyIcon fontSize="large" />}
                                title="Project Health"
                                value={`${getHealthScore()}%`}
                                description="Calculated from completion rate, active projects, and priority workload."
                            />

                            <AICard
                                icon={<CheckCircleIcon fontSize="large" />}
                                title="Sprint Summary"
                                value={`${summary.completedTasks} Completed`}
                                description={`${summary.pendingTasks} tasks are still pending.`}
                            />

                            <AICard
                                icon={<WarningIcon fontSize="large" />}
                                title="Risk Detection"
                                value={getRiskLevel()}
                                description={`${executiveMetrics.highPriorityTasks} high priority tasks found.`}
                            />

                            <AICard
                                icon={<LightbulbIcon fontSize="large" />}
                                title="Delivery Rate"
                                value={`${deliveryAnalytics.completionRate.toFixed(1)}%`}
                                description="Task completion rate across current delivery cycle."
                            />
                        </Grid>

                        <Card elevation={4}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    AI Recommendations
                                </Typography>

                                <List>
                                    {getRecommendations().map((recommendation, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={recommendation} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <Typography>Loading AI insights...</Typography>
                )}
            </Box>
        </div>
    );
}

function AICard({ icon, title, value, description }) {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card elevation={4}>
                <CardContent>
                    <Box sx={{ marginBottom: 2 }}>
                        {icon}
                    </Box>

                    <Typography variant="h6" color="text.secondary">
                        {title}
                    </Typography>

                    <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 1 }}>
                        {value}
                    </Typography>

                    <Typography color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default AICopilot;