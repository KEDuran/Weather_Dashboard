var cityName = [];
var date = "";

function cityList() {
	$("#cityList").empty();
	for (var i = 0; i < cityName.length; i++) {
		var cityLiItem = $("<li>").text(cityName[i]);
		cityLiItem.addClass("list-group-item");
		$("#cityList").append(cityLiItem.html());
	}
}

$("#searchBtn").click(function () {
	cityName.push($("#cityInput").val());
	cityList();
});
