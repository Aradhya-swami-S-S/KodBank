# KodBank - Complete Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MySQL Database (Aiven Cloud or local)
- npm or yarn package manager

## Step-by-Step Setup

### 1. Clone/Download the Project
```bash
# Navigate to the project directory
cd KodBank
```

### 2. Backend Setup

#### Install Backend Dependencies
```bash
npm install
```

#### Configure Environment Variables
Create a `.env` file in the root directory:
```env
DB_HOST=your-aiven-host.aivencloud.com
DB_PORT=your-port
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=kodbank
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
NODE_ENV=development
```

#### Setup MySQL Database
1. Create a MySQL database on Aiven Cloud (or use local MySQL)
2. Run the SQL schema from `backend/schema.sql`:
   - Connect to your MySQL database
   - Execute all SQL commands in the schema file
   - This will create the `KodUser` and `UserToken` tables

#### Start Backend Server
```bash
# Development mode with auto-reload
npm run dev

# OR Production mode
npm start
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd frontend
```

#### Install Frontend Dependencies
```bash
npm install
```

#### Start Frontend Development Server
```bash
npm start
```

The React app will open automatically at `http://localhost:3000`

## Testing the Application

### 1. Register a New Account
- Navigate to `http://localhost:3000/register`
- Fill in the registration form:
  - Username
  - Email
  - Password
  - Phone Number
- Click "Create Account"
- You'll receive ₹1,00,000 as welcome bonus automatically

### 2. Login
- Navigate to `http://localhost:3000/login`
- Enter your username and password
- Click "Login"

### 3. Dashboard Features
- **Home**: View user info and check balance
- **Services**: Browse available banking services
- **Transactions**: View transaction history
- **Cards**: View your virtual credit card
- **Support**: Access customer support options

### 4. Theme Toggle
- Click the 🌙/☀️ button to switch between light and dark themes
- Theme preference is saved in localStorage

## Troubleshooting

### Backend Issues

**Error: Cannot connect to database**
- Check your `.env` file has correct database credentials
- Ensure your Aiven MySQL instance is running
- Verify firewall/network settings allow connection

**Error: JWT_SECRET not defined**
- Make sure `.env` file exists in root directory
- Verify `JWT_SECRET` is set in `.env`

**Error: Port 5000 already in use**
- Change `PORT` in `.env` to another port (e.g., 5001)
- Update proxy in `frontend/package.json` accordingly

### Frontend Issues

**Error: Cannot connect to backend**
- Ensure backend server is running on port 5000
- Check proxy setting in `frontend/package.json`
- Verify CORS is properly configured in backend

**Error: Module not found**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

**Theme not working**
- Clear browser localStorage
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

### Database Issues

**Tables not created**
- Manually run the SQL commands from `backend/schema.sql`
- Check database user has CREATE TABLE permissions

**Foreign key constraint fails**
- Drop existing tables and recreate them
- Ensure tables are created in correct order (KodUser first, then UserToken)

## Project Structure

```
KodBank/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Registration & Login
│   │   └── balance.js       # Balance & User Info
│   ├── middleware/
│   │   └── authMiddleware.js # JWT validation
│   ├── db.js                # MySQL connection
│   ├── server.js            # Express server
│   └── schema.sql           # Database schema
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── ThemeContext.js  # Theme management
│   │   ├── pages/
│   │   │   ├── Register.js
│   │   │   ├── Register.css
│   │   │   ├── Login.js
│   │   │   ├── Login.css
│   │   │   ├── Dashboard.js
│   │   │   └── Dashboard.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── package.json
├── .env.example
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Protected Routes (Requires JWT)
- `GET /api/balance` - Get user balance
- `GET /api/user-info` - Get user information

## Security Features

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens stored in HttpOnly cookies
- Token expiry validation (1 hour)
- Database token storage for validation
- Protected routes with middleware
- CORS configuration for frontend

## Default Values

- **Initial Balance**: ₹1,00,000
- **User Role**: customer
- **Token Expiry**: 1 hour
- **Backend Port**: 5000
- **Frontend Port**: 3000

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure both backend and frontend servers are running
4. Check database connection and tables exist

## License

This project is for educational purposes.
