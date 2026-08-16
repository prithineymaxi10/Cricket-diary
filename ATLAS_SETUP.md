# MongoDB Atlas Setup Guide

The Cricket Diary now runs entirely on MongoDB Atlas (cloud-hosted MongoDB) — no local MongoDB installation needed. This guide walks through getting a connection string and getting the app running end to end.

---

## 1. Create a free Atlas account and cluster

1. Go to https://cloud.mongodb.com and sign up (or sign in)
2. Click **Create a deployment**
3. Choose the **Free (M0)** tier
4. Pick any cloud provider/region close to you
5. Click **Create Deployment** and wait a minute or two for it to provision

## 2. Create a database user

1. When prompted (or under **Security → Database Access**), click **Add New Database User**
2. Choose **Password** authentication
3. Set a username and password — **write these down**, you'll need them in a moment
   - Avoid special characters like `@`, `:`, `/` in the password if possible; if you must use one, you'll need to URL-encode it in the connection string later
4. Under database user privileges, "Read and write to any database" is fine for this project

## 3. Allow network access

1. Go to **Security → Network Access**
2. Click **Add IP Address**
3. For local development, click **Allow Access from Anywhere** (`0.0.0.0/0`)
   - This is fine for a personal dev project; for anything production-facing later, restrict this to specific IPs
4. Click **Confirm**

## 4. Get your connection string

1. Go to **Database** (left sidebar), find your cluster, click **Connect**
2. Choose **Drivers**
3. Copy the connection string shown — it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with the database user credentials from Step 2
5. Add your database name right after `.net/` and before the `?`, so it looks like:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/cricket-diary?retryWrites=true&w=majority
   ```
   (the database name — `cricket-diary` — doesn't need to exist yet; Atlas creates it automatically the first time data is written to it)

## 5. Configure the project

1. In the project root, copy the example env file if you haven't already:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and set `MONGODB_URI` to the connection string from Step 4:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/cricket-diary?retryWrites=true&w=majority
   FRONTEND_URL=http://localhost:3000
   ```

## 6. Seed and run

```bash
cd backend
npm install
npm run seed
npm run dev
```

Expected output:
```
✓ T20I Data seeded successfully
✓ ODI Data seeded successfully
Database populated with cricket coverage.
```

Then in another terminal:
```bash
cd frontend
npm start
```

Open `http://localhost:3000` — you should see match coverage loaded live from your Atlas cluster.

---

## Verifying it worked

**In Atlas:** go to your cluster → **Browse Collections**. You should see a `cricket-diary` database with `t20is` and `odis` collections, each containing one document.

**In the app:** open `http://localhost:5000/api/health` in a browser — should return `{"status":"API is running",...}`. Then `http://localhost:5000/api/t20i/featured` should return real article data, not an error.

---

## Troubleshooting

### `Could not connect to MongoDB: querySrv ENOTFOUND ...`
Your cluster address in `MONGODB_URI` is wrong, or there's a typo. Copy the connection string fresh from Atlas (Step 4) rather than retyping it.

### `Could not connect to MongoDB: bad auth`
Username or password is wrong. Double check what you set in Step 2 — if your password contains special characters, URL-encode them (e.g. `@` becomes `%40`).

### `MONGODB_URI is not set in your .env file`
You haven't created `.env`, or `MONGODB_URI` is missing/empty inside it. Check Step 5.

### Connection times out / hangs
Almost always a Network Access issue — go back to Step 3 and confirm your IP (or `0.0.0.0/0`) is allowed. Corporate/school networks sometimes block outbound MongoDB ports entirely.

### It worked yesterday, now it doesn't
Atlas free-tier clusters can pause after inactivity in some configurations, or your IP may have changed if you didn't allow "Anywhere." Check Network Access again.

---

## Why Atlas instead of local MongoDB

No local install, no background service to remember to start, and it works identically whether you're developing on your laptop or deploying to Heroku/Railway/Render later — the same `MONGODB_URI` just points at the cloud either way. See `DEPLOYMENT.md` for taking this to production.
