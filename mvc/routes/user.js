const express = require('express');
const { model } = require('mongoose');

const router = express.Router();
const User = require("../models/user")
const {handlegetallusers,getuserbyid,handleUpdate,deleteUser,newuser} = require("../controller/user")


router.get("/", handlegetallusers);

router
  .get("/:id", getuserbyid)
  .patch("/:id", handleUpdate)
  .delete("/:id", deleteUser);

router.post("/", newuser);

module.exports = router;