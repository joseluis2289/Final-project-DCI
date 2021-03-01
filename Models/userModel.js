const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  // avatarPhoto: { type: String },
  // gitHubAccount: {type: }
  email: { type: String, required: true, unique: true },
  password: { type: String },
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
