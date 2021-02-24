var router = require("express").Router();
const Resource = require("../Models/ResourceSchema");
const UserSchema = require("../Models/userModel");
const Comment = require("../Models/Comment");

//get all Resources
router.get("/", (req, res, next) => {
  Resource.find({deleted: false})
  .populate("user", "name")
    .then((resources) => res.json(resources))
    .catch((err) => res.send(err));
});

//search for specific term in Resources
router.get("/search/:term", (req, res, next) => {
  const resources = Resource.find({ $text: { $search: req.params.term } })
    .then((resources) => res.json(resources))
    .catch((err) => res.send(err));
});


// add one resource
router.post("/add", (req, res, next) => {
  const {
    title,
    link,
    previewImage,
    date,
    user,
    category,
    rating,
    num_ratings,
    num_views,
    paid,
    format,
    description,
    edited,
    deleted,
    comments,
  } = req.body;

      let resource = new Resource({
        title,
        link,
        previewImage,
        date,
        user,
        category,
        rating,
        num_ratings,
        num_views,
        paid,
        format,
        description,
        edited,
        deleted,
        comments,
      });

      resource
        .save()
        .then((resourceAdded) => {
          UserSchema.findByIdAndUpdate(resourceAdded.user, {$push:{resources: resourceAdded._id}})
          .then((userUpdated)=>{
            res.send(resourceAdded)
          })
          .catch(err=>console.log(err))
        })
        .catch((err) => {
          res.send(err);
        });
});

// add many resources
router.post("/addmany", (req, res, next) => {
  req.body.map((item) => {
    const {
      title,
      link,
      previewImage,
      date,
      user,
      category,
      rating,
      num_ratings,
      num_views,
      paid,
      format,
      description,
      edited,
      deleted,
      comments,
    } = item;

    let newResource = new Resource({
      title,
        link,
        previewImage,
        date,
        user,
        category,
        rating,
        num_ratings,
        num_views,
        paid,
        format,
        description,
        edited,
        deleted,
        comments,
    });
    newResource
    .save()
    .then((resourceAdded) => {
      UserSchema.findByIdAndUpdate(resourceAdded.user, {$push:{resources: resourceAdded._id}})
      .then((userUpdated)=>{
        res.send(resourceAdded)
      })
      .catch(err=>console.log(err))
    })
    .catch((err) => {
      res.send(err);
    });
});
  });


//delete all resources
router.delete("/", (req, res, next) => {
  Resource.deleteMany()
    .then((res) => res.json("all resources were deleted"))
    .catch((err) => res.send(err));
});

// get one specific Resource
router.get("/:resource_id", (req, res, next) => {
  const resource = Resource.findById(req.params.resource_id)
    .populate("user", "name")
    .then((resource) => res.json(resource))
    .catch((err) => res.send(err));
});

// update one resource → not done
router.put("/:resource_id", (req, res, next) => {
  resourceUpdated = Resource.updateOne(
    { _id: req.params.resource_id },
    req.body
  )
    .then((resourceUpdated) => {
      res.send(resourceUpdated);
    })
    .catch((err) => {
      res.send(err);
    });
});

// delete one resource → not done
router.delete("/:resource_id", (req, res, next) => {
  const resource = Resource.findById(req.params.resource_id)
    .then((resource) => {
      if (!resource) {
        return res.json("resource not found");
      }
      resource
        .remove()
        .then(res.json("resource removed"))
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => res.send(err));
});

module.exports = router;
