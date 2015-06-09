/**
 * Module dependencies
 */
var express = require('express');
var logger = require('./lib/logger');
var bodyParser = require('body-parser');

/**
 * Locals
 */
var app = module.exports = express();
var port = process.env.PORT || 4000;
var db = {};

// parse json requests
app.use(bodyParser.json('application/json'));

/**
 * Routes
 */
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
/**
 * Start server if we're not someone else's dependency
 */
if (!module.parent) {
  app.listen(port, function() {
    logger.info('Anotamela API Básico escuchando en http://localhost:%s/', port);
  });
}