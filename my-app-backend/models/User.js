const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6
    },
  });
  
  userSchema.index({ username: 1 }, { unique: true, sparse: true, background: true });

  const User = mongoose.model('User', userSchema);
  
  // Add this function to drop the index
  async function dropUsernameIndex() {
    try {
      await User.collection.dropIndex('username_1');
      // console.log('Username index dropped successfully');
    } catch (error) {
      if (error.code === 27) {
        console.log('Username index does not exist, no need to drop');
      } else {
        console.error('Error dropping username index:', error);
      }
    }
  }
  
  module.exports = { User, dropUsernameIndex };