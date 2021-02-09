const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  // avatarPhoto: { type: String },
  // gitHubAccount: {type: }
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 3 },
});

module.exports = mongoose.model('User', UserSchema);
