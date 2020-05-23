// Declaring global empty array variable to store names of cities enter in search input tag.
var cityName = [];
/* Declaring global empty string variable to store the name of the last city that was searched.
Added this variable to help meet HW acceptance criteria.*/
var lastCity = "";
// Declaring global API variabl to hold my Open Weather Map API key.
var API = "1151188a4f0910fbef13fb3a9bafd06c";
/* Declaring first getURL global variable for the API source link where most of weather data is pulled.
A second getURL variable will be set in the makeAjaxCall() function for UV index data.*/
var gueryURL =
	"https://api.openweathermap.org/data/2.5/forecast?appid=" + API + "&q=";

/* Invoking the keepLastCity() function here to make sure the last searced city value is populated
 after a page refresh or when app is opened.*/
keepLastCity();

/* This make AjaxCall() function will call all API data and ajax logic needed to populate all applicable
weather data for the weather dashboard.*/
function makeAjaxCall() {
	//This variable wll allow us to the API weather data based on value of the lastCity variable.
	var queryURL =
		"https://api.openweathermap.org/data/2.5/forecast?appid=" +
		API +
		"&q=" +
		lastCity;

	/*This ajax method will pull all weather data (expect UV Index) from the API source link based on 
	the entered search city value. UV index data is pulled from second ajax method via a different Open
	Weather Map source link.*/
	$.ajax({
		url: queryURL,
		method: "GET",
	}).then(function (response) {
		// Pulls the current city, date, and weather icon from API source link and publishes to weather dashboard.
		$("#city").html(
			`${lastCity} ${moment().format(
				"(M/D/YYYY)"
			)} <img src ="http://openweathermap.org/img/wn/${
				response.list[0].weather[0].icon
			}@2x.png"/>`
		);
		// Variable to convert Kelvin temp to Fahrenheit.
		var tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
		// Pulls temperature from API source link and publishes to weather dashboard.
		$("#temp").html("Temperature: " + tempF.toFixed(0) + " °F");

		// Pulls humidity from API source link and publishes to weather dashboard.
		$("#humidity").html("Humidity: " + response.list[0].main.humidity + "%");

		// Variable to convert the meters/second to miles/hour
		var milesPerHR = response.list[0].wind.speed * 2.237;
		// Pulls wind speed from API source link and publishes to weather dashboard.
		$("#wind").html("Wind Speed: " + milesPerHR.toFixed(1) + " MPH");

		/* This is the for loop to add weather data for each day in the 5-day forecast 
		part the weather dashboard.*/
		for (var i = 1; i < 6; i++) {
			var m = moment().add(i, "d");
			var tempF = (response.list[i].main.temp - 273.15) * 1.8 + 32;

			$("#cityTitle" + i).html(m.format("M/D/YYYY"));
			$("#cityIcon" + i).html(
				`<img src ="http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png"/>`
			);
			$("#cityTemp" + i).html("Temp: " + tempF.toFixed(2) + " °F");
			$("#cityHumidity" + i).html(
				"Humidity: " + response.list[i].main.humidity + "%"
			);
		}

		/*Because UV index is found at another source URL that the previously added weather data, 
		I created another queryURL variable specific for the UV index data. This will be used in the ajax method below.*/
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
			var UVIndex = response[0].value;
			$("#uvIndex").html(UVIndex);

			// Removes color class in order to apply the correct color for each UV index per city search.
			$("#uvIndex").removeClass();

			// If statement to add coloration to UV index based on value.
			if (UVIndex >= 0 && UVIndex < 3) {
				$("#uvIndex").addClass("low p-1");
			} else if (UVIndex >= 3 && UVIndex < 6) {
				$("#uvIndex").addClass("moderate p-1");
			} else if (UVIndex >= 6 && UVIndex < 8) {
				$("#uvIndex").addClass("high p-1");
			} else if (UVIndex >= 8 && UVIndex < 11) {
				$("#uvIndex").addClass("very_high p-1");
			} else {
				$("#uvIndex").addClass("extreme p-1");
			}
		});
	});
}

/* This function will add a <li> tag item into the weather dashboard UI for each city 
included in the cityName array and help keep track of the last city name value that
was searched.*/
function createCityList() {
	$("#cityList").empty();
	for (var i = 0; i < cityName.length; i++) {
		var cityLiItem = $("<button>").text(cityName[i]);
		cityLiItem.addClass(
			"btn btn-outline-secondary d-flex justify-content-start"
		);
		cityLiItem.on("click", function () {
			lastCity = $(this).text();
			makeAjaxCall();
		});
		$("#cityList").append(cityLiItem);
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
	makeAjaxCall();
});

/* This function its extracting the city name array from local storage and also extracting 
the last searched city value from local storage. Then, the create*/
function keepLastCity() {
	var storedLastCity = localStorage.getItem("lastCity");
	if (storedLastCity !== null && storedLastCity !== "") {
		lastCity = storedLastCity;
		cityName.push(storedLastCity);
	} else {
		lastCity = "Austin";
		cityName.push(lastCity);
	}
	createCityList();
	makeAjaxCall();
}
