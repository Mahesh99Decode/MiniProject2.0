const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// @route   POST /api/auth/register
// @desc    Register new user in MongoDB
router.post("/register", authController.register);

// @route   POST /api/auth/login
// @desc    Login and authenticate against MongoDB
router.post("/login", authController.login);

// @route   GET /api/auth/me
// @desc    Get current user profile (protected by MongoDB token)
router.get("/me", authMiddleware, authController.getMe);

// @route   PUT /api/auth/profile
// @desc    Update current user profile in MongoDB (protected)
router.put("/profile", authMiddleware, authController.updateProfile);

module.exports = router;
