# Quick Start Guide - The Cricket Diary

Get The Cricket Diary running in about 10 minutes ⚡ (most of that is a one-time MongoDB Atlas setup).

## Prerequisites Check

```bash
# Check Node.js
node --version          # Should be 14.0.0 or higher

# Check npm
npm --version           # Should be 6.0.0 or higher
```

If either is missing, install [Node.js](https://nodejs.org/) (npm comes bundled with it).

No local database install needed — this project runs on MongoDB Atlas (cloud-hosted, free tier).

---

## Step 1: MongoDB Atlas (one-time, ~5 mins)

Follow **[ATLAS_SETUP.md](./ATLAS_SETUP.md)** to create a free cluster and get your `MONGODB_URI` connection string. Come back here once you have it.

## Step 2: Clone & Configure (1 min)

```bash
git clone https://github.com/YOUR_USERNAME/cricket-diary.git
cd cricket-diary-project
cp .env.example .env
```

Open `.env` and paste in your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cricket-diary?retryWrites=true&w=majority
```

## Step 3: Backend (2 mins)

```bash
cd backend
npm install
npm run seed
npm run dev
```

**Expected output:**
```
✓ T20I Data seeded successfully
✓ ODI Data seeded successfully
Database populated with cricket coverage.
Connected to MongoDB
Cricket Diary API running on port 5000
Live coverage-update channel active
```

## Step 4: Frontend (1 min, new terminal)

```bash
cd frontend
npm start

# Or, if that doesn't work on your system:
python -m http.server 3000
```

**Expected output:**
```
Serving HTTP on 0.0.0.0 port 3000
```

## Step 5: Open it

Navigate to `http://localhost:3000` — you should see live match coverage loaded from your Atlas database.

**Done! 🎉**

---

## ✅ Verification Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Backend logs show `Connected to MongoDB`
- [ ] Database seeded with cricket data
- [ ] Frontend loads without console errors (F12)
- [ ] "Match Coverage" and "Play Cricket" nav buttons both work
- [ ] The game responds to Space / click / the Swing button

### Test API Health

```bash
curl http://localhost:5000/api/health
# Should return: {"status":"API is running","timestamp":"..."}
```

### Check Data Loaded

```bash
curl http://localhost:5000/api/t20i/featured
curl http://localhost:5000/api/odi/featured
```

Both should return real article JSON, not an error.

---

## Common Issues & Solutions

### "Port 5000 already in use"
```bash
lsof -i :5000       # find what's using it
kill -9 <PID>       # or change PORT in .env
```

### "Could not connect to MongoDB"
Almost always an Atlas configuration issue — see the Troubleshooting section in [ATLAS_SETUP.md](./ATLAS_SETUP.md) (bad password, wrong cluster address, or Network Access not allowing your IP).

### "MONGODB_URI is not set in your .env file"
You haven't created `.env` yet, or it's missing that line. See Step 2 above.

### "Frontend can't connect to API"
- Confirm the backend terminal is still running and shows no errors
- Check that `frontend/js/app.js`'s `API_BASE_URL` matches where your backend is running (defaults to `http://localhost:5000/api`)

### "No data showing on page"
```bash
cd backend
npm run seed
```
Then hard-refresh the browser (Ctrl+Shift+R). Check the browser console (F12) for the actual error if it still doesn't load.

---

## 📚 Next Steps

1. **Explore the code** — `frontend/js/app.js`, `backend/routes/t20i.js`, `backend/models/T20I.js`
2. **Customize content** — edit `backend/seed.js` and re-run `npm run seed` (this also live-pushes the update to any open browser tab)
3. **Deploy to production** — see [DEPLOYMENT.md](./DEPLOYMENT.md)
4. **Learn more** — [API.md](./API.md), [ARCHITECTURE.md](./ARCHITECTURE.md), [README.md](./README.md)

---

## 🔧 Development Commands

### Backend
```bash
cd backend
npm run dev      # development server with auto-reload
npm start        # production mode
npm run seed     # (re)populate match coverage, notifies live clients
```

### Frontend
```bash
cd frontend
npm start        # or: python -m http.server 3000
```

---

## 📱 What You Should See

- A newspaper-style masthead with **Match Coverage** and **Play Cricket** in the nav bar
- Match Coverage: full T20I and ODI series write-ups in a two-column print layout
- If you re-run `npm run seed` while the backend and a browser tab are both open, you'll see a small red dot pulse next to "Match Coverage" as it live-refreshes
- Play Cricket: a canvas timing game — press Space, tap, or click to swing at the ball

---

For detailed instructions, see:
- [Full README](./README.md)
- [MongoDB Atlas Setup](./ATLAS_SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [API Documentation](./API.md)
- [Architecture Overview](./ARCHITECTURE.md)
