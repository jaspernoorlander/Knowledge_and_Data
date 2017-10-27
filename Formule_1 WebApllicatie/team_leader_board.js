    var url = "http://localhost:5820/Eindproject/query"; 
    var query = "PREFIX ex:<http://example.com/formula_one/> PREFIX dbo: <http://dbpedia.org/ontology/> select ?position ?country ?team ?points ?flag where {?team rdf:type ex:Team; ex:from_countrie ?country; ex:position ?position; ex:team_points ?points. ?country dbo:flag ?flag.}ORDER BY ASC(?position)";
    //ex:from_country ?country}{?country dbo:flag ?flag}
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
            var array = [];
            for (var i = 0; i < results.length; i++) {      
  array.push([results[i].position.value,results[i].flag.value, results[i].team.value.slice(31,).split("_").join(" "),results[i].points.value])
            }
    $(document).ready(function() {
        $('#example2').DataTable( {
            data: array,
			"iDisplayLength": 11,
            columns: [
                { title: "Pos." },
				{ title: "From"},
                { title: "Team"},
                { title: "Points" }
                ]
    } );
} );
            }
    
    });
