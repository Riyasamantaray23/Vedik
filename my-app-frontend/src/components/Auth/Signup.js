import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signupUser } from '../../services/api'; // Import the signup function

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const isEmailValid = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const isPasswordStrong = (password) => {
  //   // Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   return passwordRegex.test(password);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    

    // if (!isEmailValid(email)) {
    //   setError('Please enter a valid email address');
    //   return;
    // }

    // if (!isPasswordStrong(password)) {
    //   setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    //   return;
    // }


    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await signupUser({ email, password });
      console.log('Signup successful', response);

      // Assuming the API returns a token on successful signup
      localStorage.setItem('token', response.token);
      localStorage.setItem('isAuthenticated', 'true');

      navigate('/');
    } catch (error) {
      console.error('Error during signup:', error);
      setError(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
            Sign up for VedikVerse
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              color='black'
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              color='black'
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              color='black'
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" align="center" sx={{ color: '#4a148c' }}>
                Already have an account? Sign In
              </Typography>
            </Link>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Signup;