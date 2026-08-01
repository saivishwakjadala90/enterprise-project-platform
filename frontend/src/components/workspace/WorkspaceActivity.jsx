import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    CircularProgress
} from "@mui/material";

import { getRecentActivity } from "../../services/activityService";

export default function WorkspaceActivity() {

    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadActivity();

    }, []);

    async function loadActivity() {

        try {

            const data = await getRecentActivity();

            setActivities(data);

        } catch (e) {

            console.error(e);

        } finally {

            setLoading(false);

        }

    }

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
                mb={2}
            >
                Recent Activity
            </Typography>

            {loading && <CircularProgress />}

            {!loading && (

                <List>

                    {activities.map((activity,index)=>(

                        <div key={index}>

                            <ListItem>

                                <ListItemText

                                    primary={activity.type}

                                    secondary={activity.description}

                                />

                            </ListItem>

                            <Divider/>

                        </div>

                    ))}

                </List>

            )}

        </Paper>

    );

}