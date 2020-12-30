/**********DOM Selection**********/
var searchBtn = $(".search-btn");
var searchBar = $(".search-bar");
var tempItemDisplay = $(".temp-item");
var tempDisplay = $("#temp");
var humidityDisplay = $("#humidity");
var windSpeedDisplay = $("#wind");
var weatherDisplay = $("#weather");
var currentBanner = $(".current-banner");
var nextDay1 = $("#nextdt-1");
var nextDay2 = $("#nextdt-2");
var nextDay3 = $("#nextdt-3");
var nextDay4 = $("#nextdt-4");
var nextDay5 = $("#nextdt-5");
var city = "";
var cityID = "";

/****** API KEY & QUERY String*******/
var APIKey = "a0aca8a89948154a4182dcecc780b513";
var queryStr = "";
var IdQueryStr = "";
var UVQueryStr = "";

/*********Fetch latest city searched******/
if (localStorage.getItem("city") !== null) {
  let lastCity = localStorage.getItem("city");
  console.log(lastCity);
  queryStr =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    lastCity +
    "&APPID=" +
    APIKey;
  $(".last-search").text(lastCity);
  getCurrentWeather();
} else {
  $(".accordian-banner").text(
    "Find out the forecast for the coming days as well"
  );
  nextDay1.text("Day 1");
  nextDay2.text("Day 2");
  nextDay3.text("Day 3");
  nextDay4.text("Day 4");
  nextDay5.text("Day 5");
  $(".history").hide();
}
/***** Fetch weather data based on city******/
function getCity(event) {
  event.preventDefault();
  city = searchBar.val();
  queryStr =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&APPID=" +
    APIKey;
  console.log(city);
  getCurrentWeather();
}

function getCurrentWeather() {
  fetch(queryStr)
    .then((response) => response.json())
    .then((data) => {
      //convert data
      let tempf = (data.main.temp - 273.15) * 1.8 + 32;
      console.log(data);
      let windsp = (data.wind.speed * 2.237).toFixed(1);
      tempDisplay.text(" : " + tempf.toFixed(2));
      humidityDisplay.text(" : " + data.main.humidity);
      windSpeedDisplay.text(" : " + windsp);
      weatherDisplay.text(" : " + data.weather[0].description);
      let feels = (data.main.feels_like - 273.15) * 1.8 + 32;
      currentBanner.text(
        "Currently it feels like " + feels.toFixed(2) + " in " + data.name
      );

      localStorage.setItem("city", data.name);

      getFutureForecast(data.id);
    });
}

//******Fetch UVIndex*******/
function getUVI(lat, lon) {
  UVQueryStr =
    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    APIKey +
    "&lat=" +
    lat +
    "&lon=" +
    lon;
  fetch(UVQueryStr)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $("#uvindex").text(" : " + data.value);
    });
}

// https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;

function getFutureForecast(cityID) {
  IdQueryStr =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    cityID +
    "&appid=" +
    APIKey;
  fetch(IdQueryStr)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $(".accordian-banner").text(
        "The forcast for the coming five days in " + data.city.name
      );
      nextDay1.text(data.list[0].dt_txt.split(" ")[0] + " ");
      let temp = (data.list[0].main.temp - 273.15) * 1.8 + 32;
      $("#day1-temp").text(temp.toFixed(2));
      let min=(data.list[0].main.temp_min - 273.15) * 1.8 + 32;
      $("#day1-min").text(min.toFixed(2));
      let max=(data.list[0].main.temp_max - 273.15) * 1.8 + 32;
      $("#day1-max").text(max.toFixed(2));
      $("#day1-humd").text(data.list[0].main.humidity);
      nextDay2.text(data.list[10].dt_txt.split(" ")[0] + " ");
      temp =(data.list[10].main.temp - 273.15) * 1.8 + 32;
      $("#day2-temp").text(temp.toFixed(2));
      min=(data.list[10].main.temp_min - 273.15) * 1.8 + 32;
      $("#day2-min").text(min.toFixed(2));
      max=(data.list[10].main.temp_max - 273.15) * 1.8 + 32;
      $("#day2-max").text(max.toFixed(2));
      $("#day2-humd").text(data.list[10].main.humidity);
      nextDay3.text(data.list[20].dt_txt.split(" ")[0] + " ");
      temp =(data.list[20].main.temp - 273.15) * 1.8 + 32;
      $("#day3-temp").text(temp.toFixed(2));
      min=(data.list[20].main.temp_min - 273.15) * 1.8 + 32;
      $("#day3-min").text(min.toFixed(2));
      max=(data.list[20].main.temp_max - 273.15) * 1.8 + 32;
      $("#day3-max").text(max.toFixed(2));
      $("#day3-humd").text(data.list[20].main.humidity);
      nextDay4.text(data.list[30].dt_txt.split(" ")[0] + " ");
      temp =(data.list[30].main.temp - 273.15) * 1.8 + 32;
      $("#day4-temp").text(temp.toFixed(2));
      min=(data.list[30].main.temp_min - 273.15) * 1.8 + 32;
      $("#day4-min").text(min.toFixed(2));
      max=(data.list[30].main.temp_max - 273.15) * 1.8 + 32;
      $("#day4-max").text(max.toFixed(2));
      $("#day4-humd").text(data.list[30].main.humidity);
      nextDay5.text(data.list[39].dt_txt.split(" ")[0] + " ");
      temp =(data.list[39].main.temp - 273.15) * 1.8 + 32;
      $("#day5-temp").text(temp.toFixed(2));
      min=(data.list[39].main.temp_min - 273.15) * 1.8 + 32;
      $("#day5-min").text(min.toFixed(2));
      max=(data.list[39].main.temp_max - 273.15) * 1.8 + 32;
      $("#day5-max").text(max.toFixed(2));
      $("#day5-humd").text(data.list[39].main.humidity);
      getUVI(data.city.coord.lat, data.city.coord.lon);
    });
}

searchBtn.on("click", getCity);
$(".history-btn").on("click", () => {
  localStorage.clear();
  location.reload();
});
