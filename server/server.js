const http = require('http')

const myserver = http.createServer((req,res)=>{
  console.log(req.headers);
  res.end("fello from server");
});

myserver.listen(8000,()=>{
  console.log("server is running")
})

