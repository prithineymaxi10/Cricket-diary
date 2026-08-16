const mongoose = require('mongoose');

const odiSchema = new mongoose.Schema({
    seriesInfo: {
        name: { type: String, default: 'India vs England ODI Series 2026' },
        status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
        result: { type: String, default: 'Series Level 1-1' },
        totalMatches: { type: Number, default: 3 },
        completedMatches: { type: Number, default: 2 },
        startDate: { type: Date, default: new Date('2026-07-14') },
        endDate: { type: Date }
    },

    featuredArticle: {
        title: String,
        subtitle: String,
        content: String,
        badge: { type: String, default: 'ODI Series' },
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
            venue: String,
            date: Date,
            result: String,
            content: String,
            teams: {
                team1: String,
                team1Score: String,
                team2: String,
                team2Score: String
            },
            playerOfMatch: String
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

    previews: [
        {
            title: String,
            excerpt: String,
            content: String,
            category: String,
            matchNumber: Number
        }
    ],

    keyContests: [
        {
            title: String,
            players: [String],
            description: String
        }
    ],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
odiSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('ODI', odiSchema);
