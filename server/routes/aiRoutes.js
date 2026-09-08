const express = require('express');
const router = express.Router();
const { chatWithAgent } = require('../controllers/aiController');
// Temporarily omitting protect middleware to speed up hackathon dev
// const { protect } = require('../middleware/authMiddleware');

router.post('/chat', chatWithAgent);

module.exports = router;
