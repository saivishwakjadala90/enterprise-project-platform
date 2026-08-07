import { Tabs, Tab, Paper } from "@mui/material";

export default function WorkspaceTabs({ value, onChange }) {

    return (

        <Paper
            sx={{
                mb: 3,
                borderRadius: 3
            }}
        >

            <Tabs
                value={value}
                onChange={(e, newValue) => onChange(newValue)}
                variant="scrollable"
                scrollButtons="auto"
            >

                <Tab label="Overview" />
                <Tab label="Board" />
                <Tab label="Tasks" />
                <Tab label="Team" />
                <Tab label="Files" />
                <Tab label="AI" />
                <Tab label="Reports" />
                <Tab label="Settings" />

            </Tabs>

        </Paper>

    );

}