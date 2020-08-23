const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "99312149303beb95e68d97f65c38961a";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  //Making a https get request to weather API, with node https module;
  https.get(url, (response) => {
    console.log(response.statusCode);

    //Parsing the response data to JSON format and retrieving the necessary parts.
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      //sending the retrieved data to the user.
      res.write("<h1>The weather is currently " + desc + "</h1>")
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees celsius</h1>")
      res.write("<img src =" + imageURL + ">")
      res.send()
    })
  })

})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
