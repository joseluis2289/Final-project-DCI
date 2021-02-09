const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSChema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  avatarPhoto: { type: String },
  // gitHubAccount: {type: }
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
});

module.exports = User = mongoose.model("user", UserSChema);
