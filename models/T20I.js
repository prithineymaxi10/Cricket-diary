const mongoose = require('mongoose');

const t20iSchema = new mongoose.Schema({
    seriesInfo: {
        name: { type: String, default: 'India vs England T20I Series 2026' },
        status: { type: String, enum: ['ongoing', 'completed'], default: 'completed' },
        result: { type: String, default: 'England 4-0' },
        startDate: { type: Date, default: new Date('2026-07-01') },
        endDate: { type: Date, default: new Date('2026-07-12') }
    },
    
    featuredArticle: {
        title: String,
        subtitle: String,
        content: String,
        badge: { type: String, default: 'Breaking News' },
        date: Date,
        author: String
    },

    statistics: [
        {
            label: String,
            value: String,
            description: String
        }
    ],

    matches: [
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
    ],

    performances: [
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
    ],

    analysis: [
        {
            title: String,
            excerpt: String,
            content: String,
            category: String
        }
    ],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
t20iSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('T20I', t20iSchema);
