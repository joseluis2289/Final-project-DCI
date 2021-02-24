var router = require("express").Router();
const Resource = require("../Models/ResourceSchema");
const UserSchema = require("../Models/userModel");
const Comment = require("../Models/Comment");

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

      UserSchema.findByIdAndUpdate(comment.user, {$push:{comments: comment._id}})
          .then((userUpdated)=>{
            
              Resource.findByIdAndUpdate(comment.resource, {$push:{comments: comment._id}})
              .then((ResourceUpdated)=>{
                res.send(comment)
              })
              .catch(err=>console.log(err))

          })
          .catch(err=>console.log(err))
        })

    .catch((err) => {
      console.log(err);
      res.send(err);
    });
      })

module.exports = router;
