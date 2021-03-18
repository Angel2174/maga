'user strict'

var express = require('express'); // cargar el modulo de express
var Actividades_relevantes_sedeController = require('../controllers/actividades_relevantes_sede');  // cargar el controlador

var api = express.Router();                //cargar el router de express, para tener acceso a los metods get,post etc..
var md_auth = require('../middlewares/authenticated'); //middleware de autienticacion

var multipart = require('connect-multiparty'); // midlewares subida de archivos
var md_upload = multipart({uploadDir: './uploads/publications_relevantes_sede'}); // indicar donde guardar los archivos

api.get('/probando-relesede',md_auth.ensureAuth, Actividades_relevantes_sedeController.probando);
api.post('/publicationsede', md_auth.ensureAuth, Actividades_relevantes_sedeController.savePublication);
api.get('/publicationsedess/:page?',md_auth.ensureAuth, Actividades_relevantes_sedeController.getPublications);
module.exports = api;
