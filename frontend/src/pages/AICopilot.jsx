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
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

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

        const userQuestion = question;

        try {
            setLoading(true);
            setQuestion("");

            const response = await api.post("/api/ai/chat", {
                question: userQuestion
            });

            const aiAnswer = response.data.answer;

            setChatHistory((prev) => [
                ...prev,
                {
                    question: userQuestion,
                    answer: aiAnswer
                }
            ]);
        } catch (error) {
            console.error("Failed to ask AI", error);

            setChatHistory((prev) => [
                ...prev,
                {
                    question: userQuestion,
                    answer: "Failed to get AI response. Please check backend logs or OpenAI API key."
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const askSuggestedQuestion = (suggestedQuestion) => {
        setQuestion(suggestedQuestion);
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

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginBottom: 2 }}>
                                    <Chip
                                        label="Summarize my sprint"
                                        onClick={() => askSuggestedQuestion("Summarize my sprint")}
                                        clickable
                                    />
                                    <Chip
                                        label="Which projects are at risk?"
                                        onClick={() => askSuggestedQuestion("Which projects are at risk?")}
                                        clickable
                                    />
                                    <Chip
                                        label="What should I focus on today?"
                                        onClick={() => askSuggestedQuestion("What should I focus on today?")}
                                        clickable
                                    />
                                    <Chip
                                        label="Give me an executive summary"
                                        onClick={() => askSuggestedQuestion("Give me an executive summary")}
                                        clickable
                                    />
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

                                {chatHistory.length > 0 && (
                                    <Box sx={{ marginTop: 3 }}>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            Chat History
                                        </Typography>

                                        {chatHistory.map((chat, index) => (
                                            <Box key={index} sx={{ marginBottom: 3 }}>
                                                <Box
                                                    sx={{
                                                        backgroundColor: "#e3f2fd",
                                                        padding: 2,
                                                        borderRadius: 2,
                                                        marginBottom: 1,
                                                        marginLeft: { xs: 0, md: "20%" }
                                                    }}
                                                >
                                                    <Typography fontWeight="bold">
                                                        👤 You
                                                    </Typography>

                                                    <Typography>
                                                        {chat.question}
                                                    </Typography>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        backgroundColor: "#f5f5f5",
                                                        padding: 2,
                                                        borderRadius: 2,
                                                        marginRight: { xs: 0, md: "20%" },
                                                        border: "1px solid #ddd"
                                                    }}
                                                >
                                                    <Typography fontWeight="bold">
                                                        🤖 AI Copilot
                                                    </Typography>

                                                    {chat.answer.split("\n").map((line, lineIndex) => (
                                                        <Typography key={lineIndex} sx={{ marginTop: 1 }}>
                                                            {line}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            </Box>
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
