# The Cricket Diary - Real-time Cricket News Platform

> A full-stack cricket news application for India vs England Series coverage, presented in a classical newspaper print style, with a live-updating backend on MongoDB Atlas.

## 🎯 Overview

**The Cricket Diary** is a cricket news platform featuring:

- **Live Match Coverage**: Backend API on MongoDB Atlas serving T20I and ODI series coverage in a classical newspaper layout
- **Live Updates**: When match data changes on the server, every open browser tab refreshes automatically via Socket.io — no manual reload needed
- **Mini Cricket Game**: A ball-by-ball "Cricket Doodle" timing game — Fast, Swing, Spin, and rare Yorker deliveries each behave differently
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Advanced Styling**: Premium typography with Playfair Display + Inter + Crimson Text
- **No Hardcoding**: All content served from API, fully extensible
- **GitHub Ready**: Production-ready for GitHub hosting

## 🏗️ Tech Stack

### Backend
- **Node.js + Express.js**: RESTful API server
- **MongoDB Atlas**: Cloud-hosted document database — see [ATLAS_SETUP.md](./ATLAS_SETUP.md)
- **Socket.io**: Lightweight live-update channel that pushes a refresh signal to open tabs when coverage changes
- **CORS**: Cross-origin resource sharing
- **Dotenv**: Environment configuration

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Advanced styling with custom properties
- **Vanilla JavaScript**: No frameworks (lightweight)
- **Responsive Grid**: Mobile-first design

## 📁 Project Structure

```
cricket-diary-project/
├── backend/
│   ├── models/
│   │   ├── T20I.js           # T20I Series Schema
│   │   └── ODI.js            # ODI Series Schema
│   ├── routes/
│   │   ├── t20i.js           # T20I API endpoints
│   │   ├── odi.js            # ODI API endpoints
│   │   ├── series.js         # Series overview endpoints
│   │   └── articles.js       # Articles endpoints
│   ├── server.js             # Express server
│   ├── seed.js               # Database seeding script
│   └── package.json
├── frontend/
│   ├── index.html            # Main HTML file
│   ├── js/
│   │   ├── api-service.js    # API client
│   │   ├── app.js            # Application logic + live-update listener
│   │   └── game.js           # Cricket Doodle mini-game
│   ├── css/
│   │   ├── styles.css        # Base styles
│   │   ├── newspaper.css     # Newspaper layout styles
│   │   └── game.css          # Game styles
│   └── package.json
├── .env.example              # Environment template
├── ATLAS_SETUP.md            # MongoDB Atlas setup guide
├── .gitignore               # Git ignore rules
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 14.0.0 or higher
- MongoDB 4.4 or higher (local or Atlas)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cricket-diary.git
cd cricket-diary-project
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies** (optional - for development)
```bash
cd ../frontend
npm install
```

### Configuration

1. **Create .env file**
```bash
cd cricket-diary-project
cp .env.example .env
```

2. **Edit .env with your configuration** — get `MONGODB_URI` from [ATLAS_SETUP.md](./ATLAS_SETUP.md)
```env
# Backend Configuration
NODE_ENV=development
PORT=5000

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cricket-diary?retryWrites=true&w=majority

# Frontend Configuration
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000/api
```

### Running Locally

1. **Set up MongoDB Atlas** (one-time) — follow [ATLAS_SETUP.md](./ATLAS_SETUP.md) to create a free cluster and get your connection string into `.env`

2. **Seed the database** (first time only)
```bash
cd backend
npm run seed
```

3. **Start backend server**
```bash
npm run dev
# Server runs on http://localhost:5000
```

4. **Start frontend** (in new terminal)
```bash
cd frontend
npm start
# Frontend runs on http://localhost:3000
```

5. **Open in browser**
Navigate to `http://localhost:3000`

## 📡 API Endpoints

### T20I Series

```
GET /api/t20i/series              # Get series info
GET /api/t20i/featured            # Get featured article
GET /api/t20i/matches             # Get all matches
GET /api/t20i/matches/:id         # Get specific match
GET /api/t20i/performances        # Get performances
GET /api/t20i/analysis            # Get analysis articles
GET /api/t20i/statistics          # Get statistics
```

### ODI Series

```
GET /api/odi/series               # Get series info
GET /api/odi/featured             # Get featured article
GET /api/odi/matches              # Get all matches
GET /api/odi/matches/:id          # Get specific match
GET /api/odi/performances         # Get performances
GET /api/odi/previews             # Get previews
GET /api/odi/contests             # Get key contests
GET /api/odi/statistics           # Get statistics
```

### Series Overview

```
GET /api/series/overview          # Both series info
GET /api/series/featured          # All featured articles
GET /api/series/search?q=query    # Search articles
```

### Articles

```
GET /api/articles?limit=10        # Get latest articles
```

### Live Updates

```
POST /api/series/broadcast-update # Tell all connected browsers to refresh coverage
```

The seed script calls this automatically after reseeding, so if the backend is already running when you run `npm run seed`, every open browser tab silently refreshes its match coverage over Socket.io (`coverage:updated` event) — no manual reload needed.

## 🎨 UI Features

### Newspaper Layout
- Classical print-style layout
- Two-column article design
- Drop caps and justified text
- Historical newspaper aesthetics
- Professional masthead
- Print-optimized

### Common Features
- Real-time data loading
- Smooth tab switching
- Mode toggle (persistent)
- Fully responsive design
- Accessibility-friendly
- Performance optimized

## 🔧 Updating Content

### Manual Content Updates

1. **Connect to MongoDB Atlas**
```bash
# Using MongoDB Shell with your Atlas connection string
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cricket-diary"

# OR use MongoDB Compass GUI - paste the same connection string
```

2. **Update collections**
```javascript
// Update T20I featured article
db.t20is.updateOne(
  {},
  { $set: { "featuredArticle.title": "New Title" } }
)

// Add new match
db.t20is.updateOne(
  {},
  { $push: { "matches": { matchNumber: 6, title: "..." } } }
)
```

### Automated Seed Script

Re-run the seed script any time to refresh match coverage from `backend/seed.js`. If the backend server is running, this also pushes a live update to every open browser tab:
```bash
cd backend
npm run seed
```

## 📦 Deployment

### Deploy to GitHub Pages (Frontend Only)

```bash
cd frontend

# Create gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
git add .
git commit -m "Initial commit"
git push origin gh-pages
```

### Deploy to Heroku (Full Stack)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create cricket-diary-app

# Add MongoDB Atlas
heroku config:set MONGODB_URI=your_mongodb_atlas_url

# Deploy
git push heroku main
```

### Deploy to Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📊 Database Schema

### T20I Series
```javascript
{
  seriesInfo: { name, status, result, startDate, endDate },
  featuredArticle: { title, content, badge, date, author },
  statistics: [{ label, value, description }],
  matches: [{ matchNumber, title, excerpt, content, teams }],
  performances: [{ playerName, title, stats, content }],
  analysis: [{ title, excerpt, content }]
}
```

### ODI Series
```javascript
{
  seriesInfo: { name, status, result, totalMatches, completedMatches },
  featuredArticle: { title, content, badge, date, author },
  statistics: [{ label, value, description }],
  matches: [{ matchNumber, title, excerpt, venue, teams, playerOfMatch }],
  performances: [{ playerName, title, stats, content }],
  previews: [{ title, excerpt, content, matchNumber }],
  keyContests: [{ title, players, description }]
}
```

## 🔐 Environment Variables

```env
# Backend
NODE_ENV=development|production
PORT=5000
MONGODB_URI=mongodb://...
FRONTEND_URL=http://localhost:3000

# Frontend
API_URL=http://localhost:5000/api
```

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Cricket Diary Team** - Cricket news platform
- Built with ❤️ for cricket enthusiasts

## 📞 Support

For issues, questions, or suggestions:

1. Open an issue on GitHub
2. Contact support@cricketdiary.com
3. Check existing documentation

## 🔗 Links

- [Live Demo](https://cricketdiary.com)
- [GitHub Repository](https://github.com/yourusername/cricket-diary)
- [API Documentation](./DOCS/API.md)
- [Deployment Guide](./DOCS/DEPLOYMENT.md)

---

**Made with 🏏 for cricket fans worldwide**
