var express = require("express");
var bodyParser = require("body-parser");
// New app using express module
var app = express();
var request = require("request");
const { json } = require("body-parser");

// setting template engine pug
app.set("view engine", "pug");
app.set("views", "./views");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", function (req, res) {
  res.render("index");
});
app.post("/", function (req, res) {
  var city = req.body.temp;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5a076309408a578ce14c136c35f300b`;
  request(url, (error, response, body) => {
    // Printing the error if occurred
    if (error) console.log(error);
    var temp = JSON.parse(body).main.temp - 273;
    res.send(
      `The Temperature in ${city.toUpperCase()} is ${temp} in degrees celsius`
    );
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server is running on port 3000");
});
