const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String },
  userName: { type: String, required: true },
  // avatarPhoto: { type: String },
  // gitHubAccount: {type: }
  email: { type: String, required: true, unique: true },
  password: { type: String },
  //resources: { type: [String] },
});

module.exports = mongoose.model("User", UserSchema);
