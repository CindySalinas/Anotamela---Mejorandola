var request = require('supertest');
var api = require('../server.js');

var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('recurso /notas', function() {

  describe('POST', function() {
    it('deberia crear una nota', function(done) {
      var data = {
        "nota":{        	
          "title": "Mejorando.la #node-pro",
          "description": "Introduccion a clase",
          "type": "js",
          "body": "soy el cuerpo de json"
        }     	               
      };

      request
        .post('/notas')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res){
        	var body = res.body;
        	var nota;
        	console.log(body);
        	expect(body).to.have.property('nota');
        	nota = body.notas;
        	console.log(nota);
        	expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
        	done();
        });
    });
    /*it('should evaluate async', function(){
    	var mejorandola = 'salinas';
    	expect(mejorandola).to.equal('cindy salinas');
    });*/
  });

});