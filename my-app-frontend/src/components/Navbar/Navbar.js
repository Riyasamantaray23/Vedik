import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const TranslucentAppBar = styled(AppBar)`
  background: ${props => props.scrolled ? 'rgba(10, 14, 23, 0.8)' : 'transparent'};
  backdrop-filter: blur(10px);
  box-shadow: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
`;

const Logo = styled(Typography)`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.palette.primary.main};
  letter-spacing: 0.05em;
`;

const NavButton = styled(Button)`
  color: ${props => props.theme.palette.text.primary};
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  letter-spacing: 0.05em;
  margin-left: ${props => props.theme.spacing(2)};
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <TranslucentAppBar position="fixed" scrolled={scrolled}>
      <Toolbar>
        <Logo>VedikVerse</Logo>
        <Box sx={{ flexGrow: 1 }} />
        <NavButton component={Link} to="/">Home</NavButton>
        <NavButton component={Link} to="/about">About Us</NavButton>
        <NavButton component={Link} to="/contact">Contact</NavButton>
        <Box>
          <Avatar
            onClick={handleMenu}
            sx={{ cursor: 'pointer' }}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { handleClose(); navigate('/edit-profile'); }}>Edit Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </TranslucentAppBar>
  );
}

export default Navbar;