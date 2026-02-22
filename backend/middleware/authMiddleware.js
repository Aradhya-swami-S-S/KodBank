const jwt = require('jsonwebtoken');
const db = require('../db');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check token in database
    const [rows] = await db.query(
      'SELECT * FROM UserToken WHERE token = ? AND uid = ?',
      [token, decoded.uid]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const tokenData = rows[0];

    // Check expiry
    if (new Date() > new Date(tokenData.expiry)) {
      await db.query('DELETE FROM UserToken WHERE tid = ?', [tokenData.tid]);
      return res.status(401).json({ message: 'Token expired' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authMiddleware;
