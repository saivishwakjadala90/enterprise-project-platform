import { useEffect, useState } from "react";
import PsychologyIcon from "@mui/icons-material/Psychology";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Badge
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchUnreadCount();
    }, []);

    const fetchUnreadCount = async () => {
        try {
            const email = localStorage.getItem("email");
            const response = await api.get(`/api/notifications/user/${email}`);

            const unread = response.data.filter(
                notification => notification.status === "UNREAD"
            ).length;

            setUnreadCount(unread);
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Enterprise AI Delivery OS
                </Typography>

                <Box>
                    <Button color="inherit" component={Link} to="/dashboard">
                        Dashboard
                    </Button>

                    <Button color="inherit" component={Link} to="/projects">
                        Projects
                    </Button>

                    <Button color="inherit" component={Link} to="/tasks">
                        Tasks
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/ai-copilot"
                        startIcon={<PsychologyIcon />}
                    >
                        AI Copilot
                    </Button>

                    <IconButton color="inherit" component={Link} to="/notifications">
                        <Badge badgeContent={unreadCount} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;