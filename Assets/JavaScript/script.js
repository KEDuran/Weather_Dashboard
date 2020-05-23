// Global empty array variable to store names of cities enter in search input tag.
var cityName = [];
var date = "";
var lastCity = "";
var API = "1151188a4f0910fbef13fb3a9bafd06c";
var gueryURL =
	"https://api.openweathermap.org/data/2.5/forecast?appid=" + API + "&q=";

/* Invoking the keepLastCity() function here will make sure that all city values populate
 on the page after a refresh*/
keepLastCity();

/* This function will add a <li> tag item into the weather dashboard UI for each city 
included in the cityName array and help keep track of the last city name value that
was searched.*/
function createCityList() {
	$("#cityList").empty();
	for (var i = 0; i < cityName.length; i++) {
		var cityLiItem = $("<button>").text(cityName[i]);
		cityLiItem.addClass("btn btn-outline-primary");
		cityLiItem.click(function () {
			// here is the where the ajax function for weather data.
		});
		$("#cityList").append(cityLiItem.prop("outerHTML"));
	}
}

/* This function will push all cities names that are entered into the search input tag 
when the user clicked the search icon button.*/
$("#searchBtn").click(function () {
	var cityTextValue = $("#cityInput").val();
	cityName.push(cityTextValue);
	lastCity = cityTextValue;
	localStorage.setItem("lastCity", lastCity);
	createCityList();

	//This variable wll allow us to the API weather data.
	var queryURL =
		"https://api.openweathermap.org/data/2.5/forecast?appid=" +
		API +
		"&q=" +
		lastCity;

	/*This is the ajax method that is weather data getting data from the API based on search city value.*/
	$.ajax({
		url: queryURL,
		method: "GET",
	}).then(function (response) {
		// Pulling city, current date, and weather icon from API and publishing to weather dashboard.
		$("#city").html(
			`${lastCity} ${moment().format(
				"(M/D/YYYY)"
			)} <img src ="http://openweathermap.org/img/wn/${
				response.list[0].weather[0].icon
			}@2x.png"/>`
		);
		// Variable to convert the temp to fahrenheit
		var tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
		// Pulling temperature from API and publishing to weather dashboard.
		$("#temp").html("Temperature: " + tempF.toFixed(0) + " °F");

		// Pulling humidity from API and publishing to weather dashboard.
		$("#humidity").html("Humidity: " + response.list[0].main.humidity + "%");

		// Variable to convert the meters/second to miles/hour
		var milesPerHR = response.list[0].wind.speed * 2.237;
		// Pulling wind speed from API and publishing to weather dashboard.
		$("#wind").html("Wind Speed: " + milesPerHR.toFixed(1) + " MPH");

		/*Because UV index is found at another source URL, I created another queryURL variable
		specific for the UV index data. This will be used in the ajax method below.*/
		var queryURLuvi =
			"https://api.openweathermap.org/data/2.5/uvi/history?appid=" +
			API +
			"&lat=" +
			response.city.coord.lat +
			"&lon=" +
			response.city.coord.lon +
			"&start=" +
			moment().unix() +
			"&end=" +
			moment().add(1, "d").unix();

		/* Using nested ajax method to call UV index data based on lat/long from API and 
		publishing to weather dashboard.*/
		$.ajax({
			url: queryURLuvi,
			method: "GET",
		}).then(function (response) {
			$("#uvIndex").html("UV Index: " + response[0].value);
		});
	});
});

/* This function its extracting the city name array from local storage and also extracting the last
searched city value from local storage. Then, the create*/
function keepLastCity() {
	var storedLastCity = localStorage.getItem("lastCity");
	if (storedLastCity !== null && storedLastCity !== "") {
		lastCity = storedLastCity;
		cityName.push(storedLastCity);
	}
	createCityList();
}
