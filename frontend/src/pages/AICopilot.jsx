import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    Alert,
    TextField,
    Button,
    CircularProgress,
    Chip,
    Divider
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import Navbar from "../components/Navbar";
import api from "../services/api";

function AICopilot() {
    const [insight, setInsight] = useState(null);
    const [error, setError] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAIInsights();
    }, []);

    const fetchAIInsights = async () => {
        try {
            const response = await api.get("/api/ai/insights");
            setInsight(response.data);
        } catch (error) {
            console.error("Failed to fetch AI insights", error);
            setError("Failed to load AI insights.");
        }
    };

    const askAI = async () => {
        if (!question.trim()) return;

        try {
            setLoading(true);
            setAnswer("");

            const response = await api.post("/api/ai/chat", {
                question: question
            });

            setAnswer(response.data.answer);
        } catch (error) {
            console.error("Failed to ask AI", error);
            setAnswer("Failed to get AI response. Please check backend logs or OpenAI API key.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <Box sx={{ padding: 4, backgroundColor: "#f8fafc", minHeight: "100vh" }}>
                <Box sx={{ marginBottom: 4 }}>
                    <Typography variant="h4" fontWeight="bold">
                        AI Copilot
                    </Typography>

                    <Typography color="text.secondary" sx={{ marginTop: 1 }}>
                        Ask questions, review project health, and get AI-powered delivery recommendations.
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ marginBottom: 3 }}>
                        {error}
                    </Alert>
                )}

                {insight ? (
                    <>
                        <Card elevation={3} sx={{ marginBottom: 4, borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
                                    <SmartToyIcon color="primary" />
                                    <Typography variant="h5" fontWeight="bold">
                                        Executive Summary
                                    </Typography>
                                    <Chip label="AI Generated" color="primary" size="small" />
                                </Box>

                                <Typography variant="body1" color="text.secondary">
                                    {insight.executiveSummary}
                                </Typography>
                            </CardContent>
                        </Card>

                        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
                            <AICard
                                icon={<PsychologyIcon fontSize="large" color="primary" />}
                                title="Project Health"
                                value={`${insight.healthScore}%`}
                                description="Calculated from completion, blocked work, and priority workload."
                            />

                            <AICard
                                icon={<CheckCircleIcon fontSize="large" color="success" />}
                                title="Sprint Summary"
                                value="Live Summary"
                                description={insight.sprintSummary}
                            />

                            <AICard
                                icon={<WarningIcon fontSize="large" color="warning" />}
                                title="Risk Level"
                                value={insight.riskLevel}
                                description="Risk level generated from task and project delivery signals."
                            />

                            <AICard
                                icon={<LightbulbIcon fontSize="large" color="secondary" />}
                                title="AI Engine"
                                value="Active"
                                description="Insights generated from backend project and task data."
                            />
                        </Grid>

                        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
                            <Grid item xs={12} md={6}>
                                <Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
                                    <CardContent>
                                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                                            Detected Risks
                                        </Typography>

                                        <Divider sx={{ marginBottom: 2 }} />

                                        <List>
                                            {insight.risks.map((risk, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText primary={`• ${risk}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
                                    <CardContent>
                                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                                            AI Recommendations
                                        </Typography>

                                        <Divider sx={{ marginBottom: 2 }} />

                                        <List>
                                            {insight.recommendations.map((recommendation, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText primary={`• ${recommendation}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Card elevation={4} sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
                                    <SmartToyIcon color="primary" />
                                    <Typography variant="h5" fontWeight="bold">
                                        Ask AI Copilot
                                    </Typography>
                                </Box>

                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    label="Ask about your projects, tasks, risks, sprint, or delivery blockers"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    sx={{ marginBottom: 2 }}
                                />

                                <Button
                                    variant="contained"
                                    onClick={askAI}
                                    disabled={loading || !question.trim()}
                                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                                >
                                    {loading ? "Thinking..." : "Ask AI"}
                                </Button>

                                {answer && (
                                    <Box
                                        sx={{
                                            marginTop: 3,
                                            padding: 3,
                                            borderRadius: 2,
                                            backgroundColor: "#f1f5f9",
                                            border: "1px solid #e2e8f0"
                                        }}
                                    >
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            AI Response
                                        </Typography>

                                        {answer.split("\n").map((line, index) => (
                                            <Typography key={index} sx={{ marginBottom: 1 }}>
                                                {line}
                                            </Typography>
                                        ))}
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <CircularProgress size={24} />
                        <Typography>Loading AI insights...</Typography>
                    </Box>
                )}
            </Box>
        </div>
    );
}

function AICard({ icon, title, value, description }) {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent>
                    <Box sx={{ marginBottom: 2 }}>
                        {icon}
                    </Box>

                    <Typography variant="h6" color="text.secondary">
                        {title}
                    </Typography>

                    <Typography variant="h5" fontWeight="bold" sx={{ marginTop: 1, marginBottom: 1 }}>
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