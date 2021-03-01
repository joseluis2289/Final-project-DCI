const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Resource = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  previewImage: {
    type: String,
  },
  date: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: [String],
    enum: ["frontend", "backend", "database", "machineLearning", "general" ],
    required: true,
  },
  usersThatRated: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  rating: { type: Number, min: 0, max: 5 },
  num_ratings: { type: Number },
  num_views: { type: Number },
  paid: { type: Boolean, required: true },
  format: {
    type: String,
    enum: ["documentation", "course"],
  }, // VIRTUAL → EMPTY AT BEGIN
  description: { type: String, required: true },
  edited: { type: Boolean, default: false }, //update the date
  deleted: { type: Boolean, default: false },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rankingUser: [
    {
      type: String,
      ref: "User",
    },
  ],
});

// Indexing is needed for full-text search
Resource.index({ title: "text", description: "text" });

module.exports = mongoose.model("Resource", Resource);