var app = require('express')();
var logger = require('../logger');
var db = {};

app.route('/notas/:id?')
	//función que se ejecuta en todas las rutas
	.all(function(req, res, next){
		logger.info(req.method, req.path, req.body);
		res.set('Content-Type','application/json');
		next();
	})
	//POST
	.post(function(req, res) {
	  // manipulate request
		var notaNueva = req.body.nota;
		notaNueva.id = Date.now();
		db[notaNueva.id] = notaNueva;
	  // prepare response
	  res.set('Content-Type','application/json');
	  res.status(201);
	  // send response
	  res.json({
	    nota: notaNueva
	  });
	})
	//GET
	.get(function(req, res){
	  var id = req.params.id;
	  var nota = db[id];
	  res.json({
	    notas: nota
	  });
	});

module.exports = app;