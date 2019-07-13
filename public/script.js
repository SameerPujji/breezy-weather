var convert = function(e) {
  e.preventDefault();

  var currentTemp = $("#temp").text();
  var lastChar = currentTemp[currentTemp.length - 1];

  if (lastChar === "C") {
    var tempC = parseFloat(currentTemp.split(" ")[0]);
    var tempF = Number(((tempC * 9) / 5 + 32).toFixed(3));
    $("#convert").html(
      "<a href = '' onclick = 'convert(event)' id='temp' >" +
        tempF +
        " &#176 F</a>"
    );
  } else if (lastChar === "F") {
    var tempF = parseFloat(currentTemp.split(" ")[0]);
    var tempC = Number((((tempF - 32) * 5) / 9).toFixed(3));
    $("#convert").html(
      "<a href = '' onclick = 'convert(event)' id='temp' >" +
        tempC +
        " &#176 C</a>"
    );
  } else {
    console.log("error");
  }
};

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var requestString =
        "https://breezyweather.herokuapp.com/getWeather/" +
        position.coords.latitude +
        "," +
        position.coords.longitude;
      $.ajax({
        url: requestString,
        success: function(data) {
          var weatherData = JSON.parse(data);
          console.log(weatherData);
          $("#convert").html(
            "<a href = '' onclick = 'convert(event)' id='temp' >" +
              weatherData.currently.temperature +
              " &#176 C</a>"
          );
          $("#summary").text(weatherData.currently.summary);
          $("#description").text(weatherData.daily.summary);
          $("#weatherIcon").attr("alt", "Weather Icon");
          if (weatherData.currently.icon === "clear-day") {
            $("#weatherIcon").attr("src", "/public/clear.png");
            $(".bg-circle").addClass("clearDay");
            $(" header.masthead").addClass("clearDay");
            $("a").addClass("black");
            $("h5").addClass("black");
            $("h6").addClass("black");
          } else if (weatherData.currently.icon === "clear-night") {
            $("#weatherIcon").attr("src", "/public/night.png");
            $(".bg-circle").addClass("clearNight");
            $(" header.masthead").addClass("clearNight");
          } else if (weatherData.currently.icon === "rain") {
            $("#weatherIcon").attr("src", "/public/rain.png");
            $(".bg-circle").addClass("rain");
            $(" header.masthead").addClass("rain");
            $("a").addClass("black");
            $("h5").addClass("black");
            $("h6").addClass("black");
          } else if (
            weatherData.currently.icon === "snow" ||
            weatherData.currently.icon === "sleet"
          ) {
            $("#weatherIcon").attr("src", "/public/snow.png");
            $(".bg-circle").addClass("snow");
            $(" header.masthead").addClass("snow");
            $("a").addClass("black");
            $("h5").addClass("black");
            $("h6").addClass("black");
          } else if (weatherData.currently.icon === "wind") {
            $("#weatherIcon").attr("src", "/public/windy.png");
            $(".bg-circle").addClass("rain");
            $(" header.masthead").addClass("rain");
            $("a").addClass("black");
            $("h5").addClass("black");
            $("h6").addClass("black");
          } else if (weatherData.currently.icon === "fog") {
            $("#weatherIcon").attr("src", "/public/fog.png");
            $(".bg-circle").addClass("rain");
            $(" header.masthead").addClass("rain");
            $("a").addClass("black");
            $("h5").addClass("black");
            $("h6").addClass("black");
          } else if (weatherData.currently.icon === "cloudy") {
            $("#weatherIcon").attr("src", "/public/cloud.png");
            $(".bg-circle").addClass("rain");
            $(" header.masthead").addClass("rain");
            $("a").addClass("black");
            $("h6").addClass("black");
            $("h5").addClass("black");
          } else if (weatherData.currently.icon === "partly-cloudy-day") {
            $("#weatherIcon").attr("src", "/public/partly cloudy.png");
            $(".bg-circle").addClass("cloudyDay");
            $(" header.masthead").addClass("cloudyDay");
            $("a").addClass("black");
            $("h5").addClass("black");
            $("h6").addClass("black");
          } else if (weatherData.currently.icon === "partly-cloudy-night") {
            $("#weatherIcon").attr("src", "/public/cloudy night.png");
            $(".bg-circle").addClass("cloudyNight");
            $(" header.masthead").addClass("cloudyNight");
          } else {
            $("#weatherIcon").attr("src", "/public/weather.png");
          }
        },
        error: function() {
          $("#convert").html("<h1>Error... Please try again</h1>");
        }
      });
    });
  }
});
