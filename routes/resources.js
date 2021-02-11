var router = require("express").Router();
const Resource = require("../Models/ResourceSchema");

//get all Resources
router.get("/", (req, res, next) => {
  const resources = Resource.find()
    .then((resources) => res.json(resources))
    .catch((err) => res.send(err));
});

// get one specific Resource
router.get("/:resource_id", (req, res, next) => {
  const resource = Resource.findById(req.params.resource_id)
    .then((resource) => res.json(resource))
    .catch((err) => res.send(err));
});

//update one resource → not done
// router.put("/:resource_id", (req, res, next) => {
//   const resource = Resource.findById(req.params.resource_id)
//     .then((resource) => res.json(resource))
//     .catch((err) => res.send(err));
// });

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
  console.log(req.body);
  const {
    title,
    link,
    previewImg,
    date,
    userID,
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
    previewImg,
    date,
    userID,
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
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
