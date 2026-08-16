# Cricket Diary API Documentation

Complete API reference for The Cricket Diary backend.

## Base URL

```
http://localhost:5000/api
```

Production: `https://cricket-diary-app.herokuapp.com/api`

## Authentication

Currently, no authentication required. Future versions will include JWT tokens.

## Response Format

All responses are JSON with this format:

```json
{
  "data": { /* actual data */ },
  "error": null,
  "timestamp": "2026-07-12T10:30:00Z"
}
```

Error responses:

```json
{
  "error": "Error message",
  "status": 400
}
```

## Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

---

## T20I Series Endpoints

### Get Series Information

**Request:**
```
GET /t20i/series
```

**Response:**
```json
{
  "seriesInfo": {
    "name": "India vs England T20I Series 2026",
    "status": "completed",
    "result": "England 4-0",
    "startDate": "2026-07-01T00:00:00.000Z",
    "endDate": "2026-07-12T00:00:00.000Z"
  },
  "statistics": [
    {
      "label": "Series Result",
      "value": "4-0",
      "description": "England Victory"
    }
  ]
}
```

### Get Featured Article

**Request:**
```
GET /t20i/featured
```

**Response:**
```json
{
  "title": "England Dominates With Historic 4-0 Series Victory",
  "subtitle": "Clinical performances from batting and bowling units",
  "content": "In a comprehensive display of cricket excellence...",
  "badge": "Breaking News",
  "date": "2026-07-12T00:00:00.000Z",
  "author": "Sports Bureau"
}
```

### Get All Matches

**Request:**
```
GET /t20i/matches
```

**Response:**
```json
[
  {
    "matchNumber": 1,
    "title": "First T20I: Rain Intervention",
    "excerpt": "India posted 189/7 before rain halted England's chase...",
    "category": "Match Report",
    "date": "2026-07-03T00:00:00.000Z",
    "result": "No Result",
    "content": "India's opening match produced a score...",
    "teams": {
      "team1": "India",
      "team1Score": "189/7",
      "team2": "England",
      "team2Score": "No play"
    }
  }
]
```

### Get Specific Match

**Request:**
```
GET /t20i/matches/1
```

**Parameters:**
- `1`: Match number (integer)

**Response:**
```json
{
  "matchNumber": 1,
  "title": "First T20I: Rain Intervention",
  "excerpt": "India posted 189/7...",
  "category": "Match Report",
  "content": "...",
  "teams": { ... }
}
```

### Get All Performances

**Request:**
```
GET /t20i/performances
```

**Response:**
```json
[
  {
    "playerName": "Jos Butler",
    "title": "Jos Butler's Historical Achievement",
    "excerpt": "131 off 64 balls—the highest individual score...",
    "stats": {
      "score": "131*",
      "balls": "64",
      "role": "Batsman"
    },
    "content": "Butler's masterclass display showcased..."
  }
]
```

### Get All Analysis Articles

**Request:**
```
GET /t20i/analysis
```

**Response:**
```json
[
  {
    "title": "Batting Collapse Analysis",
    "excerpt": "India's inexperienced middle order consistently faltered...",
    "content": "The inability to handle short-pitched deliveries...",
    "category": "Analysis"
  }
]
```

### Get Statistics

**Request:**
```
GET /t20i/statistics
```

**Response:**
```json
[
  {
    "label": "Series Result",
    "value": "4-0",
    "description": "England Victory"
  },
  {
    "label": "Highest Individual Score",
    "value": "131",
    "description": "Jos Butler"
  }
]
```

---

## ODI Series Endpoints

### Get Series Information

**Request:**
```
GET /odi/series
```

**Response:**
```json
{
  "seriesInfo": {
    "name": "India vs England ODI Series 2026",
    "status": "ongoing",
    "result": "Series Level 1-1",
    "totalMatches": 3,
    "completedMatches": 2,
    "startDate": "2026-07-14T00:00:00.000Z",
    "endDate": null
  }
}
```

### Get Featured Article

**Request:**
```
GET /odi/featured
```

**Response:**
```json
{
  "title": "Root Anchors England to Level Series Against India",
  "subtitle": "Masterclass display of controlled batting guides chase",
  "content": "In a masterclass display...",
  "badge": "ODI Series",
  "date": "2026-07-16T00:00:00.000Z",
  "author": "Cricket Correspondent"
}
```

### Get All Matches

**Request:**
```
GET /odi/matches
```

**Response:**
```json
[
  {
    "matchNumber": 1,
    "title": "1st ODI at Manchester: England Falls",
    "excerpt": "India secured a 50-run victory...",
    "category": "Match Report",
    "venue": "Old Trafford, Manchester",
    "date": "2026-07-14T00:00:00.000Z",
    "result": "India won by 50 runs",
    "content": "India posted a strong total...",
    "teams": {
      "team1": "India",
      "team1Score": "285/7",
      "team2": "England",
      "team2Score": "235 (47.2 ov)"
    },
    "playerOfMatch": "Virat Kohli"
  }
]
```

### Get Specific Match

**Request:**
```
GET /odi/matches/2
```

**Response:**
```json
{
  "matchNumber": 2,
  "title": "2nd ODI at Cardiff: Root's Masterclass",
  "excerpt": "Joe Root's unbeaten 99...",
  "category": "Match Report",
  "venue": "Sophia Gardens, Cardiff",
  "result": "England won by 6 wickets",
  "teams": { ... },
  "playerOfMatch": "Joe Root"
}
```

### Get All Performances

**Request:**
```
GET /odi/performances
```

**Response:**
```json
[
  {
    "playerName": "Joe Root",
    "title": "Joe Root's Masterclass Display",
    "excerpt": "99* from 133 balls...",
    "stats": {
      "score": "99*",
      "balls": "133",
      "role": "Batsman"
    },
    "content": "Root's presence in all partnerships..."
  }
]
```

### Get Previews

**Request:**
```
GET /odi/previews
```

**Response:**
```json
[
  {
    "title": "Series Decider at Lord's",
    "excerpt": "Venue traditionally favors batting first...",
    "content": "With the series level at 1-1...",
    "category": "Preview",
    "matchNumber": 3
  }
]
```

### Get Key Contests

**Request:**
```
GET /odi/contests
```

**Response:**
```json
[
  {
    "title": "The Kohli-Archer Duel",
    "players": ["Virat Kohli", "Jofra Archer"],
    "description": "Archer has dismissed Kohli in back-to-back games..."
  }
]
```

### Get Statistics

**Request:**
```
GET /odi/statistics
```

**Response:**
```json
[
  {
    "label": "India Total",
    "value": "233/8",
    "description": "2nd ODI at Cardiff"
  }
]
```

---

## Series Overview Endpoints

### Get Overview (Both Series)

**Request:**
```
GET /series/overview
```

**Response:**
```json
{
  "t20i": {
    "name": "India vs England T20I Series 2026",
    "status": "completed",
    "result": "England 4-0"
  },
  "odi": {
    "name": "India vs England ODI Series 2026",
    "status": "ongoing",
    "result": "Series Level 1-1"
  }
}
```

### Get All Featured Articles

**Request:**
```
GET /series/featured
```

**Response:**
```json
{
  "t20i": {
    "title": "England Dominates With Historic 4-0 Series Victory",
    "content": "...",
    "author": "Sports Bureau"
  },
  "odi": {
    "title": "Root Anchors England to Level Series Against India",
    "content": "...",
    "author": "Cricket Correspondent"
  }
}
```

### Search Articles

**Request:**
```
GET /series/search?q=kohli
```

**Parameters:**
- `q` (required): Search query (minimum 2 characters)

**Response:**
```json
{
  "t20i": {
    "matches": [...],
    "performances": [...]
  },
  "odi": {
    "matches": [...],
    "performances": [...]
  }
}
```

---

## Articles Endpoints

### Get Latest Articles

**Request:**
```
GET /articles?limit=10
```

**Parameters:**
- `limit` (optional): Number of articles to return (default: 10)

**Response:**
```json
[
  {
    "type": "T20I",
    "category": "Match",
    "title": "First T20I: Rain Intervention",
    "excerpt": "...",
    "content": "..."
  },
  {
    "type": "ODI",
    "category": "Performance",
    "title": "Joe Root's Masterclass Display",
    "excerpt": "...",
    "content": "..."
  }
]
```

---

## Health Check

### Check API Status

**Request:**
```
GET /health
```

**Response:**
```json
{
  "status": "API is running",
  "timestamp": "2026-07-12T10:30:00.000Z"
}
```

---

## Rate Limiting

Currently no rate limiting. Will be implemented in production.

---

## Error Handling

### Example Error Response

**Request:**
```
GET /t20i/matches/999
```

**Response (404):**
```json
{
  "error": "Match not found"
}
```

### Common Error Messages

| Status | Message | Solution |
|--------|---------|----------|
| 400 | Bad Request | Check query parameters |
| 404 | Not Found | Verify endpoint and parameters |
| 500 | Internal Server Error | Check server logs |

---

## Data Models

### Match Object

```javascript
{
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
}
```

### Performance Object

```javascript
{
  playerName: String,
  title: String,
  excerpt: String,
  stats: {
    score: String,
    balls: String,
    role: String
  },
  content: String
}
```

### Article Object

```javascript
{
  title: String,
  excerpt: String,
  content: String,
  category: String,
  date: Date,
  author: String
}
```

---

## JavaScript Examples

### Fetch T20I Matches

```javascript
const matches = await fetch('http://localhost:5000/api/t20i/matches')
  .then(res => res.json());

console.log(matches);
```

### Search Articles

```javascript
const results = await fetch('http://localhost:5000/api/series/search?q=kohli')
  .then(res => res.json());

console.log(results);
```

### Get Series Overview

```javascript
const overview = await fetch('http://localhost:5000/api/series/overview')
  .then(res => res.json());

console.log(overview.t20i);
console.log(overview.odi);
```

---

## CORS Headers

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Pagination (Future)

Planned for v2.0:

```
GET /articles?page=1&limit=10&sort=-date
```

---

## Changelog

### v1.0.0 (Current)
- ✓ T20I endpoints
- ✓ ODI endpoints
- ✓ Series overview
- ✓ Article search
- ✓ Full CORS support

### v1.1.0 (Planned)
- [ ] Authentication/JWT
- [ ] Rate limiting
- [ ] Pagination
- [ ] Caching
- [ ] Admin endpoints

---

For more help, check [Express.js Docs](https://expressjs.com) or open an issue on GitHub.
