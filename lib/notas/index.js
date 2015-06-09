var app = require('express')();
var logger = require('../logger');
var db = {};

app.post('/notas', function(req, res) {
  logger.info('POST', req.body);

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
});

app.get('/notas/:id?', function(req, res){
  console.log('GET /notas/%s', req.params.id);
  var id = req.params.id;
  var nota = db[id];
  res.json({
    notas: nota
  });
});

module.exports = app;