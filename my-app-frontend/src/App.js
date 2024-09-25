import React, { Suspense } from 'react';
import { Routes, Route, Navigate, Router } from 'react-router-dom';
import { Box, CircularProgress, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Background3D from './components/3D/Background3D';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import LandingPage from './components/LandingPage/LandingPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import EditProfile from './components/Profile/EditProfile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2', // Elegant blue
    },
    secondary: {
      main: '#50E3C2', // Mint green
    },
    background: {
      default: '#0A0E17', // Dark blue-black
      paper: 'rgba(255, 255, 255, 0.05)', // Slightly translucent white
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(0, 0, 0, 0.7)',
      fourth: 'rgba(255,255,255, 0.7)'
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '0.03em',
    },
    button: {
      fontFamily: '"Montserrat", "Roboto", "Arial", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.05em',
      borderRadius: 7
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 7,
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Suspense fallback={<CircularProgress />}>
          <Background3D />
        </Suspense>
        
        <Box sx={{ position: 'relative', zIndex: 1, height: '100%', overflowY: 'auto' }}>
          <Routes>
            <Route path="/login" element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <Login />
              </motion.div>
            } />
            <Route path="/signup" element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <Signup />
              </motion.div>
            } />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<><Navbar /><LandingPage /></>} />
              <Route path="/edit-profile" element={<><Navbar /><EditProfile /></>} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;