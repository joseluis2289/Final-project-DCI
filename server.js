const { Router } = require("express");
var express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
//Define PORT
const PORT = process.env.PORT || 5000;

//connect to DataBase
const connectDB = async () => {
  try {
    //connect return Promise → async/await needed
    await mongoose.connect(process.env.MONGO_URI, {
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

connectDB();

//connect Router
app.use("/references", require("./routes/references"));

//listen to a port
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
