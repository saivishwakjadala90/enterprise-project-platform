import { useEffect, useState } from "react";
import {
    getComments,
    addComment,
    deleteComment
} from "../../services/commentService";

import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function CommentPanel({ taskId }) {

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const loadComments = async () => {
        try {
            const res = await getComments(taskId);
            setComments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (taskId) {
            loadComments();
        }
    }, [taskId]);

    const handlePost = async () => {

        if (!commentText.trim()) return;

        await addComment({
            taskId,
            userEmail: "admin@gmail.com",
            commentText
        });

        setCommentText("");

        loadComments();
    };

    return (
        <Card sx={{ mt: 3 }}>
            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    💬 Comments
                </Typography>

                <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) =>
                        setCommentText(e.target.value)
                    }
                />

                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={handlePost}
                >
                    Post Comment
                </Button>

                <Divider sx={{ my: 2 }} />

                <List>

                    {comments.length === 0 && (
                        <Typography color="text.secondary">
                            No comments yet.
                        </Typography>
                    )}

                    {comments.map((comment) => (

                        <ListItem
                            key={comment.id}
                            secondaryAction={
                                <IconButton
                                    onClick={async () => {
                                        await deleteComment(comment.id);
                                        loadComments();
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >

                            <ListItemText
                                primary={comment.commentText}
                                secondary={
                                    comment.userEmail +
                                    " • " +
                                    new Date(comment.createdAt).toLocaleString()
                                }
                            />

                        </ListItem>

                    ))}

                </List>

            </CardContent>
        </Card>
    );
}

export default CommentPanel;