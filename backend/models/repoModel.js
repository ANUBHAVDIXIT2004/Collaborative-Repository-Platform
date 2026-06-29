const mongoose = require("mongoose");
const { Schema } = mongoose;

const RepositorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  content: [
    {
      type: String,
    },
  ],
  visibility: {
    type: Boolean,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
  stars: {
    type: Number,
    default: 0
  },
    headCommit:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Commit",
      default:null
  },
  forkedFrom: { type: mongoose.Schema.Types.ObjectId, ref: "Repository", default: null },
});

const Repository = mongoose.model("Repository", RepositorySchema);
module.exports = Repository;
