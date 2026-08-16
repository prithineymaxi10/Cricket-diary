const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const httpServer = http.createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Socket.io - used only to push a lightweight "coverage updated" signal to
// every connected browser when match data changes, so the newspaper page
// can silently refresh itself without anyone needing to reload.
const io = new Server(httpServer, {
    cors: {
        origin: FRONTEND_URL,
        methods: ['GET', 'POST']
    }
});
app.set('io', io);

// Middleware
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection - defaults to MongoDB Atlas via MONGODB_URI in .env.
// See DOCS/ATLAS_SETUP.md for how to get a connection string.
if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set in your .env file.');
    console.error('See ATLAS_SETUP.md for how to get a MongoDB Atlas connection string.');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Import Routes
const t20iRoutes = require('./routes/t20i');
const odiRoutes = require('./routes/odi');
const seriesRoutes = require('./routes/series');
const articleRoutes = require('./routes/articles');

// API Routes
app.use('/api/t20i', t20iRoutes);
app.use('/api/odi', odiRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/articles', articleRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'API is running', timestamp: new Date() });
});

// Called by the seed script (or any future admin action) after match data
// changes, so every open browser tab updates live instead of needing a
// manual refresh. Intentionally unauthenticated for this demo project -
// add real auth here before deploying anywhere public.
app.post('/api/series/broadcast-update', (req, res) => {
    io.emit('coverage:updated', { timestamp: new Date() });
    res.status(200).json({ status: 'broadcasted' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Cricket Diary API running on port ${PORT}`);
    console.log(`Live coverage-update channel active`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
