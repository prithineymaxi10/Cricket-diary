const express = require('express');
const router = express.Router();
const T20I = require('../models/T20I');
const ODI = require('../models/ODI');

// Get article by ID (future enhancement)
router.get('/:id', async (req, res) => {
    try {
        res.status(200).json({ message: 'Article endpoint for future enhancement' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get latest articles across both series
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        
        const t20i = await T20I.findOne().select('matches performances analysis');
        const odi = await ODI.findOne().select('matches performances previews');
        
        const allArticles = [];
        
        if (t20i) {
            t20i.matches?.forEach(match => {
                allArticles.push({ ...match.toObject(), type: 'T20I', category: 'Match' });
            });
            t20i.performances?.forEach(perf => {
                allArticles.push({ ...perf.toObject(), type: 'T20I', category: 'Performance' });
            });
            t20i.analysis?.forEach(ana => {
                allArticles.push({ ...ana.toObject(), type: 'T20I', category: 'Analysis' });
            });
        }
        
        if (odi) {
            odi.matches?.forEach(match => {
                allArticles.push({ ...match.toObject(), type: 'ODI', category: 'Match' });
            });
            odi.performances?.forEach(perf => {
                allArticles.push({ ...perf.toObject(), type: 'ODI', category: 'Performance' });
            });
            odi.previews?.forEach(preview => {
                allArticles.push({ ...preview.toObject(), type: 'ODI', category: 'Preview' });
            });
        }
        
        res.status(200).json(allArticles.slice(0, limit));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
