const express = require('express');
const router = express.Router();
const ODI = require('../models/ODI');

// Get all ODI series data
router.get('/series', async (req, res) => {
    try {
        const seriesData = await ODI.findOne().select('seriesInfo statistics');
        if (!seriesData) {
            return res.status(404).json({ error: 'Series data not found' });
        }
        res.status(200).json(seriesData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get featured article
router.get('/featured', async (req, res) => {
    try {
        const data = await ODI.findOne().select('featuredArticle');
        if (!data) {
            return res.status(404).json({ error: 'Featured article not found' });
        }
        res.status(200).json(data.featuredArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all matches
router.get('/matches', async (req, res) => {
    try {
        const data = await ODI.findOne().select('matches');
        if (!data) {
            return res.status(404).json({ error: 'Matches not found' });
        }
        res.status(200).json(data.matches || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get specific match by number
router.get('/matches/:matchNumber', async (req, res) => {
    try {
        const data = await ODI.findOne();
        if (!data) {
            return res.status(404).json({ error: 'Match not found' });
        }
        const match = data.matches.find(m => m.matchNumber === parseInt(req.params.matchNumber));
        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all performances
router.get('/performances', async (req, res) => {
    try {
        const data = await ODI.findOne().select('performances');
        if (!data) {
            return res.status(404).json({ error: 'Performances not found' });
        }
        res.status(200).json(data.performances || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all previews
router.get('/previews', async (req, res) => {
    try {
        const data = await ODI.findOne().select('previews');
        if (!data) {
            return res.status(404).json({ error: 'Previews not found' });
        }
        res.status(200).json(data.previews || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get key contests
router.get('/contests', async (req, res) => {
    try {
        const data = await ODI.findOne().select('keyContests');
        if (!data) {
            return res.status(404).json({ error: 'Contests not found' });
        }
        res.status(200).json(data.keyContests || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all statistics
router.get('/statistics', async (req, res) => {
    try {
        const data = await ODI.findOne().select('statistics');
        if (!data) {
            return res.status(404).json({ error: 'Statistics not found' });
        }
        res.status(200).json(data.statistics || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
