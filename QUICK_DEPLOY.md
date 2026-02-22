# Quick Deployment Guide

## 🚀 Deploy in 10 Minutes

### Step 1: Deploy Backend (Render) - 5 minutes

1. Push code to GitHub
2. Go to https://render.com → New Web Service
3. Connect GitHub repo
4. Settings:
   - Build: `npm install`
   - Start: `node backend/server.js`
5. Add environment variables (from `.env`)
6. Deploy!
7. **Copy backend URL**: `https://kodbank-backend-xxxx.onrender.com`

### Step 2: Update Frontend - 2 minutes

Edit `frontend/.env.production`:
```env
REACT_APP_API_URL=https://kodbank-backend-xxxx.onrender.com
```

Commit and push:
```bash
git add frontend/.env.production
git commit -m "Update API URL"
git push
```

### Step 3: Deploy Frontend (Vercel) - 3 minutes

#### Option A: CLI
```bash
cd frontend
npm install -g vercel
vercel --prod
```

#### Option B: Dashboard
1. Go to https://vercel.com/new
2. Import GitHub repo
3. Root Directory: `frontend`
4. Add env var: `REACT_APP_API_URL=https://kodbank-backend-xxxx.onrender.com`
5. Deploy!

### Step 4: Test

Visit your Vercel URL and test:
- ✅ Registration
- ✅ Login
- ✅ Balance check
- ✅ Chatbot

---

## 🎯 Environment Variables

### Render (Backend):
```
DB_HOST=your-aiven-host
DB_PORT=16406
DB_USER=avnadmin
DB_PASSWORD=your-password
DB_NAME=KodBank
JWT_SECRET=your-jwt-secret
HUGGINGFACE_API_KEY=your-hf-key
PORT=5000
NODE_ENV=production
```

### Vercel (Frontend):
```
REACT_APP_API_URL=https://kodbank-backend-xxxx.onrender.com
```

---

## ✅ Done!

Your app is live! 🎉

For detailed instructions, see `DEPLOYMENT_GUIDE.md`
