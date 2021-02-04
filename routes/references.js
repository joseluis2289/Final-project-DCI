var router = require("express").Router();

app.get("/", (req, res, next) => {
  res.render("Here is the response from API");
});

module.exports = router;
