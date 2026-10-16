const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      unique: true,
      sparse: true, // Allows nulls to not clash on unique index
    },

    name: {
      type: String,
      default: "Anonymous Farmer",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    photoURL: {
      type: String,
    },

    location: {
      type: String,
      default: "Unknown",
    },

    farmDetails: {
      totalLand: { type: String, default: "0 Acres" },
      mainCrop: { type: String, default: "None" },
      irrigationType: { type: String, default: "None" },
      experience: { type: String, default: "0 Years" }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);