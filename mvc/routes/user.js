const express = require('express');
const { model } = require('mongoose');

const router = express.Router();
const User = require("../models/user")
const {handlegetallusers,getuserbyid} = require("../controller/user")

router.get("/",handlegetallusers)


router
  .route("./:id", getuserbyid)


  .patch(async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id, {lastname: "changed"});
    return res.json({status:"success"});
  })

  .delete(async (req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "success"})
  })


router.post("/", async (req,res)=>{
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
})

module.exports = router