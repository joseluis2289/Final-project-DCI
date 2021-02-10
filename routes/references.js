var router = require("express").Router();
const Reference = require("../Models/ReferenceSchema");

router.get("/", async (req, res, next) => {
  try {
    const reference = await Reference.find();
    res.json(reference);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/add", async (req, res, next) => {
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
    payed,
    format,
    description,
    edited,
    deleted,
    comments,
  } = req.body;

  try {
    let reference = new Reference({
      title,
      link,
      previewImg,
      date,
      userID,
      category,
      rating,
      num_ratings,
      num_views,
      payed,
      format,
      description,
      edited,
      deleted,
      comments,
    });

    await reference.save();
    res.send("reference added");
  } catch (error) {
    console.error("ao deu certuuuu");
    res.status(500).send("Server error");
  }
});

module.exports = router;
