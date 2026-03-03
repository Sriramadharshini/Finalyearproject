const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    template: String,
    aiSummary: String,
    renderedHtml: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);