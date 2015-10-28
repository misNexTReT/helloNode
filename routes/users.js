var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');

});


/* GET ir al registro page*/
router.get('/registro', function(req, res){

	res.render('registro', {layout : 'layout', logout:[{false:false}]});

});


/* POST registrar un usuario page*/
router.post('/crearUsuario', function(req, res){

	var db = req.db;
	var collection = db.get('usuarios');
	collection.insert(req.body, function(err, result){
		res.send((err === null) ? { msg: '' } : { msg: err });
	});

});


/* POST login page*/
router.post('/loginUsuario', function(req, res){
    
    //datos del usuario a identificarse
    var username = req.body.username;
    var password = req.body.password;

    //Accedemos a la BBDD/Coleccion pasandole los datos de busqueda
    var db = req.db;
    var collection = db.get('usuarios');
    collection.find({'username':username,'password':password},function(e,docs){
       //console.log(docs);
       
       //Si encuentra un usuario gurdamos su info en una cookie y vamos a la pagina de inicio
       if(docs.length > 0) {
       		res.cookie('idUserCookie', docs[0]._id.toString());
       		res.cookie('nameUserCookie', docs[0].username);
       		res.send(docs);
       }else{
       		res.send('ERROR');
       }
    });

});


/* GET logout */
router.get('/logoutUsuario', function(req, res, next){

	res.clearCookie('idUserCookie');
	res.clearCookie('nameUserCookie');
	res.writeHead(301,{Location: '../index'});
	res.end();

});


/* POST delete usuario*/
router.post('/borrarUsuario', function(req, res){
    
    //BBDD
    var db = req.db;
    var collection = db.get('usuarios');

    //datos del usuario a eliminar
    var userToDelete = req.body.id;

    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });

});


/* GET gestion page*/
global.paginas.push('/gestion');
router.get('/gestion', function(req, res, next){

  //Accedemos a la BBDD/Coleccion pasandole los datos de busqueda
  var db = req.db;
  var collection = db.get('usuarios');
  collection.find({},{},function(e,docs){
    res.render('gestionUsuarios', {layout : 'layout', usersJson: docs});
  });

});



module.exports = router;
