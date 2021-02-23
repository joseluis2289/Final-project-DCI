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
    ref: "Users",
  },
  category: {
    type: [String],
    enum: ["frontend", "backend", "database", "general"],
    required: true,
  },

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
      ref: "comments",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

// Indexing is needed for full-text search
Resource.index({ title: "text", description: "text" });

module.exports = mongoose.model("resource", Resource);
