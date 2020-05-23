// Global empty array variable to store names of cities enter in search input tag.
var cityName = [];
var date = "";
var lastCity = "";
var API = "1151188a4f0910fbef13fb3a9bafd06c";

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
