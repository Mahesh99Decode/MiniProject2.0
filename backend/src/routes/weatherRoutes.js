const express = require("express");

const router = express.Router();

const getWeatherData = require(
    "../../services/weatherService"
);

router.get("/", async (req, res) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({
                success: false,
                message: "Latitude and Longitude required",
            });
        }

        const weatherData = await getWeatherData(
            lat,
            lon
        );

        res.status(200).json(weatherData);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
});

module.exports = router;