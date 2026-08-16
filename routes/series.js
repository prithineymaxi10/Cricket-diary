const express = require('express');
const router = express.Router();
const T20I = require('../models/T20I');
const ODI = require('../models/ODI');

// Get series overview (both T20I and ODI)
router.get('/overview', async (req, res) => {
    try {
        const t20i = await T20I.findOne().select('seriesInfo');
        const odi = await ODI.findOne().select('seriesInfo');
        
        res.status(200).json({
            t20i: t20i?.seriesInfo || null,
            odi: odi?.seriesInfo || null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all featured articles
router.get('/featured', async (req, res) => {
    try {
        const t20iFeatured = await T20I.findOne().select('featuredArticle');
        const odiFeatured = await ODI.findOne().select('featuredArticle');
        
        res.status(200).json({
            t20i: t20iFeatured?.featuredArticle || null,
            odi: odiFeatured?.featuredArticle || null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search across both series
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q || q.length < 2) {
            return res.status(400).json({ error: 'Search query must be at least 2 characters' });
        }

        const searchRegex = new RegExp(q, 'i');
        
        const t20iMatches = await T20I.findOne({
            $or: [
                { 'matches.title': searchRegex },
                { 'matches.excerpt': searchRegex },
                { 'performances.title': searchRegex },
                { 'analysis.title': searchRegex }
            ]
        });

        const odiMatches = await ODI.findOne({
            $or: [
                { 'matches.title': searchRegex },
                { 'matches.excerpt': searchRegex },
                { 'performances.title': searchRegex },
                { 'previews.title': searchRegex }
            ]
        });

        res.status(200).json({
            t20i: t20iMatches,
            odi: odiMatches
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
