<<<<<<< HEAD
const admin = require("../config/firebaseAdmin");

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Firebase Token",
=======
const jwt = require("jsonwebtoken");
const { User } = require("../../database");

const JWT_SECRET = process.env.JWT_SECRET || "krishimitra_secure_jwt_secret_2026";

/**
 * MongoDB JWT Authentication Middleware
 * Validates Bearer token, fetches user from MongoDB, and attaches to req.user
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No authentication token provided.",
      });
    }

    const token = authHeader.split("Bearer ")[1].trim();

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // Verify user exists in MongoDB
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User account no longer exists in database.",
        });
      }

      req.user = user;
      next();
    } catch (jwtErr) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token.",
      });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
    });
  }
};

<<<<<<< HEAD
module.exports = verifyFirebaseToken;
=======
// Export as function and attach alias for backwards compatibility
module.exports = authMiddleware;
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
