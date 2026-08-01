import { Tabs, Tab, Paper } from "@mui/material";
import { useState } from "react";

export default function WorkspaceTabs() {

    const [tab, setTab] = useState(0);

    return (

        <Paper
            sx={{
                mb:3,
                borderRadius:3
            }}
        >

            <Tabs
                value={tab}
                onChange={(e,newValue)=>setTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
            >

                <Tab label="Overview"/>

                <Tab label="Board"/>

                <Tab label="Tasks"/>

                <Tab label="Team"/>

                <Tab label="Files"/>

                <Tab label="AI"/>

                <Tab label="Reports"/>

                <Tab label="Settings"/>

            </Tabs>

        </Paper>

    );

}