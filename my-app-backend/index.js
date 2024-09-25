// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const { User, dropUsernameIndex } = require('./models/User');
// const imageUploadRoutes = require('./routes/imageUploadRoutes');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend URL
//   credentials: true,
// }));
// app.use(express.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(async () => {
//   console.log('Connected to MongoDB');
//   await dropUsernameIndex();
// })
// .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);
// app.use('/api/upload', imageUploadRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
  
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { User, dropUsernameIndex } = require('./models/User');
const imageUploadRoutes = require('./routes/imageUploadRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
  methods: ['GET', 'POST'],  // Ensure POST requests are allowed
  allowedHeaders: ['Content-Type'],  // Allow headers for file uploads
}));
app.use(express.json());

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  await dropUsernameIndex();
})
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api/upload', imageUploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
