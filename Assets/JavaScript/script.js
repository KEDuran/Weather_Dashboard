var cityName = [];
var date = "";

function createCityList() {
	$("#cityList").empty();
	for (var i = 0; i < cityName.length; i++) {
		var cityLiItem = $("<li>").text(cityName[i]);
		cityLiItem.addClass("list-group-item");
		$("#cityList").append(cityLiItem.html());
	}
}

$("#searchBtn").click(function () {
	cityName.push($("#cityInput").val());
	localStorage.setItem("cityName", JSON.stringify(cityName));
	createCityList();
});
