import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Stack
} from "@mui/material";

import Navbar from "../components/Navbar";
import api from "../services/api";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        const email = localStorage.getItem("email");

        const response = await api.get(`/api/notifications/user/${email}`);

        setNotifications(response.data);
    };

    const markAsRead = async (id) => {
        await api.put(`/api/notifications/${id}/read`);
        fetchNotifications();
    };

    const deleteNotification = async (id) => {
        await api.delete(`/api/notifications/${id}`);
        fetchNotifications();
    };

    return (
        <div>
            <Navbar />

            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Notifications
                </Typography>

                <Stack spacing={2}>
                    {notifications.map((notification) => (
                        <Card key={notification.id} elevation={3}>
                            <CardContent>
                                <Typography variant="h6">
                                    {notification.message}
                                </Typography>

                                <Typography color="text.secondary">
                                    Status: {notification.status}
                                </Typography>

                                <Box sx={{ marginTop: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => markAsRead(notification.id)}
                                        sx={{ marginRight: 2 }}
                                    >
                                        Mark Read
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteNotification(notification.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </div>
    );
}

export default Notifications;