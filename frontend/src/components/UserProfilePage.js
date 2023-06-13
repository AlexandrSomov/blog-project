import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Paper, TextField, Button } from '@mui/material';
import { api } from '../config/httpClient';

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        // Add more fields as needed
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get('/users/me');
                setUser(response.data);
                setUpdatedUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelClick = () => {
        setEditing(false);
        setUpdatedUser(user);
    };

    const handleInputChange = (event) => {
        setUpdatedUser({
            ...updatedUser,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            await api.put('/user', updatedUser);
            setUser(updatedUser);
            setEditing(false);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        User Profile
                    </Typography>
                    {!editing ? (
                        <Box>
                            <Typography variant="subtitle1">
                                <strong>Name:</strong> {user.name}
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Email:</strong> {user.email}
                            </Typography>
                            {/* Add more user details as needed */}
                            <Button variant="contained" onClick={handleEditClick}>
                                Edit Profile
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <TextField
                                label="Name"
                                name="name"
                                value={updatedUser.name}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={updatedUser.email}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            {/* Add more fields as needed */}
                            <Button variant="contained" onClick={handleSubmit} sx={{ mr: 2 }}>
                                Save
                            </Button>
                            <Button variant="contained" onClick={handleCancelClick}>
                                Cancel
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UserProfilePage;
