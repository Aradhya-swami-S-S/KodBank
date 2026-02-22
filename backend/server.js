const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const balanceRoutes = require('./routes/balance');
const chatbotRoutes = require('./routes/chatbot');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Test database connection on startup
async function testDatabaseConnection() {
  try {
    await db.query('SELECT 1');
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Check your environment variables:');
    console.error('DB_HOST:', process.env.DB_HOST ? '✓' : '✗');
    console.error('DB_PORT:', process.env.DB_PORT ? '✓' : '✗');
    console.error('DB_USER:', process.env.DB_USER ? '✓' : '✗');
    console.error('DB_PASSWORD:', process.env.DB_PASSWORD ? '✓' : '✗');
    console.error('DB_NAME:', process.env.DB_NAME ? '✓' : '✗');
  }
}

testDatabaseConnection();

// CORS configuration for production and development
const allowedOrigins = [
  'http://localhost:3000',
  'https://kod-bank-virid.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

console.log('Allowed origins:', allowedOrigins);

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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
