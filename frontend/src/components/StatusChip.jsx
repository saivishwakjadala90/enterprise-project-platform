import Chip from "@mui/material/Chip";

function StatusChip({ status }) {
    let color = "default";

    if (status === "COMPLETED") color = "success";
    else if (status === "IN_PROGRESS") color = "warning";
    else if (status === "BLOCKED") color = "error";

    return <Chip label={status} color={color} size="small" />;
}

export default StatusChip;