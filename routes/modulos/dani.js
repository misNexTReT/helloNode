var express = require('express');
var router = express.Router();

var utiles = require('./utiles');


router.get('/dani', function(req, res, next) {
	res.render('dani');
});

router.get('/daniAjax', function(req, res, next) {
	console.log("success SUPERVISOR    ");
	res.send(utiles.getString());
});


module.exports = router;