

success: function(data) { 
	var results = data.results.bindings;
	svg.selectAll(".city_circle")
	.data(results)
	.enter().append("circle")
	.attr("r", 4)
	.attr("cx", function(d) {
		var Longitude = d.longitude.value
		var Latitude = d.latitude.value
		var coords = projection([Longitude, Latitude])
		return coords[0];
	})
	.attr("cy", function(d) {
		var Longitude = d.longitude.value
		var Latitude = d.latitude.value
		var coords = projection([Longitude, Latitude])
		return coords[1];
	})
	.style("fill", "red")
	.on('click', function(d){
		console.log(d);
		$('#dialog').dialog({
			modal: true,
			titel: "swag",	
			width: "480px",
			button: {
				Ok: function () {
					
				}
			},
			open: function () {
				if( d.hasOwnProperty('first') ) {
					console.log('hi')
					var grandprix = d.grandprix.value.split("/")[4].split("_").join(" ");
					var city = d.city.value.split("/")[4].split("_").join(" ");
					var country = d.country.value.split("/")[4].split("_").join(" ");
					var circuit = d.name.value.split("/")[4].split("_").join(" ");
					var distance = d.distance.value;
					var length = d.length.value;
					var thumbnail = d.thumbnail.value;
					var labs = d.labs.value;
					var first = d.first.value.split("/")[4].split("_").join(" ");
					var second = d.second.value.split("/")[4].split("_").join(" ");
					var third = d.third.value.split("/")[4].split("_").join(" ");
					var team = d.team.value.split("/")[4].split("_").join(" ");
					var pole = d.pole.value.split("/")[4].split("_").join(" ");
					$(this).html("<h3>" + grandprix +"<h3/><br>" + "Country: " + country + "<br>City: " + city + "<br>Circuit: " + circuit + "<br>Labs: " + labs) + "<img src="+ thumbnail + ">";
				} else  {
					console.log('swag')
					var grandprix = d.grandprix.value.split("/")[4].split("_").join(" ");
					var city = d.city.value.split("/")[4].split("_").join(" ");
					var country = d.country.value.split("/")[4].split("_").join(" ");
					var circuit = d.name.value.split("/")[4].split("_").join(" ");
					var distance = d.distance.value;
					var length = d.length.value;
					var thumbnail = d.thumbnail.value;
					var labs = d.labs.value; 
					var first = d.first_2015.value.split("/")[4].split("_").join(" ");
					var second = d.second_2015.value.split("/")[4].split("_").join(" ");
					var third = d.third_2015.value.split("/")[4].split("_").join(" ");
					var team = d.team_2015.value.split("/")[4].split("_").join(" ");
					var pole = d.pole_2015.value.split("/")[4].split("_").join(" ");
					$(this).html("<h3>" + grandprix +"<h3/><br>" + "Country: " + country + "<br>City: " + city + "<br>Circuit: " + circuit + "<br>Labs: " + labs + "<img src='"+ thumbnail + "'> <br><br>First Place: " + first + "<br>Second Place: " + first +"<br>Third Place: " + third+"<br>Winning Team: " + team ++"<br>Pole Position: " + pole;	
				}
			};
		});
			




						