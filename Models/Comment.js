const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  resource: {
    type: Schema.Types.ObjectId,
    ref: "Resource",
  },
  text: { type: String, required: true },
});

module.exports = mongoose.model("Comment", Comment);
