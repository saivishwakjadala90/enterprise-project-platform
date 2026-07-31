import { Card, CardContent, Typography, Box } from "@mui/material";

function KPICard({ icon, title, value, color }) {
    return (
        <Card
            elevation={4}
            sx={{
                borderRadius: 3,
                borderLeft: `6px solid ${color}`,
                height: "100%"
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Box>
                        <Typography color="text.secondary">
                            {title}
                        </Typography>

                        <Typography variant="h4" fontWeight="bold">
                            {value}
                        </Typography>
                    </Box>

                    <Box sx={{ fontSize: 40 }}>
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default KPICard;