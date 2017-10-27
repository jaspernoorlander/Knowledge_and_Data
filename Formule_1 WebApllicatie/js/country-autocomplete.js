function zoekbalk() {
	
	var countries = [
		{ value: 'Australia', type: 'Country'},
		{ value: 'Austria', type: 'Country'},
		{ value: 'Azerbaijan', type: 'Country'},
		{ value: 'Bahrain', type: 'Country'},
		{ value: 'Belgium', type: 'Country'},
		{ value: 'Brazil', type: 'Country'},
		{ value: 'Canada', type: 'Country'},
		{ value: 'China', type: 'Country'},
		{ value: 'Germany', type: 'Country'},
		{ value: 'Great Britain', type: 'Country'},
		{ value: 'Hungary', type: 'Country'},
		{ value: 'Indonesia', type: 'Country'},
		{ value: 'Italy', type: 'Country'},
		{ value: 'Japan', type: 'Country'},
		{ value: 'Malaysia', type: 'Country'},
		{ value: 'Mexico', type: 'Country'},
		{ value: 'Monaco', type: 'Country'},
		{ value: 'Russia', type: 'Country'},
		{ value: 'Singapore', type: 'Country'},
		{ value: 'Spain', type: 'Country'},
		{ value: 'United Arab Emirates', type: 'Country'},
		{ value: 'United States', type: 'Country'},
		{ value: 'Nico Rosberg', type: 'Driver'},
		{ value: 'Lewis Hamilton', type: 'Driver'},
		{ value: 'Daniel Ricciardo', type: 'Driver'},
		{ value: 'Sebastian Vettel', type: 'Driver'},
		{ value: 'Max Verstappen', type: 'Driver'},
		{ value: 'Kimi Räikkönen', type: 'Driver'},
		{ value: 'Sergio Pérez', type: 'Driver'},
		{ value: 'Valtteri Bottas', type: 'Driver'},
		{ value: 'Nico Hülkenberg', type: 'Driver'},
		{ value: 'Fernando Alonso', type: 'Driver'},
		{ value: 'Felipe Massa', type: 'Driver'},
		{ value: 'Carlos Sainz Jnr', type: 'Driver'},
		{ value: 'Romain Grosjean', type: 'Driver'},
		{ value: 'Daniil Kvyat', type: 'Driver'},
		{ value: 'Jenson Button', type: 'Driver'},
		{ value: 'Kevin Magnussen', type: 'Driver'},
		{ value: 'Felipe Nasr', type: 'Driver'},
		{ value: 'Jolyon Palmer', type: 'Driver'},
		{ value: 'Pascal Wehrlein', type: 'Driver'},
		{ value: 'Stoffel Vandoorne', type: 'Driver'},
		{ value: 'Esteban Gutiérrez', type: 'Driver'},
		{ value: 'Marcus Ericsson', type: 'Driver'},
		{ value: 'Esteban Ocon', type: 'Driver'},
		{ value: 'Rio Haryanto', type: 'Driver'},
	  ];
	
	var search = document.getElementById("autocomplete").value;
	console.log(search)
	
	for (var i = 0; i<countries.length; i++){
		if (countries[i].value == search) {
			if(countries[i].type == 'Country') {
				console.log('Country')
				var country = search
			 	
				var url = "http://localhost:5820/Eindproject/query?reasoning=true"; 
				var query = "prefix ex: <http://example.com/formula_one/> prefix dbo:  <http://dbpedia.org/ontology/> select * where  {ex:" + country.split(" ").join("_") + " dbo:abstract ?abstract; dbo:currency ?currency;dbo:language ?language; ex:is_part_of ?continent; ex:has_grandprix ?grandprix. ?grandprix ex:name_circuit ?circuit.}"
				$.ajax({
					headers : {
						Accept: 'application/sparql-results+json'
					}, 
					url: url,
					data: {
						query: query
					},
					success: function(data) {
						var results = data.results.bindings;
						$('#dialog').dialog({
							modal: true,
							width: "550px",
							resizable: false,
							maxHeight: 500,
							buttons: {
								'Ok': function() {
									$(this).dialog('close');
								}
							},
							open: function () {
								var currency = results[0].currency.value.split("/")[4].split("_").join(" ")
								var language = results[0].language.value.split("/")[4].split("_").join(" ")
								var circuit = results[0].circuit.value.split("/")[4].split("_").join(" ")
								var grandprix = results[0].grandprix.value.split("/")[4].split("_").join(" ")
								var continent = results[0].continent.value.split("/")[4].split("_").join(" ")
								var abstract = results[0].abstract.value
								$(this).html("<h3 id = 'title_dialog'>"+country +"</h3><table class = 'country-table'><col width=40%><col width=70%><tr><th>Circuit</th><td>" + circuit + "</td></tr><tr><th>Grandprix</th><td>" + grandprix + "</td></tr><tr><th><br>Currency</th><td><br>" + currency + "</td></tr><tr><th>Language</th><td>" + language + "</td></tr><tr><th>Continent</th><td>" + continent + "</td></tr><table><br><b>Abstract:  </b><br>" +abstract);
							}
						})
					}
				});	
			}
			
			
		
		
			if(countries[i].type == 'Driver') {
				var driver = search
				var url = "http://localhost:5820/Eindproject/query?reasoning=true"; 
				var query = "prefix ex: <http://example.com/formula_one/> select * where  {ex:" + driver.split(" ").join("_") + " ex:has_nationality ?nationality; ex:in_team ?team; ex:scored_points ?points; ex:races ?races;ex:finished_first ?first; ex:finished_second ?second; ex:finished_third ?third.}"
				$.ajax({
					headers : {
						Accept: 'application/sparql-results+json'
					}, 
					url: url,
					data: {
						query: query
					},
					success: function(data) {
						var results = data.results.bindings;
						$('#dialog').dialog({
							modal: true,
							width: "330px",
							resizable: false,
							maxHeight: 500,
							buttons: {
								'Ok': function() {
									$(this).dialog('close');
								}
							},
							open: function () {
								var team = results[0].team.value.split("/")[4].split("_").join(" ")
								var nationality = results[0].nationality.value.split("/")[4].split("_").join(" ")
								var points = results[0].points.value
								var first = results[0].first.value
								var second = results[0].second.value
								var third = results[0].third.value
								$(this).html("<h3 id = 'title_dialog'>"+ driver +"</h3><table class = 'country-table'><col width=60%><col width=40%><tr><th>Team</th><td>" + team + "</td></tr><tr><th>Nationality</th><td>" + nationality + "</td></tr><tr><th><br>Points</th><td><br>" + points + "</td></tr><tr><th>Finished first</th><td>" + first + "</td></tr><tr><th>Finished second</th><td>" + second + "</td></tr><tr><th>Finished third</th><td>" + third + "</td></tr><table>");
							}
						})
					}
				});	
			}
		}
		
	}
	
}

	



$(function(){
  var countries = [
    { value: 'Australia'},
    { value: 'Austria'},
    { value: 'Azerbaijan'},
    { value: 'Bahrain'},
    { value: 'Belgium'},
    { value: 'Brazil'},
    { value: 'Canada'},
    { value: 'China'},
    { value: 'Germany'},
    { value: 'Great Britain'},
    { value: 'Hungary'},
    { value: 'Indonesia'},
    { value: 'Italy'},
    { value: 'Japan'},
    { value: 'Malaysia'},
    { value: 'Mexico'},
    { value: 'Monaco'},
    { value: 'Russia'},
    { value: 'Singapore'},
    { value: 'Spain'},
    { value: 'United Arab Emirates'},
    { value: 'United States'},
	{ value: 'Nico Rosberg'},
	{ value: 'Lewis Hamilton'},
	{ value: 'Daniel Ricciardo'},
	{ value: 'Sebastian Vettel'},
	{ value: 'Max Verstappen'},
	{ value: 'Kimi Räikkönen'},
	{ value: 'Sergio Pérez'},
	{ value: 'Valtteri Bottas'},
	{ value: 'Nico Hülkenberg'},
	{ value: 'Fernando Alonso'},
	{ value: 'Felipe Massa'},
	{ value: 'Carlos Sainz Jnr'},
	{ value: 'Romain Grosjean'},
	{ value: 'Daniil Kvyat'},
	{ value: 'Jenson Button'},
	{ value: 'Kevin Magnussen'},
	{ value: 'Felipe Nasr'},
	{ value: 'Jolyon Palmer'},
	{ value: 'Pascal Wehrlein'},
	{ value: 'Stoffel Vandoorne'},
	{ value: 'Esteban Gutiérrez'},
	{ value: 'Marcus Ericsson'},
	{ value: 'Esteban Ocon'},
	{ value: 'Rio Haryanto'},  
  ];
  
  // setup autocomplete function pulling from currencies[] array
  $('#autocomplete').autocomplete({
    lookup: countries,
    onSelect: function (suggestion) {
      var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
      $('#outputcontent').html(thehtml);
    }
  });
  

});