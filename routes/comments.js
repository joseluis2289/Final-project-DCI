var router = require("express").Router();
const Resource = require("../Models/ResourceSchema");
const UserSchema = require("../Models/userModel");
const Comment = require("../Models/Comment");

router.use("/", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});
router.post("/", (req, res, next) => {
  const { user, resource, text } = req.body;
  const newComment = new Comment({
    user,
    resource,
    text,
  });
  newComment
    .save()
    .then((comment) => {
      res.send({ msg: "comment added" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ msg: "error by sending comment" });
    });
});

module.exports = router;
