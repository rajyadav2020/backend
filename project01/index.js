const express = require('express');
const users = require("./MOCK_DATA.json")
const app = express();
const mongoose = require('mongoose')
const fs = require('fs')
const userrouter = require("./")
require("dotenv").config();

const PORT = 3000;

mongoose
.connect(process.env.MONGO_URI)
.then(()=> console.log("mongodb connnected") )

app.use(express.urlencoded({extended: false}))
//middleware plugin
app.use((req,res,next)=>{
  console.log("hello from middleware 1");
  next();
} )

app.use((req,res,next)=>{
  fs.appendFile('log.txt', `${Date.now()}: , ${req.method} ${req.path}` , (err,data)=>{
    next();
  }  )
} )




app.listen(PORT, ()=>{
  console.log("server is running");
})