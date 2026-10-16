const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

// In-memory store fallback when MongoDB is offline
const inMemoryUsers = {};

// @route   GET /api/users/profile/:email
// @desc    Fetch user profile by email
router.get('/profile/:email', async (req, res) => {
  try {
    const email = req.params.email;

    // Fast in-memory response if MongoDB is offline
    if (mongoose.connection.readyState !== 1) {
      if (!inMemoryUsers[email]) {
        inMemoryUsers[email] = {
          email,
          name: "Rajesh Patil",
          location: "Nashik, Maharashtra",
          photoURL: "assets/images/farmer-avatar.png",
          farmDetails: {
            totalLand: "12.5 Acres",
            mainCrop: "Wheat (HD-2967)",
            irrigationType: "Drip Irrigation",
            experience: "14 Years"
          }
        };
      }
      return res.json(inMemoryUsers[email]);
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name: "Rajesh Patil", location: "Nashik, Maharashtra" });
      await user.save();
    }

    res.json(user);
  } catch (err) {
    console.error("Profile GET Error:", err.message);
    res.json({
      name: "Rajesh Patil",
      location: "Nashik, Maharashtra",
      photoURL: "assets/images/farmer-avatar.png"
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile and farm details
router.put('/profile', async (req, res) => {
  try {
    const { email, name, location, photoURL, farmDetails } = req.body;

    if (!email) {
      return res.status(400).json({ msg: 'Email is required to update profile' });
    }

    if (mongoose.connection.readyState !== 1) {
      inMemoryUsers[email] = {
        email,
        name: name || inMemoryUsers[email]?.name || "Rajesh Patil",
        location: location || inMemoryUsers[email]?.location || "Nashik, Maharashtra",
        photoURL: photoURL || inMemoryUsers[email]?.photoURL || "assets/images/farmer-avatar.png",
        farmDetails: farmDetails || inMemoryUsers[email]?.farmDetails || {}
      };
      return res.json(inMemoryUsers[email]);
    }

    let user = await User.findOneAndUpdate(
      { email },
      { $set: { name, location, photoURL, farmDetails } },
      { new: true, upsert: true }
    );

    res.json(user);
  } catch (err) {
    console.error("Profile PUT Error:", err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
