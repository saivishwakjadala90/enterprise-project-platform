import {
    Avatar,
    Box,
    Grid,
    Paper,
    Typography,
    Chip
} from "@mui/material";

const members = [
    {
        name: "Admin",
        role: "Project Manager",
        email: "admin@test.com",
        tasks: 12,
        status: "ONLINE"
    },
    {
        name: "John",
        role: "Backend Developer",
        email: "john@test.com",
        tasks: 8,
        status: "ONLINE"
    },
    {
        name: "Alice",
        role: "Frontend Developer",
        email: "alice@test.com",
        tasks: 5,
        status: "OFFLINE"
    }
];

export default function WorkspaceMembers() {

    return (

        <Paper
            elevation={3}
            sx={{
                p:3,
                mt:3,
                borderRadius:3
            }}
        >

            <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
            >
                Team Members
            </Typography>

            <Grid container spacing={2}>

                {members.map((member,index)=>(

                    <Grid item xs={12} md={4} key={index}>

                        <Paper
                            variant="outlined"
                            sx={{
                                p:2,
                                borderRadius:2
                            }}
                        >

                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                            >

                                <Avatar>
                                    {member.name.charAt(0)}
                                </Avatar>

                                <Box>

                                    <Typography
                                        fontWeight="bold"
                                    >
                                        {member.name}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {member.role}
                                    </Typography>

                                </Box>

                            </Box>

                            <Typography mt={2}>
                                {member.email}
                            </Typography>

                            <Typography>
                                Assigned Tasks : {member.tasks}
                            </Typography>

                            <Chip
                                sx={{mt:2}}
                                color={
                                    member.status==="ONLINE"
                                        ?"success"
                                        :"default"
                                }
                                label={member.status}
                            />

                        </Paper>

                    </Grid>

                ))}

            </Grid>

        </Paper>

    );

}