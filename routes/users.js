var router = require("express").Router();
const Resource = require("../Models/ResourceModel");
const User = require("../Models/userModel");
const Comment = require("../Models/Comment");

// get resourced added by specific user
router.get("/resources/:user_id", (req, res, next) => {
  let userId = req.params.user_id;
  User.findOne({ _id: userId })
    .populate("resources")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json(err));
});

// get comments added by specific user
router.get("/comments/:user_id", (req, res, next) => {
  let userId = req.params.user_id;
  User.findOne({ _id: userId })
    .populate({
      path: "comments",
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.json(err));
});

//get all data from specific comment
router.get("/comments/:comment_id", (req, res, next) => {
  let userId = req.params.user_id;
  User.findById(userId)
     .populate("comments")
    .populate("resources")  
    .then((user) => {
      res.json(user);
      console.log("that comes from my comments", user);
    })
    .catch((err) => {console.log("erro?"); res.json(err)});
});

module.exports = router;
