const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Regex definitions for Mongoose validation
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [USERNAME_REGEX, "Username must be 3-20 characters and contain only letters, numbers, or underscores."],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [EMAIL_REGEX, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long."],
    },
    name: {
      type: String,
      default: "KrishiMitra Farmer",
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    photoURL: {
      type: String,
      default: "assets/images/farmer-avatar.png",
    },
    location: {
      type: String,
      default: "Nashik, Maharashtra",
    },
    farmDetails: {
      totalLand: { type: String, default: "5.0 Acres" },
      mainCrop: { type: String, default: "Wheat (HD-2967)" },
      irrigationType: { type: String, default: "Drip Irrigation" },
      experience: { type: String, default: "10 Years" },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook: Hash password with bcrypt before saving to MongoDB
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compare entered password against stored hashed password in MongoDB
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
