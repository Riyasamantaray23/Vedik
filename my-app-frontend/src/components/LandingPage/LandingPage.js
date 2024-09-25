import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ImageUpload from './ImageUpload';
import TranslatedOutput from './TranslatedOutput';

const cardVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
    },
  },
};

function LandingPage() {
  const [translatedText, setTranslatedText] = useState('');
  const theme = useTheme();

  const handleImageUpload = (image) => {
    // Simulated translation
    setTimeout(() => {
      setTranslatedText('This is a simulated translation of the uploaded image text.');
    }, 2000);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      paddingTop: theme.mixins.toolbar.minHeight, // Add padding to account for the navbar height
      position: 'relative',
      zIndex: 1 // Ensure content is above the background
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Welcome to VedikVerse
        </Typography>
        <Typography variant="h5" paragraph align="center" sx={{ mb: 4, color: theme.palette.secondary.main }}>
          Uncover ancient wisdom through modern technology
        </Typography>
      </motion.div>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {['Image Translation', 'Speech Translation', 'Cultural Preservation'].map((title, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div variants={cardVariants} whileHover="hover">
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.fourth">
                    {getCardDescription(title)}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button variant="outlined" fullWidth>Learn More</Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Try It Now
        </Typography>
        <ImageUpload onUpload={handleImageUpload} />
        {translatedText && <TranslatedOutput text={translatedText} />}
      </Box>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            At VedikVerse, we're passionate about bridging the gap between ancient wisdom and modern understanding. Our cutting-edge technology allows everyone to access and appreciate the richness of ancient cultures and philosophies.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Learn More About Us
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}

function getCardDescription(title) {
  switch (title) {
    case 'Image Translation':
      return 'Upload images of ancient manuscripts and get instant translations.';
    case 'Speech Translation':
      return 'Translate Sanskrit and local dialects in real-time and read it in English.';
    case 'Cultural Preservation':
      return 'Help preserve ancient wisdom for future generations.';
    default:
      return '';
  }
}

export default LandingPage;