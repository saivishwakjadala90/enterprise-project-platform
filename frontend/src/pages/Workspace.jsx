import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box,  Grid } from "@mui/material";

import { getWorkspaceOverview } from "../services/workspaceService";

import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import WorkspaceTabs from "../components/workspace/WorkspaceTabs";
import WorkspaceStats from "../components/workspace/WorkspaceStats";
import WorkspaceOverview from "../components/workspace/WorkspaceOverview";
import WorkspaceMembers from "../components/workspace/WorkspaceMembers";
import WorkspaceActivity from "../components/workspace/WorkspaceActivity";
import WorkspaceSidebar from "../components/workspace/WorkspaceSidebar";

export default function Workspace() {

    const { projectId } = useParams();

    const [workspace, setWorkspace] = useState(null);

    useEffect(() => {

        async function loadWorkspace() {

            try {

                const data = await getWorkspaceOverview(projectId);

                setWorkspace(data);

            } catch (error) {

                console.error(error);

            }

        }

        loadWorkspace();

    }, [projectId]);
    return (

        <Box sx={{ p: 4 }}>

            <WorkspaceHeader workspace={workspace} />

            <WorkspaceTabs />

            <WorkspaceStats workspace={workspace} />

            <Grid container spacing={3} sx={{ mt: 1 }}>

                <Grid item xs={12} lg={8}>

                    <WorkspaceOverview workspace={workspace} />

                    <WorkspaceMembers />

                    <WorkspaceActivity />

                </Grid>

                <Grid item xs={12} lg={4}>

                    <WorkspaceSidebar />

                </Grid>

            </Grid>

        </Box>

    );

}