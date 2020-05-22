// Global empty array variable to store names of cities enter in search input tag.
var cityName = [];
var date = "";

/* Invoking the keepCities() function here will make sure that all city values populate
 on the page after a refresh*/
keepCities();

/* This function will add a <li> tag item into the weather dashboard UI for each city 
included in the cityName array.*/
function createCityList() {
	$("#cityList").empty();
	for (var i = 0; i < cityName.length; i++) {
		var cityLiItem = $("<li>").text(cityName[i]);
		cityLiItem.addClass("list-group-item");
		$("#cityList").append(cityLiItem.prop("outerHTML"));
	}
}

/* This function will push all cities names that are entered into the search input tag 
when the user clicked the search icon button.*/
$("#searchBtn").click(function () {
	cityName.push($("#cityInput").val());
	localStorage.setItem("cityName", JSON.stringify(cityName));
	createCityList();
});

/* This function is parsing out the cityName items that are saved in local storage and reassigning 
them back to the <li> tags in the weather dashboard UI after  a page refresh. This function is called 
at the beginning of the this code.*/
function keepCities() {
	var storedCityName = JSON.parse(localStorage.getItem("cityName"));
	if (storedCityName !== null) {
		cityName = storedCityName;
	}
	createCityList();
}
