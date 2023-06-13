import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { api } from '../config/httpClient';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform any necessary validation on the input fields here

        // Create the post data object
        const postData = {
            title,
            content,
        };

        try {
            await api.post('/posts', postData);
            // Clear the form fields
            setTitle('');
            setContent('');
            history.push('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h4">Create Post</Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Title"
                                    fullWidth
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Content"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" type="submit" fullWidth>
                                    Create Post
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default CreatePostPage;
