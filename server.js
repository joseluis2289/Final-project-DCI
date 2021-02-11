const { Router } = require("express");
var express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/references");
require("dotenv").config();
const app = express();
const UserModel = require("./userModel");
const expValidator = require("express-validator");
const Logger = require("morgan");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Define PORT
const PORT = process.env.PORT || 5000;

//listen to a port
app.listen(PORT, () => console.log(`Server started on Port${PORT}`));

const url =
  "mongodb+srv://admin:123joseluis@cluster0.cbvco.mongodb.net/sample_training?retryWrites=true&w=majority";

//connect to DataBase
const connectDB = async () => {
  try {
    //connect return Promise → async/await needed
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    //exit process with failure
    process.exit(1);
  }
};

//MiddleWares
app.use(Logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(expValidator());
app.use(authenticateToken());

///All routes
//register user
app.post("/register", (req, res, next) => {
  let newUser = req.body;
  console.log(newUser);

  req.check("name", "invalid name").isLength({ min: 3 });
  req.check("userName", "invalid userName"),
    req.check("email").isEmail().normalizeEmail(),
    req.check("password", "Password").isLength({ min: 3 });

  let errors = req.validationErrors();
  if (errors) {
    res.send({ validation: errors });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          console.log({ success: "validated successfully" });
          let instance = new UserModel({
            name: newUser.name,
            userName: newUser.userName,
            email: newUser.email,
            password: hash,
          });
          instance.save((err, result) => {
            if (err) {
              res.send({ msg: false, err });
            } else {
              res.send(result);
              console.log(result);
            }
          });
        }
      });
    });
  }
});

//login user
let refreshTokens = [];

app.post("/login", (req, res, next) => {
  let newUser = req.body;
  const userName = newUser.userName;
  const user = { name: userName };

  UserModel.findOne({
    userName: newUser.userName,
  })
    .then((result) => {
      bcrypt.compare(newUser.password, result.password, function (err, output) {
        if (err) {
          console.log(err);
        } else {
          //const accessToken = generateAccessToken(user);
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          res.send({ accessToken: accessToken, logIn: output });
        }
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}

function authenticateToken(req, res, next) {
  // bearer token
  //authenticate the token that is comming from the header
  const authHeader = req.headers["Authorization"];
  //if we have authHeader then return authHeader
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // (403) Access denied
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

//force the session to expire
app.get("/logout", (req, res, next) => {
  //to logout just force the session to be expired (just set the 'maxAge' to 0 or set 'expires' to a date from the past)
  var logOut = req.cookie;
  console.log(logOut);
});

connectDB();
//connect Router
app.use("/api/references", require("./routes/references"));
