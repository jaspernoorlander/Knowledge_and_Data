    var url = "http://localhost:5820/Eindproject/query?reasoning=true"; 
    var query = "PREFIX ex:<http://example.com/formula_one/>PREFIX dbo: <http://dbpedia.org/ontology/> SELECT ?driver ?team ?country ?points ?position ?flag WHERE {{?team rdf:type ex:Team}{?team ex:has_driver ?driver}{?driver ex:from_country ?country; ex:scored_points ?points; ex:position ?position}{?country dbo:flag ?flag}}";
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
// html("<img src="+ results[i].flag.value + ">")       
  array.push([results[i].position.value,results[i].flag.value, results[i].driver.value.slice(31,).split("_").join(" "),results[i].team.value.slice(31,).split("_").join(" "), results[i].points.value])
            }
    $(document).ready(function() {
        $('#example').DataTable( {
            data: array,
            columns: [
                { title: "Pos." },
                { title: "Nat."},
                { title: "Driver" },
                { title: "Team"},
                { title: "Points" }
                ]
    } );
} );
            }
    
    });
