# KodBank - Full Stack Banking Application

A modern, secure banking application with AI chatbot assistance, built with React, Node.js, Express, and MySQL.

## 🌟 Features

### Core Banking Features
- 🔐 Secure user registration with automatic ₹1,00,000 welcome bonus
- 🔑 JWT-based authentication with HttpOnly cookies
- 💰 Real-time balance checking with celebration animations
- 📊 Interactive dashboard with multiple sections
- 🎨 Beautiful glassmorphism UI design
- 🌓 Dark theme with purple-pink gradient aesthetics

### AI Chatbot Assistant
- 🤖 Integrated AI chatbot powered by Hugging Face (Mistral-7B)
- 💬 Natural conversation with greeting responses
- 📝 Quick question shortcuts (cards, loans, services, support)
- 🔄 Collapsible quick questions panel
- 📱 Floating chat button and sidebar access
- 🪟 Minimized and expanded window modes

### Dashboard Sections
- 🏠 Home - Balance checking and user info
- ⚙️ Services - Banking services overview
- 💸 Transactions - Transaction history
- 💳 Cards - Virtual card display
- 💬 Support - Customer support options

## 🛠️ Tech Stack

- **Frontend**: React.js with React Router
- **Backend**: Node.js + Express
- **Database**: MySQL (Aiven Cloud)
- **Authentication**: JWT (JSON Web Token)
- **Password Security**: bcrypt hashing
- **AI**: Hugging Face API (Mistral-7B-Instruct)
- **Styling**: Custom CSS with glassmorphism effects

## 📁 Project Structure

```
kodbank/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Registration & Login
│   │   ├── balance.js       # Balance checking
│   │   └── chatbot.js       # AI Chatbot API
│   ├── middleware/
│   │   └── authMiddleware.js # JWT validation
│   ├── db.js                # MySQL connection
│   ├── server.js            # Express server
│   └── schema.sql           # Database schema
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.js  # Registration page
│   │   │   ├── Login.js     # Login page
│   │   │   └── Dashboard.js # Main dashboard
│   │   ├── components/
│   │   │   └── Chatbot.js   # AI Chatbot component
│   │   ├── context/
│   │   │   └── ThemeContext.js # Theme management
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── package.json
├── .env.example
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL database (Aiven Cloud recommended)
- Hugging Face API key (optional, for AI chatbot)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd kodbank
```

### 2. Database Setup (Aiven MySQL)

1. Create an Aiven MySQL database
2. Run the SQL schema from `backend/schema.sql`
3. Note your connection details

### 3. Backend Setup

```bash
# Install backend dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
```

Required environment variables in `.env`:

```env
# Database Configuration
DB_HOST=your-aiven-host.aivencloud.com
DB_PORT=your-port
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=kodbank

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# Server Configuration
PORT=5000

# AI Chatbot (Optional)
HUGGINGFACE_API_KEY=your-huggingface-api-key
```

```bash
# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start React development server
npm start
```

Frontend will open at `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Protected Routes (Requires JWT)
- `GET /api/balance` - Get user balance
- `GET /api/user-info` - Get user information

### AI Chatbot
- `POST /api/chatbot/chat` - Send message to AI chatbot

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens stored in HttpOnly cookies
- ✅ Token expiry validation (1 hour)
- ✅ Database token storage and validation
- ✅ Protected routes with middleware
- ✅ CORS configuration
- ✅ Input validation and sanitization

## 💾 Database Schema

### KodUser Table
```sql
- uid (Primary Key, Auto Increment)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- phone (VARCHAR)
- role (ENUM: customer, manager, admin)
- balance (DECIMAL, default: 100000)
```

### UserToken Table
```sql
- tid (Primary Key, Auto Increment)
- token (TEXT)
- uid (Foreign Key → KodUser.uid)
- expiry (DATETIME)
```

## 🎨 UI Features

- **Glassmorphism Design**: Modern frosted glass effects throughout
- **Rounded Corners**: Smooth 20-30px border radius on all elements
- **Purple-Pink Gradient**: Beautiful color scheme for chatbot
- **Yellow-Amber Theme**: KodBank branding colors for main UI
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Slide-in, fade-in, and hover effects

## 🤖 AI Chatbot Features

### Capabilities
- Answers banking-related questions
- Provides information about services, cards, loans
- Natural greeting responses
- Conversation history (last 5 messages)
- Fallback responses when API unavailable

### Quick Questions
- What services does KodBank offer?
- How do I check my balance?
- Tell me about interest rates
- How can I contact support?
- What credit cards are available?
- How do I apply for a loan?
- What are the card benefits?
- Tell me about home loans

### Restrictions
- Banking topics only
- No code generation
- No image generation
- Professional and helpful tone

## 📱 Usage Guide

1. **Register**: Create account at `/register` - Get instant ₹1,00,000 bonus
2. **Login**: Access your account at `/login`
3. **Dashboard**: Explore different sections via sidebar
4. **Check Balance**: Click "Check Balance" for confetti celebration
5. **AI Assistant**: Click floating button or sidebar to chat with AI
6. **Quick Questions**: Use pre-defined questions for instant answers

## 🔧 Development

### Backend Development
```bash
npm run dev  # Runs with nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start    # Runs React development server
```

## 📦 Dependencies

### Backend
- express
- mysql2
- bcrypt
- jsonwebtoken
- cookie-parser
- cors
- dotenv
- axios

### Frontend
- react
- react-router-dom
- axios
- react-confetti

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=your-aiven-mysql-host
DB_PORT=your-mysql-port
DB_USER=your-mysql-username
DB_PASSWORD=your-mysql-password
DB_NAME=kodbank
JWT_SECRET=your-secret-key-min-32-chars
PORT=5000
HUGGINGFACE_API_KEY=your-hf-api-key
```

## 📝 Notes

- All new users are registered as "customer" role
- Initial balance is ₹1,00,000 (one lakh rupees)
- JWT tokens expire after 1 hour
- Expired tokens are automatically removed from database
- Chatbot works with fallback responses if API key not configured
- Theme is set to dark mode by default

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Built with ❤️ for KodNest Banking Solutions
