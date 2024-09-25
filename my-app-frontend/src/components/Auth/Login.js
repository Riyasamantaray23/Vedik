import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // New state variable
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Reset isNewUser state
    setIsNewUser(false);
    setIsLoading(true);
    console.log('Login attempt with:', { email });
    
    try {
      console.log('Calling loginUser function');
      const response = await loginUser({ email, password });
      console.log('Login response received:', response);
      
      if (response && response.token) {
        console.log('Login successful, storing token');
        localStorage.setItem('token', response.token);
        localStorage.setItem('isAuthenticated', 'true');
        
        console.log('Navigating to landing page');
        navigate('/');
      } else {
        console.error('Login response does not contain a token:', response);
        setError('Invalid response from server. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      // New error handling logic
      if (error.response) {
        if (error.response.status === 404) {
          setIsNewUser(true);
          setError("Account not found. Please sign up.");
        } else if (error.response.status === 400) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'grey',
        height: '100%',
        padding: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', maxWidth: 400, width: '100%' }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#4a148c' }}>
            Login to VedikVerse
          </Typography>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              color='black'
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color='black'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" align="center" sx={{ color: '#4a148c' }}>
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Login;