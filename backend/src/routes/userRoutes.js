const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
<<<<<<< HEAD
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
=======
const { User } = require('../../database');

// In-memory fallback
const inMemoryUsers = {};

const getDefaultProfile = (identifier = "rajesh_patil") => ({
  username: identifier.includes("@") ? identifier.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_") : identifier,
  email: identifier.includes("@") ? identifier : `${identifier}@krishimitra.org`,
  name: "Rajesh Patil",
  phone: "9876543210",
  location: "Nashik, Maharashtra",
  photoURL: "assets/images/farmer-avatar.png",
  farmDetails: {
    totalLand: "12.5 Acres",
    mainCrop: "Wheat (HD-2967)",
    irrigationType: "Drip Irrigation",
    experience: "14 Years",
  },
  createdAt: new Date().toISOString(),
});

// @route   GET /api/users/profile/:identifier
// @desc    Fetch user profile by email or username
router.get('/profile/:identifier', async (req, res) => {
  try {
    const rawIdentifier = req.params.identifier;
    const identifier = rawIdentifier.trim().toLowerCase();

    // Fast in-memory response if MongoDB is offline
    if (mongoose.connection.readyState !== 1) {
      if (!inMemoryUsers[identifier]) {
        inMemoryUsers[identifier] = getDefaultProfile(identifier);
      }
      return res.json(inMemoryUsers[identifier]);
    }

    let user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("-password");

    if (!user) {
      return res.json(getDefaultProfile(identifier));
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
    }

    res.json(user);
  } catch (err) {
    console.error("Profile GET Error:", err.message);
<<<<<<< HEAD
    res.json({
      name: "Rajesh Patil",
      location: "Nashik, Maharashtra",
      photoURL: "assets/images/farmer-avatar.png"
    });
=======
    res.json(getDefaultProfile(req.params.identifier));
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile and farm details
router.put('/profile', async (req, res) => {
  try {
<<<<<<< HEAD
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
=======
    const { email, username, name, phone, location, photoURL, farmDetails } = req.body;
    const identifier = (email || username || "").trim().toLowerCase();

    if (!identifier) {
      return res.status(400).json({ msg: 'Email or Username is required to update profile' });
    }

    if (mongoose.connection.readyState !== 1) {
      inMemoryUsers[identifier] = {
        ...getDefaultProfile(identifier),
        ...(inMemoryUsers[identifier] || {}),
        name: name || inMemoryUsers[identifier]?.name,
        phone: phone || inMemoryUsers[identifier]?.phone,
        location: location || inMemoryUsers[identifier]?.location,
        photoURL: photoURL || inMemoryUsers[identifier]?.photoURL,
        farmDetails: farmDetails || inMemoryUsers[identifier]?.farmDetails,
      };
      return res.json(inMemoryUsers[identifier]);
    }

    const updateFields = {};
    if (name !== undefined) updateFields.name = name.trim();
    if (phone !== undefined) updateFields.phone = phone.trim();
    if (location !== undefined) updateFields.location = location.trim();
    if (photoURL !== undefined) updateFields.photoURL = photoURL;
    if (farmDetails !== undefined) updateFields.farmDetails = farmDetails;

    let user = await User.findOneAndUpdate(
      { $or: [{ email: identifier }, { username: identifier }] },
      { $set: updateFields },
      { returnDocument: 'after' }
    ).select("-password");

    if (!user) {
      return res.json({
        ...getDefaultProfile(identifier),
        ...updateFields,
      });
    }
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a

    res.json(user);
  } catch (err) {
    console.error("Profile PUT Error:", err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
