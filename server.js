const { Router } = require("express");
var express = require("express");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 5000;

//connect Router
app.use("/api/references", require("./routes/references"));

//listen to a port
app.listen(PORT, ()=> console.log(`Server started on Port${PORT}`)