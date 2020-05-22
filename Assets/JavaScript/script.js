var cityName = [];
var date = "";

function cityList() {
	$("#cityList").empty();
	for (var i = 0; i < cityName.length; i++) {
		$("#cityList").append("<li>");
	}
}

$("#searchBtn").click(function () {
	cityName.push($("#cityInput").val());
});
