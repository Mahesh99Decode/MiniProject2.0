const express = require('express');
const router = express.Router();
const soilService = require('../../services/soilService');

// @route   GET /api/soil
// @desc    Fetch automated soil profile
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { lat, lon, district } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ msg: 'Please provide lat and lon query parameters' });
    }

    const soilData = await soilService.getSoilData(lat, lon, district || "default");
    
    res.json(soilData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
