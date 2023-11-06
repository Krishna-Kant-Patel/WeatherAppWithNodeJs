const http = require("http");
const fs = require("fs");
const https = require("https");

const homeFile = fs.readFileSync("Home.html", "utf-8");

const replaceVal = (tempVal, orgVal) =>{
  let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
  console.log(orgVal.weather[0].main);
  return temperature;
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=pune&appid=76f1561a36750427f59dfe127ce79fef";

    https.get(apiURL, (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        try {
          const weatherData = JSON.parse(data);
          const arrayData = [weatherData];
          // console.log(arrayData);

          const realTimeData = arrayData.map((val)=>replaceVal(homeFile, val)).join("");

          // You can process the weatherData here as needed
          // Now, you can send a response to the client
          // res.write(realTimeData);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(realTimeData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        }
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
