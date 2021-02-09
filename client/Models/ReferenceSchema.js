const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReferenceSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  previewImage: { type: String },
  date: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ["", "frontend", "backend", "database"],
    required: true,
  },
  rating: { type: Number, min: 0, max: 5 },
  userID: { type: String },
  num_ratings: { type: Number },
  num_views: { type: Number },
  payed: { type: String, enum: ["paid", "free"], required: true },
  type: { type: String, enum: ["", "documentation", "course"], required: true }, // VIRTUAL → EMPTY AT BEGIN
  description: { type: String, required: true },
  edited: { type: Boolean },
  deleted: { type: Boolean },
  comments: [
    {
      username: { type: String, required: true },

      commentText: { type: String, required: true },

      date: { type: Date, default: Date.now },

      reaction: { type: { any: [String] } }, //string = username,

      edited: { type: Boolean },

      deleted: { type: Boolean },
    },
  ],
});

module.exports = Reference = mongoose.model("reference", ReferenceSchema);
