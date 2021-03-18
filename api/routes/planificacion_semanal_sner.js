'user strict'

var express = require('express'); // cargar el modulo de express
var Planificacion_semanal_snerController = require('../controllers/planificacion_semanal_sner');  // cargar el controlador
var api = express.Router();                //cargar el router de express, para tener acceso a los metods get,post etc..
var md_auth = require('../middlewares/authenticated'); //middleware de autienticacion

var multipart = require('connect-multiparty'); // midlewares subida de archivos
//var md_upload = multipart({uploadDir: './uploads/users'}); // indicar donde guardar los archivos

api.get('/probando-plan', md_auth.ensureAuth, Planificacion_semanal_snerController.probando);
api.post('/planificacion_semanal_sner',md_auth.ensureAuth, Planificacion_semanal_snerController.savePublication);
api.get('/planificacion_semanal_sners/:page?',md_auth.ensureAuth, Planificacion_semanal_snerController.getPublications);
//api.get('/planificacion_semanal_sner/:id',md_auth.ensureAuth, Planificacion_semanal_snerController.getInforme);
//api.delete('/planificacion_semanal_sner/:id',md_auth.ensureAuth, Planificacion_semanal_snerController.deleteInforme);
module.exports = api;
