import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CircularProgress,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Box
} from "@mui/material";

import api from "../../services/api";

function TeamWorkload() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeamWorkload();
    }, []);

    const fetchTeamWorkload = async () => {
        try {
            const response = await api.get(
                "/api/dashboard/team-workload"
            );

            setTeam(response.data);
        } catch (error) {
            console.error(
                "Failed to fetch team workload",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card elevation={4} sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    Team Workload
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
                ) : team.length === 0 ? (
                    <Typography color="text.secondary">
                        No workload data available.
                    </Typography>
                ) : (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>Employee</b>
                                </TableCell>

                                <TableCell align="center">
                                    <b>Assigned Tasks</b>
                                </TableCell>

                                <TableCell align="center">
                                    <b>Workload</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {team.map((member) => {
                                const assigned =
                                    Number(member.activityCount) || 0;

                                const workload = Math.min(
                                    assigned * 10,
                                    100
                                );

                                return (
                                    <TableRow key={member.userEmail}>
                                        <TableCell>
                                            {member.userEmail}
                                        </TableCell>

                                        <TableCell align="center">
                                            {assigned}
                                        </TableCell>

                                        <TableCell>
                                            <LinearProgress
                                                variant="determinate"
                                                value={workload}
                                            />

                                            <Typography variant="caption">
                                                {workload}%
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}

export default TeamWorkload;