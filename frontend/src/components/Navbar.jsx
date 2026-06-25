import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

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

                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;