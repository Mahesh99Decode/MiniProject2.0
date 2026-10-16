const schemes = require("../data/schemeData.json");

// GET /api/schemes?state=&type=
const getSchemes = (req, res) => {
  try {
    const { state, type } = req.query;

    let filtered = schemes;

    // Filter by state
    if (state) {
      filtered = filtered.filter((s) =>
        s.state === state || s.state === "All India"
      );
    }

    // Filter by type
    if (type) {
      filtered = filtered.filter((s) =>
        s.type === type
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });

  } catch (error) {
    console.error("Scheme Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch schemes"
    });
  }
};

module.exports = {
  getSchemes
};