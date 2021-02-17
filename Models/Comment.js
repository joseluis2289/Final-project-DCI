const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  text: { type: String, required: true },
});

module.exports = mongoose.model("comment", Comment);
