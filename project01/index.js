const express = require('express');
const users = require("./MOCK_DATA.json")
const app = express();

const PORT = 3000;

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
  res.status({status:pending});
})


//editing the user
app.patch("/api/users/:id", (req,res)=>{
  res.status({status:pending});
})


app.delete("/api/users/:id", (req,res)=>{
  res.status({status:pending});
})



app.listen(PORT, ()=>{
  console.log("server is running");
})