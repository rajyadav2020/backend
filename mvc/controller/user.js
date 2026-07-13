const User = require("../models/user")

async function handlegetallusers(req,res){
  const alldbusers = await User.find({});
  return res.json(alldbusers)
}

async function getuserbyid(req,res){
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).json({error:"user not found"});
  return res.json(user)
}

async function handleupdate(req,res){
  
}

module.exports = {
  handlegetallusers,
  getuserbyid
}