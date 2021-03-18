'user strict'

var express = require('express'); // cargar el modulo de express
var PuestoController = require('../controllers/puesto');  // cargar el controlador
var api = express.Router();                //cargar el router de express, para tener acceso a los metods get,post etc..
var md_auth = require('../middlewares/authenticated'); //middleware de autienticacion

api.post('/puesto', PuestoController.prueba);
api.get('/puesto/:id', md_auth.ensureAuth, PuestoController.getPuesto);
api.get('/puesto/:page?', md_auth.ensureAuth, PuestoController.getPuestos);
module.exports = api;
