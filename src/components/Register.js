import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!/\S+@\S+\.\S+/.test(email) || password.length < 6) {
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/register`, { email, password });
      toast.success('User registered successfully');
      setTimeout(() => navigate('/login'), 1500); // Redirect to login after 1.5 seconds
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Use theme breakpoints
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleRegister}
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
          Register
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
          error={submitted && (password === '' || password.length < 6)}
          helperText={submitted && (password === '' ? 'Password is required' : password.length < 6 && 'Password should be at least 6 characters')}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, backgroundColor: 'black' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login" style={{ color: 'royalblue' }}>Login</Link>
        </Typography>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Register;
