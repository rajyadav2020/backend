const express = require('express');
const users = require("./MOCK_DATA.json")
const app = express();
const mongoose = require('mongoose')
const fs = require('fs')
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

app.get('/api/users',(req,res)=>{
  res.json(users)
})

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(user => user.id === id);

  if (!user) {
      return res.status(404).json({
          message: "User not found"
      });
  }

  res.json(user);
});


//creating the new user

app.post("/api/users", (req,res)=>{
  const body = req.body;
  console.log("body: ", body)
  res.status({status: "pending"});
})


//editing the user
app.patch("/api/users/:id", (req,res)=>{
  
  const id = Number(req.params.id);

  const user = users.find((user)=> user.id === id );

  if(!user)
  {
    return res.status(404).json({
      message:"user not found successfully"
    });
  }

  Object.assign(user, req.body);

  return res.json({
    message:"user updated successfully",
    user
  })
})


app.delete("/api/users/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = users.findIndex(user => user.id === id);

  if (index === -1) {
      return res.status(404).json({
          message: "User not found"
      });
  }

  users.splice(index, 1);

  return res.json({
      message: "User deleted successfully"
  });
});



app.listen(PORT, ()=>{
  console.log("server is running");
})