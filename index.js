//IMPORTING
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

//==========================================================
//SETUP
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/"
  })
);
app.set("view engine", "hbs");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/public", express.static(__dirname + "/public"));

//===========================================================
// ROUTES

app.get("/", function(req, res) {
  //get location or cookie
  var requestString =
    "https://api.darksky.net/forecast/" +
    process.env.KEY +
    "/[latitude],[longitude]";

  request(requestString, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render("main", { info: response });
    } else {
      res.render("main", { error: error });
    }
  });
});

app.get("/getWeather/:id", function(req, res) {
  var requestString =
    "https://api.darksky.net/forecast/" +
    process.env.KEY +
    "/" +
    req.params.id +
    "?units=si";

  request(requestString, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(body);
    } else {
      res.send(error);
    }
  });
});

//==============================================================
//LISTENING
app.listen(process.env.PORT || 3000);
