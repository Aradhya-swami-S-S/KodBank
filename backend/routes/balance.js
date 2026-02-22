const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get balance (protected route)
router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT balance FROM KodUser WHERE uid = ?',
      [req.user.uid]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ balance: users[0].balance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch balance', error: error.message });
  }
});

// Get user info (protected route)
router.get('/user-info', authMiddleware, async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT username, email, role FROM KodUser WHERE uid = ?',
      [req.user.uid]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user info', error: error.message });
  }
});

module.exports = router;
