const express = require('express');
const authenticateToken = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Protected route to get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

module.exports = router;