const mongoose = require("mongoose");

const pullRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fromRepo: { type: mongoose.Schema.Types.ObjectId, ref: "Repository", required: true },  // forked repo
  toRepo: { type: mongoose.Schema.Types.ObjectId, ref: "Repository", required: true },    // original repo
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["open", "merged", "closed"], default: "open" },
}, { timestamps: true });

module.exports = mongoose.model("PullRequest", pullRequestSchema);