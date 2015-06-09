var request = require('supertest');
var api = require('../server.js');

var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('recurso /notas', function() {

  describe('POST', function() {
    it('Debería crear una nota', function(done) {
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
        	expect(body).to.have.property('nota');
        	nota = body.nota;
          expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
          expect(nota).to.have.property('description', 'Introduccion a clase');
          expect(nota).to.have.property('type', 'js');
          expect(nota).to.have.property('body', 'soy el cuerpo de json');
        	expect(nota).to.have.property('id');
        	done();
        });
    });
    /*it('should evaluate async', function(){
    	var mejorandola = 'salinas';
    	expect(mejorandola).to.equal('cindy salinas');
    });*/
  });

  describe('GET', function(){
    it('Debería obtener una nota existente', function(done){
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
        .end(function(err, res){
          var id = res.body.nota.id;

          request
            .get('/notas/'+id)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .end(function(err, res){
              var nota = res.body.notas;
              expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
              expect(nota).to.have.property('description', 'Introduccion a clase');
              expect(nota).to.have.property('type', 'js');
              expect(nota).to.have.property('body', 'soy el cuerpo de json');
              expect(nota).to.have.property('id', id);

              done();
            });
        });
    });
  });

});