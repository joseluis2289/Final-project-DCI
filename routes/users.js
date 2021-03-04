var router = require("express").Router();
const Resource = require("../Models/ResourceModel");
const UserSchema = require("../Models/userModel");
const Comment = require("../Models/Comment");

// get resourced added by specific user
router.get("/resources/:user_id", (req, res, next) => {
  let userId = req.params.user_id;
  UserSchema.findOne({ _id: userId })
    .populate("resources", { match: { deleted: false } })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json(err));
});

// get comments added by specific user
router.get("/comments/:user_id", (req, res, next) => {
  let userId = req.params.user_id;
  UserSchema.findOne({ _id: userId })
    .populate({
      path: "comments",
      populate: { path: "resource" },
      match: { deleted: false },
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.json(err));
});

//get all data from specific comment
router.get("/comments/:comment_id", (req, res, next) => {
  let userId = req.params.user_id;
  UserSchema.findOne({ _id: userId })
    .populate("comments", { match: { deleted: false } })
    .populate("resources")
    .then((user) => {
      res.json(user);
      console.log("that comes from my comments", user);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
