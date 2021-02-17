var router = require("express").Router();
const Resource = require("../Models/ResourceSchema");
const UserSchema = require("../Models/userModel");

//get all Resources
router.get("/", (req, res, next) => {
  const resources = Resource.find()
    .then((resources) => res.json(resources))
    .catch((err) => res.send(err));
});
//delete all references
router.delete("/", (req, res, next) => {
  Resource.deleteMany()
    .then((res) => res.json("all resources were deleted"))
    .catch((err) => res.send(err));
});
// get one specific Resource
router.get("/:resource_id", (req, res, next) => {
  const resource = Resource.findById(req.params.resource_id)
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

  UserSchema.findById(user)
    .select("-password")
    .then((userDB) => {
      let resource = new Resource({
        title,
        link,
        previewImage,
        date,
        user: userDB,
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
          console.log("tem id", resourceAdded);
          res.status(200).send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    });
});

router.post("/addmany", (req, res, next) => {
  let newResources = [];
  req.body.map((item) => {
    let newResource = new Resource({
      title: item.title,
      link: item.link,
      previewImage: item.previewImage,
      date: item.date,
      userID: item.userID,
      category: item.category,
      rating: item.rating,
      num_ratings: item.num_ratings,
      num_views: item.num_views,
      paid: item.paid,
      format: item.format,
      description: item.description,
      edited: item.edited,
      deleted: item.deleted,
      comments: item.comments,
    });
    newResource
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

module.exports = router;
