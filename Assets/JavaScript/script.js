// Global empty array variable to store names of cities enter in search input tag.
var cityName = [];
var date = "";

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
