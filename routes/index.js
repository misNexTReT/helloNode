var express = require('express');
var router = express.Router();
var utils_json = require('./utils/utils_json');



/* GET home page. */
global.paginas.push('/');
router.get('/', function(req, res, next) {
	if (req.cookies.idUserCookie) {
		res.render('index');
	}else{
		res.render('login', {layout : 'layout', logout:[{false:false}]});
	}
});

/* GET home page. */
global.paginas.push('/index');
router.get('/index', function(req, res, next) {
  	if (req.cookies.idUserCookie) {
		res.render('index');
		throw new Error('oh no!');
	}else{
		res.render('login', {layout : 'layout', logout:[{false:false}]});
	}
});

/* GET RTVE page*/
global.paginas.push('/rtve');
router.get('/rtve', function(req, res, next){

	var url = 'http://www.rtve.es/api/programas.json?inPubTarget=INFANTIL&size=7';
	//CALLBACK TRADICIONAL
/*	utils_json.getJson(url, function(programasAPI){
		res.render('slide_rtve', {layout : 'layout', itemsJson: programasAPI.page.items});
	});*/



	//PROMESAS Y DEFERRED
	var promise = utils_json.getJsonPromise(url);
	
	promise.done(function(programasAPI){
		res.render('slide_rtve', {layout : 'layout', itemsJson: programasAPI.page.items});
	});

	promise.fail(function(err){
		console.log(err)
		res.render('slide_rtve', {layout : 'layout', itemsJson: null});
	});



});


module.exports = router;
