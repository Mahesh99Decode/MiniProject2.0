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
    });
  }
};

// Export as function and attach alias for backwards compatibility
module.exports = authMiddleware;
