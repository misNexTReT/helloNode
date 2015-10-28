var http = require('http');
var jQuery  = require('jquery-deferred');


/**
 * GET JSON
 */
function getJson(url, callback){

	http.get(url, function(res){
	    var body = '';

	    res.on('data', function(chunk){
	        body += chunk;
	    });

	    res.on('end', function(){
	    	callback(JSON.parse(body));
	    });
	}).on('error', function(e){
	      console.log("[utils_json > getJson] Got an error: ", e);
	});

}


/**
 * GET JSON
 */
function getJsonPromise(url){

	var deferred = jQuery.Deferred();

	http.get(url, function(res){
	    var body = '';

	    res.on('data', function(chunk){
	        body += chunk;
	    });

	    res.on('end', function(){
	    	deferred.resolve(JSON.parse(body));
	    });
	}).on('error', function(e){
	      console.log("[utils_json > getJson] Got an error: ", e);
	      deferred.reject();
	});

	return deferred.promise();
}

module.exports = {
	getJsonPromise: getJsonPromise
}