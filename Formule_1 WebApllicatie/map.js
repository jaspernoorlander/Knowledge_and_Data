// Setting the margin, height and width variables
var margin = {top: 70, left: 70, right: 50, bottom: 50},
    		height = 600 - margin.top - margin.bottom,
    		width = 1000 - margin.left - margin.right,
        centered;

// Adding a svg 
var svg = d3.select("body")
            .attr("class", "worldmap")
    			  .append("svg")
    			  .attr("height", height + margin.top + margin.bottom)
    			  .attr("width", width + margin.left + margin.right)
				  .attr('background', 'rgb(87,98,106)')
    			  .append("g")
    			  .attr("transform", "translate(" + margin.left + "," + margin.top  + ")")
				   ;



// Queue the json file and csv dataset
d3.queue()
    .defer(d3.json, "world.topojson")
    .await(ready)

// Projection for the making of the countries
var projection = d3.geoMercator()
    .translate([ (width / 2 - 60), height / 2 + 50 ])
    .scale(190) 

// Path that will make the countries 
var path = d3.geoPath()
    .projection(projection)



function ready (error, json) {
	var url = "http://localhost:5820/Eindproject/query?reasoning=true"; 
	//var query = "select ?grandprix ?city ?country ?labs ?latitude ?long where {?grandprix <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.com/formula_one/Grandprix>; <http://example.com/formula_one/in_city> ?city; <http://example.com/formula_one/in_country> ?country. ?city <http://www.opengis.net/ont/geosparql#latitude> ?latitude; <http://www.opengis.net/ont/geosparql#longitude> ?long  }";
	var query = "PREFIX ex:<http://example.com/formula_one/> select * where {?grandprix rdf:type ex:Grandprix; ex:name_circuit ?name;ex:in_city ?city; ex:in_country ?country; ex:number_of_labs ?labs;ex:total_distance ?distance; ex:length_circuit ?length. OPTIONAL {?grandprix ex:name_circuit ?circuit }.OPTIONAL {?grandprix ex:first_place_2016 ?first}. OPTIONAL {?grandprix ex:second_place_2016 ?second}.  OPTIONAL {?grandprix ex:third_place_2016 ?third}.  OPTIONAL {?grandprix ex:winning_team_2016 ?team}.  OPTIONAL {?grandprix ex:pole_position_2016 ?pole}.OPTIONAL {?grandprix ex:first_place_2015 ?first_2015}.OPTIONAL {?grandprix ex:second_place_2015 ?second_2015}. OPTIONAL {?grandprix ex:third_place_2015 ?third_2015}OPTIONAL {?grandprix ex:winning_team_2015 ?team_2015}. OPTIONAL {?grandprix ex:pole_position_2015 ?pole_2015}. ?city <http://www.opengis.net/ont/geosparql#latitude> ?latitude; <http://www.opengis.net/ont/geosparql#longitude> ?longitude. ?circuit ex:thumbnail ?thumbnail.}"
	$.ajax({
        headers : {
            Accept: 'application/sparql-results+json'
        }, 
        url: url,
        data: {
            query: query
        },
		buttons: {
			'ok': function() {
				$(this).dialog('close')
			}
		},
        success: function(data) {
            var results = data.results.bindings;
			console.log(results)
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
								 width: "580px",
								 buttons: {
									 'Ok': function() {
											 $(this).dialog('close');
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
									 console.log(city, country)
									 $(this).html("<h3>" + grandprix +"<h3/><br><img class='foto-circuit' src="+ thumbnail + "><table class = 'circuit'><col width=40%><col width=70%> <tr> <th>Country</th><td>" + country + "</td></tr><tr><th>City</th><td> " + city + "</td></tr><tr><th>Circuit</th><td> " + circuit + "</td></tr><tr><th>Labs</th><td> " + labs +"</td></tr><tr><th>Lenght</th><td> " + length +" meter</td></tr><tr><th colspan '2'></th></tr><tr><th colspan='2' margin:'20px'><h4><br>Race Results 2016</h4></th></tr><tr><th><br>First Place</th><td><br> " + first + "</td></tr><tr><th>Second Place</th><td> " + second + "</td></tr><tr><th>Third place</th><td> " + third + "</td></tr><tr><th>Team winner</th><td> " + team + "</td></tr></table>");	
								 	}
									 else {
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
									 $(this).html("<h3>" + grandprix +"<h3/><br><img class='foto-circuit' src="+ thumbnail + "><table class = 'circuit'><col width=40%><col width=70%> <tr> <th>Country</th><td>" + country + "</td></tr><tr><th>City</th><td> " + city + "</td></tr><tr><th>Circuit</th><td> " + circuit + "</td></tr><tr><th>Labs</th><td> " + labs +"</td></tr><tr><th colspan='2' margin:'20px'><h4><br>Race Results 2015</h4></th></tr><tr><th><br>First Place</th><td><br> " + first + "</td></tr><tr><th>Second Place</th><td> " + second + "</td></tr><tr><th>Third place</th><td> " + third + "</td></tr><tr><th>Team winner</th><td> " + team + "</td></tr></table>");	 
									 }
									 }
								 
								
							 }); 
						 })
			
					/*
						
			svg.selectAll(".city-label")
				.data(results)
				.enter().append("text")
				.attr("class", "city-label")
				.attr('x', function(d) {
					var Longitude = d.long.value
					var Latitude = d.latitude.value
					var coords = projection([Longitude, Latitude])
					console.log(coords[0])
						return coords[0];
				})
				.attr('y', function(d) {
					var Longitude = d.long.value
					var Latitude = d.latitude.value
					var coords = projection([Longitude, Latitude])
					console.log(coords[0])
						return coords[1];
				})
				.text(function(d){return d.city.value.split("/")[4].split("_").join(" ")})
				.attr('fill','red')
				.style('font-size', "10px")
				.attr('dx', 10)
				.attr('dy', 5)
				*/
            for (var i = 0; i<results.length; i++) {
				//console.log(results[i].city.value)
				var NameCountry = results[i].country.value.split("/")[4].split("_").join(" ")
				var NameCity = results[i].city.value.split("/")[4].split("_").join(" ")
				var Longitude = results[i].longitude.value
				var Latitude = results[i].latitude.value
					
				
				for (var j = 0; j < json.objects.countries1.geometries.length; j++) {
					var jsonCountry = json.objects.countries1.geometries[j].properties.name;
					// If the country name in json as in csv is the same, add a extra properties in json file 
					if (NameCountry == jsonCountry) {
						json.objects.countries1.geometries[j].properties.City = NameCity
						json.objects.countries1.geometries[j].properties.Longitude = Longitude
						json.objects.countries1.geometries[j].properties.Latitude = Latitude
						break;
        			}
			
				}
			}
		}
	});
	
	
    // Make a variable with all the countries
	var countries = topojson.feature(json, json.objects.countries1).features
		
			// Making of the countries
		svg.selectAll(".country")
			.data(countries)
			.enter()
			.append("path")
			.attr("class", "country")
			.attr("d", path)
			.on("click", clicked)
			// Filling the countries with colors, based on the Temperature difference
			
		
	
};



function clicked(d) {
  var x, y, k;
  if (d && centered !== d) {
    var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      centered = d;
    } else {
      x = (width / 2) - 50;
      y = height / 2.75;
      k = 1;
      centered = 1;
    }
  
	svg.selectAll("path")
    .classed("active", centered && function(d) { return d === centered; });
    svg.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
	
	svg.selectAll("path")
    .classed("active", centered && function(d) { return d === centered; });
    
    };


	

	
		


    
    
