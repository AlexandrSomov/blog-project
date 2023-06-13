import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Typography, Box, CircularProgress, Grid, Paper, TextField, Button} from '@mui/material';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchPostAndComments = async () => {
        try {
            const postResponse = await axios.get(`http://localhost:3001/posts/${id}`);
            setPost(postResponse.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching post and comments:', error);
        }
    };

    useEffect(() => {
        fetchPostAndComments();
    }, [id]);

    const handleAddComment = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/posts/${id}/comments`, { content: newComment });
            const newCommentData = response.data;
            setNewComment('');
            await fetchPostAndComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleNewCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h4" sx={{ mb: 2 }}>
                                {post.title}
                            </Typography>
                            <Typography>{post.content}</Typography>
                        </Paper>

                        {post.comments.length > 0 ? (
                            post.comments.map((comment) => (
                                <Paper key={comment.id} elevation={3} sx={{ p: 2, mb: 2 }}>
                                    <Typography variant="subtitle1">{comment.content}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Author: {comment.author.name}
                                    </Typography>
                                </Paper>
                            ))
                        ) : (
                            <Typography variant="subtitle1">No comments yet.</Typography>
                        )}
                    </>
                )}

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Add a Comment
                    </Typography>
                    <TextField
                        label="Comment"
                        multiline
                        rows={4}
                        fullWidth
                        value={newComment}
                        onChange={handleNewCommentChange}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleAddComment}>
                        Add Comment
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PostPage;