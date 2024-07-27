import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!/\S+@\S+\.\S+/.test(email) ) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
      login(response.data.token);
      toast.success('User logged in successfully');
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: isSmallScreen ? 2 : isMediumScreen ? 3 : 4,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
          width: isSmallScreen ? '100%' : isMediumScreen ? '80%' : '60%',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          error={submitted && (email === '' || !/\S+@\S+\.\S+/.test(email))}
          helperText={submitted && (email === '' ? 'Email is required' : !/\S+@\S+\.\S+/.test(email) && 'Email is not valid')}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          error={submitted && password === ''}
          helperText={submitted && password === '' ? 'Password is required' : ''}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, backgroundColor: 'black' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/register" style={{ color: 'royalblue' }}>Register</Link>
        </Typography>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Login;
