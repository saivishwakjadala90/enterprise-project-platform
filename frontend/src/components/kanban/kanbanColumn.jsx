import {
    Paper,
    Typography
} from "@mui/material";

import KanbanCard from "./KanbanCard";

export default function KanbanColumn({

                                         title,
                                         tasks

                                     }) {

    return (

        <Paper
            elevation={3}
            sx={{
                p: 2,
                minHeight: 650,
                borderRadius: 3
            }}
        >

            <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
            >
                {title}
            </Typography>

            {tasks.length === 0 ? (

                <Typography color="text.secondary">
                    No tasks
                </Typography>

            ) : (

                tasks.map((task) => (

                    <KanbanCard
                        key={task.id}
                        task={task}
                    />

                ))

            )}

        </Paper>

    );

}