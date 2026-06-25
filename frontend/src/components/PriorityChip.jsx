import Chip from "@mui/material/Chip";

function PriorityChip({ priority }) {
    let color = "default";

    if (priority === "HIGH") color = "error";
    else if (priority === "MEDIUM") color = "warning";
    else if (priority === "LOW") color = "success";

    return <Chip label={priority} color={color} size="small" />;
}

export default PriorityChip;