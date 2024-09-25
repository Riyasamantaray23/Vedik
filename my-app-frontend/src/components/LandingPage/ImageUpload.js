// import React, { useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Typography, CircularProgress } from '@mui/material';
// import { motion } from 'framer-motion';
// import { CloudUpload } from '@mui/icons-material';

// const ImageUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (selectedFile) {
//       setIsUploading(true);

//       try {
//         const formData = new FormData();
//         formData.append('image', selectedFile);
//         const response = await axios.post('/api/upload', formData);
//         setImageUrl(response.data.imagePath);
//         console.log('Image uploaded successfully:', response.data);
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       } finally {
//         setIsUploading(false);
//       }
//     }
//   };

import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { motion } from 'framer-motion';  

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        const response = await axios.post('http://localhost:5000/api/upload', formData);
        setImageUrl(`http://localhost:5000${response.data.imagePath}`);
        console.log('Image uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error.response ? error.response.data : error.message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <Box sx={{ my: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUpload />}
          sx={{ mb: 2 }}
        >
          Choose Image
        </Button>
      </label>
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
            Selected file: {selectedFile.name}
          </Typography>
        </motion.div>
      )}
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        sx={{ minWidth: 120 }}
      >
        {isUploading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>
    </Box>
  );
}

export default ImageUpload;