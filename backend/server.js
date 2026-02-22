const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const balanceRoutes = require('./routes/balance');
const chatbotRoutes = require('./routes/chatbot');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', balanceRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'KodBank API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
