var router = require("express").Router();
const Resource = require("../Models/ResourceSchema");
const UserSchema = require("../Models/userModel");
const Comment = require("../Models/Comment");

// get resourced added by specific user
router.get("/resources/:user_id", (req, res, next) => {
  let userId = req.params.user_id;
  UserSchema.findOne({ _id: userId })
    .populate("resources", {match: { deleted: false})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
