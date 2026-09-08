const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const placementRoutes = require('./routes/placementRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placeguard';

// MongoDB connection (graceful fallback if local Mongo is not running)
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 2000,
})
  .then(() => console.log('PlaceGuard MongoDB Connected'))
  .catch(err => console.log('MongoDB not connected, operating in high-performance in-memory mode'));

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/placement', placementRoutes);

app.get('/', (req, res) => {
  res.send('Place Gaurd AI Backend API is running successfully.');
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Place Gaurd Server running on port ${PORT}`);
  });
}

module.exports = app;
