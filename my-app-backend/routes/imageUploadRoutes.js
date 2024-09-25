

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage });

// API endpoint to handle image upload
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  try {
    // Save the image metadata or other processing
    const imageData = {
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedAt: new Date()
    };

    // Save the image data to the database if needed
    // ...

    res.status(200).json({ 
      message: 'Image uploaded successfully', 
      data: imageData, 
      imagePath: `/uploads/${req.file.filename}`  // Send the image path in the response
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

module.exports = router;
