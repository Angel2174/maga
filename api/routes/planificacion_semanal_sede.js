'user strict'

var express = require('express'); // cargar el modulo de express
var Planificacion_semanal_sedeController = require('../controllers/planificacion_semanal_sede');  // cargar el controlador
var api = express.Router();                //cargar el router de express, para tener acceso a los metods get,post etc..
var md_auth = require('../middlewares/authenticated'); //middleware de autienticacion

var multipart = require('connect-multiparty'); // midlewares subida de archivos
//var md_upload = multipart({uploadDir: './uploads/users'}); // indicar donde guardar los archivos
api.get('/probando-plansede', md_auth.ensureAuth, Planificacion_semanal_sedeController.probando);
api.post('/planificacion_semanal_sede',md_auth.ensureAuth, Planificacion_semanal_sedeController.savePublication);
api.get('/planificacion_semanal_sedes/:page?',md_auth.ensureAuth, Planificacion_semanal_sedeController.getPublications);
module.exports = api;
