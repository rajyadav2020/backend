
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

async function handleUpdate(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function newuser(req,res)
{
  const body = req.body;
  if(
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({msg :"all fields are requ...."})
  }

  const result = await User.create({
    firstname: body.first_name,
    lastname: body.last_name,
    email: body.email,
    gender : body.gender,
    jobtitle:body.job_title
  })

  return res.status(201).json({msg:"success"})
}

module.exports = {
  handlegetallusers,
  getuserbyid,
  handleUpdate,
  deleteUser,
  newuser
}