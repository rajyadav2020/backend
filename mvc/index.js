const express = require('express');
const app = express();
require("dotenv").config();
const userrouter = require("./routes/user")
const {connectmongo} = require("./connection")
const {logreqres} = require("./middleware/middleware")

const PORT = 3000;

connectmongo();

app.use(express.urlencoded({extended: false}))
//middleware plugin
app.use(logreqres('log.txt'));




app.use("/user", userrouter)

app.listen(PORT, ()=>{
  console.log("server is running");
})