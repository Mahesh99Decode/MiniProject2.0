const jwt = require("jsonwebtoken");
const { User } = require("../database");
const { validateRegistrationInput, validateLoginInput } = require("../utils/authValidator");

const JWT_SECRET = process.env.JWT_SECRET || "krishimitra_secure_jwt_secret_2026";

/**
 * Generate JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user in MongoDB with regex validation & hashed password
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { username, email, password, name, phone, location, farmDetails } = req.body;

    // 1. Regex Validation
    const validation = validateRegistrationInput({ username, email, password, phone });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errors[0],
        errors: validation.errors,
      });
    }

    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    // 2. Check MongoDB for existing user
    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    });

    if (existingUser) {
      if (existingUser.username === normalizedUsername) {
        return res.status(409).json({
          success: false,
          message: "Username is already taken. Please choose another.",
        });
      }
      if (existingUser.email === normalizedEmail) {
        return res.status(409).json({
          success: false,
          message: "An account with this email address already exists. Please log in.",
        });
      }
    }

    // 3. Create user in MongoDB (password hashed by User pre-save hook)
    const user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: password,
      name: name && name.trim() !== "" ? name.trim() : "KrishiMitra Farmer",
      phone: phone ? phone.trim() : "",
      location: location && location.trim() !== "" ? location.trim() : "Nashik, Maharashtra",
      farmDetails: farmDetails || {
        totalLand: "5.0 Acres",
        mainCrop: "Wheat (HD-2967)",
        irrigationType: "Drip Irrigation",
        experience: "10 Years",
      },
    });

    // 4. Generate JWT
    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
        location: user.location,
        farmDetails: user.farmDetails,
      },
    });
  } catch (error) {
    console.error("Auth Register Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to register user",
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user with username/email and password against MongoDB
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { identifier, username, email, password } = req.body;
    const loginIdentifier = (identifier || username || email || "").trim();

    // 1. Regex Validation
    const validation = validateLoginInput({ identifier: loginIdentifier, password });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errors[0],
        errors: validation.errors,
      });
    }

    // 2. Query MongoDB by username or email
    const normalizedIdentifier = loginIdentifier.toLowerCase();
    const user = await User.findOne({
      $or: [{ username: normalizedIdentifier }, { email: normalizedIdentifier }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password.",
      });
    }

    // 3. Authenticate password against hashed password in MongoDB
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password.",
      });
    }

    // 4. Generate token
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
        location: user.location,
        farmDetails: user.farmDetails,
      },
    });
  } catch (error) {
    console.error("Auth Login Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Authentication error",
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get currently logged-in user profile from MongoDB
 * @access  Private
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("GetMe Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @route   PUT /api/auth/profile
 * @desc    Update authenticated user's profile in MongoDB
 * @access  Private
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { name, phone, location, photoURL, farmDetails } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (phone !== undefined) updateData.phone = phone.trim();
    if (location !== undefined) updateData.location = location.trim();
    if (photoURL !== undefined) updateData.photoURL = photoURL;
    if (farmDetails !== undefined) updateData.farmDetails = farmDetails;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { returnDocument: 'after', runValidators: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully in MongoDB",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
};
