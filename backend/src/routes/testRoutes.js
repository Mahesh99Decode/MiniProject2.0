const express = require("express");
const router = express.Router();
const User = require('../models/User');
const verifyFirebaseToken = require("../middleware/authMiddleware");

router.post("/create-user", verifyFirebaseToken, async (req, res) => {
  try {
    const existingUser = await User.findOne({
      firebaseUID: req.user.uid,
    });

    if (existingUser) {
      return res.json(existingUser);
    }

    const user = await User.create({
      firebaseUID: req.user.uid,
      name: req.user.name,
      email: req.user.email,
      photoURL: req.user.picture,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;