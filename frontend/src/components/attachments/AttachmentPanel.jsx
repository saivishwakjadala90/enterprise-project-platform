import { useEffect, useState } from "react";
import {
    uploadAttachment,
    getAttachments,
    deleteAttachment,
    downloadAttachment
} from "../../services/attachmentService";

import {
    Card,
    CardContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

function AttachmentPanel({ taskId }) {

    const [attachments, setAttachments] = useState([]);
    const [file, setFile] = useState(null);

    const loadAttachments = async () => {
        try {
            const response = await getAttachments(taskId);
            setAttachments(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (taskId) {
            loadAttachments();
        }
    }, [taskId]);

    const handleUpload = async () => {

        if (!file) return;

        try {

            await uploadAttachment(
                taskId,
                file,
                "admin@gmail.com"
            );

            setFile(null);

            loadAttachments();

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card sx={{ mt: 3 }}>
            <CardContent>

                <Typography variant="h6" gutterBottom>
                    📎 Attachments
                </Typography>

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={handleUpload}
                >
                    Upload
                </Button>

                <Divider sx={{ my: 2 }} />

                <List>

                    {attachments.length === 0 && (
                        <Typography color="text.secondary">
                            No attachments uploaded.
                        </Typography>
                    )}

                    {attachments.map((attachment) => (

                        <ListItem
                            key={attachment.id}
                            secondaryAction={
                                <>
                                    <IconButton
                                        onClick={() =>
                                            downloadAttachment(attachment.id)
                                        }
                                    >
                                        <DownloadIcon />
                                    </IconButton>

                                    <IconButton
                                        onClick={async () => {
                                            await deleteAttachment(attachment.id);
                                            loadAttachments();
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            }
                        >

                            <ListItemText
                                primary={attachment.fileName}
                                secondary={
                                    attachment.uploadedBy +
                                    " • " +
                                    new Date(attachment.uploadedAt)
                                        .toLocaleString()
                                }
                            />

                        </ListItem>

                    ))}

                </List>

            </CardContent>
        </Card>
    );
}

export default AttachmentPanel;