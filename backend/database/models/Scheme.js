const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    schemeId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: "All India",
    },
    type: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    eligibility: {
      type: String,
    },
    benefits: {
      type: String,
    },
    appProcess: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    officialLink: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for backward compatibility
schemeSchema.virtual("schemeName").get(function () {
  return this.name;
});

module.exports = mongoose.model("Scheme", schemeSchema);
