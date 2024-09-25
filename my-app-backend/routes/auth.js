const express = require ('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

// Login route

router.post('/login', async (req, res) => {
  console.log('Login attempt received:', req.body);
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      console.log('User not found');
      // Change here: status code changed from 400 to 404
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // ... (rest of the code remains the same)
     // Create and send token
     const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login successful, sending response');
    res.json({ token, userId: user._id });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Signup route

// // Email validation function
// const isEmailValid = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// // Password strength check function
// const isPasswordStrong = (password) => {
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return passwordRegex.test(password);
// };

router.post('/signup', async (req, res) => {
  console.log('Signup attempt:', req.body);
  try {
    const { email, password } = req.body;

    //  // Check email validity
    //  if (!isEmailValid(email)) {
    //   return res.status(400).json({ message: 'Invalid email address' });
    // }

    // // Check password strength
    // if (!isPasswordStrong(password)) {
    //   return res.status(400).json({ message: 'Password is not strong enough. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
    // }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Create and send token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error signing up', error: error.message });
  }
});

module.exports = router;