const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    schemeName: String,

    state: String,

    eligibility: String,

    benefits: String,

    officialLink: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scheme", schemeSchema);