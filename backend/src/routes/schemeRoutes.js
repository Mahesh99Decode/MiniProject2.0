const express = require("express");
const router = express.Router();

const {
<<<<<<< HEAD
  getSchemes
=======
  getSchemes,
  createScheme,
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
} = require("../../controllers/schemeController");

// GET /api/schemes
router.get("/", getSchemes);

<<<<<<< HEAD
=======
// POST /api/schemes
router.post("/", createScheme);

>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
module.exports = router;