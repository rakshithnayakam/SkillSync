# SkillSync Deployment Guide

## Stack
- **Frontend** → Vercel (free)
- **Backend**  → Render (free)
- **Database** → MongoDB Atlas (free)

---

## Step 1 — MongoDB Atlas
1. Go to https://cloud.mongodb.com → Create free cluster
2. Create a database user (username + password)
3. Allow network access: `0.0.0.0/0`
4. Copy your connection string:
   `mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/skillsync`

---

## Step 2 — Deploy Backend to Render
1. Push your code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your GitHub repo → select `packages/backend` as root dir
4. Set these env vars in Render dashboard:
   ```
   PORT=8000
   MONGO_URI=<your atlas connection string>
   ACCESS_TOKEN_SECRET=<random 32-char string>
   REFRESH_TOKEN_SECRET=<random 32-char string>
   ACCESS_TOKEN_EXPIRY_JWT=1d
   REFRESH_TOKEN_EXPIRY_JWT=7d
   CORS_ORIGIN=https://your-app.vercel.app  ← update after step 3
   ```
5. Deploy — note your backend URL e.g. `https://skillsync-backend.onrender.com`

---

## Step 3 — Deploy Frontend to Vercel
1. Go to https://vercel.com → New Project
2. Import your GitHub repo → set root directory to `packages/frontend`
3. Add env variable:
   ```
   VITE_BACKEND_URL=https://skillsync-backend.onrender.com/api/v1
   ```
4. Deploy — note your frontend URL e.g. `https://skillsync.vercel.app`

---

## Step 4 — Update CORS on Render
1. Go back to Render → your backend service → Environment
2. Update `CORS_ORIGIN` to your Vercel URL:
   ```
   CORS_ORIGIN=https://skillsync.vercel.app
   ```
3. Redeploy backend

---

## Step 5 — Seed Skills (optional)
```bash
cd packages/backend
node src/scripts/seedSkills.js
```

---

## Making yourself Admin
In MongoDB Atlas → Browse Collections → users collection:
Find your user and change `role` from `"Learner"` to `"Admin"`
Then log out and log back in.

---

## Local Development
```bash
# Terminal 1 — Backend
cd packages/backend
cp .env.example .env   # fill in your values
npm run dev

# Terminal 2 — Frontend  
cd packages/frontend
cp .env.example .env   # already set for localhost
npm run dev
```
