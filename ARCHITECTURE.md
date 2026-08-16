# Project Architecture - The Cricket Diary

Comprehensive technical architecture overview and system design.

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (Frontend)                  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            HTML5 + CSS3 + Vanilla JavaScript         │   │
│  │  - Modern UI Mode  |  Classical Newspaper Mode       │   │
│  │  - Responsive Design | Real-time Data Fetching       │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ▲                                  │
│                            │ HTTP/CORS                        │
│                            ▼                                  │
└─────────────────────────────────────────────────────────────┘
                             │
                             │ RESTful API
                             │
┌─────────────────────────────────────────────────────────────┐
│                   API Layer (Backend)                        │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Express.js Server (Node.js)               │   │
│  │  - CORS Enabled                                      │   │
│  │  - JSON Request/Response                             │   │
│  │  - Error Handling Middleware                         │   │
│  │  - Routes: T20I, ODI, Series, Articles              │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ▲                                  │
│                            │ MongoDB Driver                   │
│                            ▼                                  │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer (Database)                      │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           MongoDB Collections                        │   │
│  │  ┌──────────────────────┐  ┌──────────────────────┐ │   │
│  │  │   T20I Series Docs   │  │   ODI Series Docs    │ │   │
│  │  │                      │  │                      │ │   │
│  │  │ - Featured Article   │  │ - Featured Article   │ │   │
│  │  │ - Matches            │  │ - Matches            │ │   │
│  │  │ - Performances       │  │ - Performances       │ │   │
│  │  │ - Analysis           │  │ - Previews           │ │   │
│  │  │ - Statistics         │  │ - Statistics         │ │   │
│  │  └──────────────────────┘  └──────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🗂️ Directory Structure

```
cricket-diary-project/
│
├── frontend/                          # Client-side application
│   ├── index.html                     # Main HTML entry point
│   ├── package.json                   # Frontend metadata
│   │
│   ├── js/
│   │   ├── api-service.js            # API client class
│   │   │   └── Methods for all API endpoints
│   │   │
│   │   └── app.js                    # Application logic
│   │       ├── State management
│   │       ├── Data loading functions
│   │       ├── DOM rendering
│   │       ├── Event handlers
│   │       └── UI utilities
│   │
│   └── css/
│       ├── styles.css                # Base/shared styles
│       │   ├── CSS variables
│       │   ├── Animations
│       │   └── Responsive utilities
│       │
│       ├── modern.css                # Modern mode styles
│       │   ├── Header & navigation
│       │   ├── Featured articles
│       │   ├── Statistics cards
│       │   ├── News grids
│       │   └── Footer
│       │
│       └── newspaper.css             # Newspaper mode styles
│           ├── Classical masthead
│           ├── Column layouts
│           ├── Typography for print
│           └── Print-optimized design
│
├── backend/                           # Server-side application
│   ├── server.js                      # Express app initialization
│   │   ├── Middleware setup
│   │   ├── CORS configuration
│   │   ├── Route imports
│   │   ├── Error handlers
│   │   └── Server start
│   │
│   ├── package.json                   # Dependencies & scripts
│   │   ├── express
│   │   ├── mongoose
│   │   ├── cors
│   │   ├── dotenv
│   │   └── nodemon (dev)
│   │
│   ├── seed.js                        # Database initialization
│   │   ├── MongoDB connection
│   │   ├── Data insertion
│   │   └── Collection setup
│   │
│   ├── models/                        # Database schemas
│   │   ├── T20I.js                   # T20I series schema
│   │   │   ├── seriesInfo
│   │   │   ├── featuredArticle
│   │   │   ├── matches
│   │   │   ├── performances
│   │   │   ├── analysis
│   │   │   └── statistics
│   │   │
│   │   └── ODI.js                    # ODI series schema
│   │       ├── seriesInfo
│   │       ├── featuredArticle
│   │       ├── matches
│   │       ├── performances
│   │       ├── previews
│   │       └── keyContests
│   │
│   ├── routes/                        # API endpoints
│   │   ├── t20i.js                   # T20I endpoints
│   │   │   ├── GET /t20i/series
│   │   │   ├── GET /t20i/featured
│   │   │   ├── GET /t20i/matches
│   │   │   ├── GET /t20i/performances
│   │   │   ├── GET /t20i/analysis
│   │   │   └── GET /t20i/statistics
│   │   │
│   │   ├── odi.js                    # ODI endpoints
│   │   │   ├── GET /odi/series
│   │   │   ├── GET /odi/featured
│   │   │   ├── GET /odi/matches
│   │   │   ├── GET /odi/performances
│   │   │   ├── GET /odi/previews
│   │   │   ├── GET /odi/contests
│   │   │   └── GET /odi/statistics
│   │   │
│   │   ├── series.js                 # Series overview
│   │   │   ├── GET /series/overview
│   │   │   ├── GET /series/featured
│   │   │   └── GET /series/search
│   │   │
│   │   └── articles.js               # Articles aggregation
│   │       └── GET /articles
│   │
│   └── middleware/                    # Future middleware
│       └── (authentication, validation, etc.)
│
├── config/                            # Configuration files
│   └── (database config, etc.)
│
├── .env.example                       # Environment template
├── .gitignore                         # Git ignore rules
├── README.md                          # Project overview
├── DEPLOYMENT.md                      # Deployment guide
├── API.md                             # API documentation
└── ARCHITECTURE.md                    # This file
```

## 🔄 Data Flow

### Frontend to Backend Flow

1. **User Action**
   ```
   User clicks tab / loads page
         ↓
   DOM event triggered
   ```

2. **API Request**
   ```
   api.getT20ISeries()
         ↓
   api-service.js:request()
         ↓
   fetch('http://localhost:5000/api/t20i/series')
   ```

3. **Backend Processing**
   ```
   Express router receives GET request
         ↓
   routes/t20i.js router handler
         ↓
   MongoDB query: T20I.findOne()
         ↓
   Data serialization to JSON
   ```

4. **Response**
   ```
   Backend returns JSON response
         ↓
   Frontend receives response
         ↓
   app.js processes data
         ↓
   renderT20IContent() updates DOM
   ```

5. **Display**
   ```
   CSS applies styling
         ↓
   Modern or Newspaper mode renders
         ↓
   User sees updated content
   ```

## 🏗️ Component Architecture

### Frontend Components

```javascript
// Global State
state = {
  currentTab: 't20i',
  mode: 'modern',
  t20iData: null,
  odiData: null,
  loading: true
}

// Core Functions
initializeApp()           // Initialize on page load
loadT20IData()           // Fetch T20I data
loadODIData()            // Fetch ODI data
renderT20IContent()      // Render T20I UI
renderODIContent()       // Render ODI UI
renderNewspaperContent() // Render newspaper version
switchTab()              // Switch between tabs
toggleMode()             // Switch modes
```

### Backend Components

```
Server (Express)
├── Routes
│   ├── T20I Router
│   │   └── Controllers: getSeries, getFeatured, getMatches, etc.
│   ├── ODI Router
│   │   └── Controllers: getSeries, getFeatured, getMatches, etc.
│   ├── Series Router
│   │   └── Controllers: getOverview, getFeatured, search
│   └── Articles Router
│       └── Controllers: getArticles
│
├── Models
│   ├── T20I Model (MongoDB Schema)
│   └── ODI Model (MongoDB Schema)
│
└── Middleware
    ├── CORS
    ├── JSON Parser
    └── Error Handler
```

## 📊 MongoDB Schema Design

### T20I Collection

```javascript
{
  _id: ObjectId,
  seriesInfo: {
    name: String,
    status: String,
    result: String,
    startDate: Date,
    endDate: Date
  },
  featuredArticle: {
    title: String,
    subtitle: String,
    content: String,
    badge: String,
    date: Date,
    author: String
  },
  statistics: [{
    label: String,
    value: String,
    description: String
  }],
  matches: [{
    matchNumber: Number,
    title: String,
    excerpt: String,
    category: String,
    date: Date,
    result: String,
    content: String,
    teams: {
      team1: String,
      team1Score: String,
      team2: String,
      team2Score: String
    }
  }],
  performances: [{
    playerName: String,
    title: String,
    excerpt: String,
    stats: {
      score: String,
      balls: String,
      role: String
    },
    content: String
  }],
  analysis: [{
    title: String,
    excerpt: String,
    content: String,
    category: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 API Layer Design

### Request/Response Cycle

```
Client Request
    ↓
Express Middleware (CORS, JSON parsing)
    ↓
Route Handler
    ↓
MongoDB Query
    ↓
Data Processing
    ↓
JSON Response
    ↓
Client receives data
    ↓
Frontend renders
```

### API Versioning (Future)

```
/api/v1/t20i/series
/api/v2/t20i/series
```

## 🔐 Security Considerations

### Current Implementation

- ✓ CORS enabled
- ✓ Input validation (basic)
- ✓ Error handling
- ✓ Environment variables for secrets

### Future Enhancements

- [ ] JWT Authentication
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] HTTPS enforcement
- [ ] HSTS headers
- [ ] CSP headers
- [ ] API versioning

## ⚙️ Configuration Management

### Environment Variables

```env
# Backend
NODE_ENV=development|production
PORT=5000
MONGODB_URI=mongodb://...
FRONTEND_URL=http://localhost:3000

# Frontend
API_URL=http://localhost:5000/api
```

### Config Files

- `.env`: Local environment variables
- `.env.example`: Template for new setups
- `package.json`: Scripts and dependencies

## 📈 Scalability Considerations

### Current Limits

- Single MongoDB document per series
- In-memory caching (none currently)
- No database indexing optimization

### Future Improvements

- [ ] Redis caching
- [ ] Database indexing
- [ ] Pagination
- [ ] Compression (gzip)
- [ ] CDN for static assets
- [ ] Load balancing
- [ ] Database replication

## 🔍 Monitoring & Logging

### Current Implementation

- Console logging in development
- Error logging in handlers

### Future Implementation

- [ ] Winston logger
- [ ] Morgan request logging
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Database query logging

## 🧪 Testing Strategy

### Current

- Manual testing

### Future

```javascript
// Unit Tests
tests/
├── models/
├── routes/
└── utils/

// Integration Tests
tests/integration/

// End-to-End Tests
tests/e2e/
```

## 📚 Technology Decisions

| Layer | Technology | Reasoning |
|-------|-----------|-----------|
| Frontend | Vanilla JS | Lightweight, no dependencies |
| Backend | Express.js | Fast, minimal, well-documented |
| Database | MongoDB | Document-based, flexible schema |
| Deployment | Heroku | Easy deployment, MongoDB Atlas integration |
| Version Control | Git | Industry standard |

## 🚀 Deployment Architecture

### Development

```
Local Machine
├── Frontend (localhost:3000)
├── Backend (localhost:5000)
└── MongoDB (localhost:27017)
```

### Production

```
Cloud Provider (Heroku/AWS/DigitalOcean)
├── Frontend (Vercel/GitHub Pages/CDN)
├── Backend (Heroku dyno/EC2 instance)
└── Database (MongoDB Atlas)
```

## 📊 Performance Metrics

### Current

- Average response time: <200ms
- Payload size: ~50KB (varies)
- Frontend load time: ~2-3s

### Target

- Response time: <100ms
- Payload size: <30KB
- Frontend load time: <1.5s

## 🔄 Continuous Integration/Deployment

### Planned

```
GitHub Push
    ↓
GitHub Actions
    ↓
Run Tests
    ↓
Build & Deploy
    ↓
Production
```

## 📝 Code Standards

### Frontend

- Vanilla JavaScript (ES6+)
- BEM CSS naming
- Mobile-first responsive design
- Semantic HTML

### Backend

- Express.js conventions
- RESTful API design
- Error handling
- Environment-based config

## 🎓 Learning Path

1. **Frontend**: Understand HTML/CSS/JS structure
2. **Backend**: Learn Express.js basics
3. **Database**: Understand MongoDB operations
4. **Deployment**: Practice on Heroku/Vercel
5. **Optimization**: Implement caching and monitoring

---

For detailed information about specific components, see:
- [API Documentation](./API.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [README](./README.md)
