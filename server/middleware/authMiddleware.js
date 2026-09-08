const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    // HACKATHON MODE: Bypass JWT check and always use the demo user
    const demoUser = await User.findOne({ email: 'demo1@example.com' }).select('-password');
    if (!demoUser) {
      return res.status(401).json({ message: 'Demo user not found. Please run seeder.' });
    }
    req.user = demoUser;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Auth middleware error' });
  }
};