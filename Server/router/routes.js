const express = require('express');
const router = express.Router();

const crimeController = require('../controller/crimeController');

// Route for reporting a crime
router.post('/crimes', crimeController.reportCrime);

// Route for getting nearby crimes within a specific period
router.get('/crimes', crimeController.getCrimes);

module.exports = router;
