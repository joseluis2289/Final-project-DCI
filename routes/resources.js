var router = require("express").Router();
const Resource = require("../Models/ResourceSchema");

router.get("/", async (req, res, next) => {
  try {
    const resource = await Resource.find();
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
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
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
