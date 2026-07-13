const mongoose = require('mongoose');

async function connectmongo(){
  return await mongoose
  .connect(process.env.MONGO_URI)
  .then(()=> console.log("mongodb connnected") )
}

module.exports = {
  connectmongo
}