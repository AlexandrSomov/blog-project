import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostListPage = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/posts');
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h4">Posts</Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    posts.map((post) => (
                            <Link key={post.id} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                                <Paper elevation={3} sx={{ p: 4, mb: 2 }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    {post.title}
                                </Typography>
                                </Paper>
                            </Link>

                    ))
                )}
            </Grid>
        </Grid>
    );
};

export default PostListPage;