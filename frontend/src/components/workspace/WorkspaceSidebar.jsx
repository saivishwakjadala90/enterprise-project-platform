import {
    Paper,
    Typography,
    Button,
    Stack,
    Divider
} from "@mui/material";

import AddTaskIcon from "@mui/icons-material/AddTask";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export default function WorkspaceSidebar() {

    return (

        <Paper
            elevation={3}
            sx={{
                p:3,
                borderRadius:3,
                position:"sticky",
                top:20
            }}
        >

            <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
            >
                Quick Actions
            </Typography>

            <Stack spacing={2}>

                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddTaskIcon />}
                >
                    Create Task
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                >
                    Upload File
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                >
                    Invite Member
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<SmartToyIcon />}
                >
                    Ask AI
                </Button>

            </Stack>

            <Divider sx={{my:3}}/>

            <Typography
                variant="h6"
                fontWeight="bold"
            >
                Project Status
            </Typography>

            <Typography mt={2}>
                🟢 Healthy
            </Typography>

            <Typography>
                Sprint 1
            </Typography>

            <Typography>
                75% Complete
            </Typography>

        </Paper>

    );

}