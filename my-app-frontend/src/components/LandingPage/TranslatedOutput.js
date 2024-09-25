import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function TranslatedOutput({ text }) {
  return (
    <Paper elevation={3} sx={{ p: 2, my: 3 }}>
      <Typography variant="h6" gutterBottom>
        Translated Text:
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </Paper>
  );
}

export default TranslatedOutput;