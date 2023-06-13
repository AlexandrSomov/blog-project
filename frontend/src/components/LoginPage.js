import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, TextField, Button, Grid, Paper, Box } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/users/login', {
                email,
                password,
            });

            const token = response.data.token;

            localStorage.setItem('token', token);

            history.push('/');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        console.log('Reset password for email:', email);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={1} sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h4">Login</Typography>
                    </Box>

                    <form onSubmit={handleLogin}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    fullWidth
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" type="submit" fullWidth>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                            <Button color="primary" onClick={handleResetPassword}>
                                Forgot password?
                            </Button>
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
