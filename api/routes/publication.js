'user strict'

var express = require('express'); // cargar el modulo de express
var PublicationController = require('../controllers/publication');  // cargar el controlador

var api = express.Router();                //cargar el router de express, para tener acceso a los metods get,post etc..
var md_auth = require('../middlewares/authenticated'); //middleware de autienticacion

var multipart = require('connect-multiparty'); // midlewares subida de archivos
var md_upload = multipart({uploadDir: './uploads/publications'}); // indicar donde guardar los archivos

api.get('/probando-rele',md_auth.ensureAuth, PublicationController.probando);
api.post('/publication', md_auth.ensureAuth, PublicationController.savePublication);
api.get('/publications/:page?',md_auth.ensureAuth, PublicationController.getPublications);
module.exports = api;
