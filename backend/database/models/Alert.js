const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["warning", "info", "danger", "success"],
      default: "warning",
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    targetRegion: {
      type: String,
      default: "All India",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Alert", alertSchema);
