var express = require("express");
const protectedRoutes = express.Router();

protectedRoutes.use("/", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});
//posts/addResource

protectedRoutes.post("/addResource", (req, res) => {});

protectedRoutes.post("/addComment", (req, res) => {});
protectedRoutes.post("/rateResource", (req, res) => {});

module.exports = protectedRoutes;