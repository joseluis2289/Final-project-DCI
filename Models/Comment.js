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
  edited: { type: Boolean, default: false }, 
  deleted: { type: Boolean, default: false },
  
});

module.exports = mongoose.model("Comment", Comment);
