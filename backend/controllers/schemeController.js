const mongoose = require("mongoose");
const { Scheme } = require("../database");
const staticSchemes = require("../data/schemeData.json");

// GET /api/schemes?state=&type=&category=&search=
const getSchemes = async (req, res) => {
  try {
    const { state, type, category, search } = req.query;

    // 1. Try fetching from MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      const query = {};

      if (state) {
        query.$or = [{ state: state }, { state: "All India" }];
      }

      if (type) {
        query.type = { $regex: new RegExp(`^${type}$`, "i") };
      }

      if (category) {
        query.category = { $regex: new RegExp(category, "i") };
      }

      if (search) {
        const searchRegex = new RegExp(search, "i");
        query.$or = [
          { name: searchRegex },
          { description: searchRegex },
          { tags: searchRegex },
        ];
      }

      const dbSchemes = await Scheme.find(query).lean();

      if (dbSchemes && dbSchemes.length > 0) {
        return res.json({
          success: true,
          source: "mongodb",
          count: dbSchemes.length,
          data: dbSchemes,
        });
      }
    }

    // 2. Fallback to static JSON file
    let filtered = staticSchemes;

    if (state) {
      filtered = filtered.filter(
        (s) => s.state === state || s.state === "All India"
      );
    }

    if (type) {
      filtered = filtered.filter(
        (s) => s.type && s.type.toLowerCase() === type.toLowerCase()
      );
    }

    if (category) {
      filtered = filtered.filter(
        (s) => s.category && s.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (search) {
      const sLower = search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          (s.name && s.name.toLowerCase().includes(sLower)) ||
          (s.description && s.description.toLowerCase().includes(sLower)) ||
          (s.tags && s.tags.some((t) => t.toLowerCase().includes(sLower)))
      );
    }

    res.json({
      success: true,
      source: "static_fallback",
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    console.error("Scheme Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch schemes",
    });
  }
};

// POST /api/schemes (Create new scheme in MongoDB)
const createScheme = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database not connected",
      });
    }

    const newScheme = await Scheme.create(req.body);
    res.status(201).json({
      success: true,
      data: newScheme,
    });
  } catch (error) {
    console.error("Create Scheme Error:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSchemes,
  createScheme,
};