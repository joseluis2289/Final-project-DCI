const { Router } = require("express");
var express = require("express");
const mongoose = require("mongoose");

const router = require("./routes/references");
require("dotenv").config();
const app = express();
const UserModel = require("./userModel");
let expValidator = require("express-validator");
const Logger = require("morgan");
var cookieParser = require("cookie-parser");
//1- include the express-session here ( dont forget to install it first)

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
    console.log({ success: "validated successfully" });
    let instance = new UserModel({
      name: newUser.name,
      userName: newUser.userName,
      email: newUser.email,
      password: newUser.password,
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

//login user
let loggedUser = "";

app.post("/login", (req, res, next) => {
  let newUser = req.body;

  UserModel.findOne({
    email: newUser.email,

    //to compare password use bcrypt
    password: newUser.password,
  })
    .then((result) => {
      //remove this if
      if (newUser.email === result.email && newUser.password) {
        res.send({ login: true, result });
        loggedUser = result.email;
        //use req.session.loggedIn = true
        console.log(loggedUser);
      } else {
        res.send({ login: false });
      }
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
//connect Router
app.use("/api/references", require("./routes/references"));

