const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("Home.html", "utf-8");

const server = http.createServer((res, req)=>{
    if(req.url == "/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=pune&appid=76f1561a36750427f59dfe127ce79fef")
.on('data', function (chunk) {
  console.log(chunk)
})
.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);
 
  console.log('end');
});
    }
});

server.listen(8000, '127.0.0.1');
