const { Router } = require("express");
var express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

require("dotenv").config();
const app = express();
const UserModel = require("./userModel");
let expValidator = require("express-validator");
const Logger = require("morgan");
var cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
//1- include the express-session here ( dont forget to install it first)

//Define PORT
const PORT = process.env.PORT || 5000;

//listen to a port
app.listen(PORT, () => console.log(`Server started on Port${PORT}`));

// const url =
// "mongodb+srv://admin:123joseluis@cluster0.cbvco.mongodb.net/sample_training?retryWrites=true&w=majority";
const url = process.env.MONGO_URI;
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
app.use("/references", require("./routes/references"));
app.use(cors());
//2- add express-session as a middleware (take a look to the documentation on npm)
//3- Note: if you want to store sessions inside mongoAtlas db use connect-mongo
//4- configure the connect-mongo take a look connect-mongo on npm

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
    // let checkEmail = await UserModel.findOne({
    //
    // });
    // if(checkEmail)
    // return res.status(400).send('this email is already taken!');
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
let loggedUser = "";

app.post("/login", (req, res, next) => {
  let newUser = req.body;

  UserModel.findOne({
    email: newUser.email,

    //to compare password use bcrypt
    //password: newUser.password,
  })
    .then((result) => {
      //remove this if
      bcrypt.compare(newUser.password, result.password, function (err, output) {
        if (err) {
          console.log(err);
        } else {
          res.send({
            logIn: output,
          });
        }
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

//force the session to expire
app.get("/logout", (req, res, next) => {
  //to logout just force the session to be expired (just set the 'maxAge' to 0 or set 'expires' to a date from the past)
  var logOut = req.cookie;
  console.log(logOut);
});

connectDB();
