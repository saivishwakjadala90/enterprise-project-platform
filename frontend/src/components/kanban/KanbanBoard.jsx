import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";

import { getKanbanBoard } from "../../services/kanbanService";
import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard() {

    const { projectId } = useParams();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadBoard();
    }, [projectId]);

    async function loadBoard() {

        try {

            const data = await getKanbanBoard(projectId);

            setTasks(data);

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <Grid container spacing={3} sx={{ mt: 2 }}>

            <Grid item xs={12} md={3}>

                <KanbanColumn
                    title="To Do"
                    tasks={tasks.filter(task => task.status === "TODO")}
                />

            </Grid>

            <Grid item xs={12} md={3}>

                <KanbanColumn
                    title="In Progress"
                    tasks={tasks.filter(task => task.status === "IN_PROGRESS")}
                />

            </Grid>

            <Grid item xs={12} md={3}>

                <KanbanColumn
                    title="Review"
                    tasks={tasks.filter(task => task.status === "REVIEW")}
                />

            </Grid>

            <Grid item xs={12} md={3}>

                <KanbanColumn
                    title="Done"
                    tasks={tasks.filter(task => task.status === "COMPLETED")}
                />

            </Grid>

        </Grid>

    );

}
}