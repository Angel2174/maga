'user strict'

var express = require('express'); // cargar el modulo de express
var Select_empleadoController = require('../controllers/select_empleado');  // cargar el controlador
var api = express.Router();                //cargar el router de express, para tener acceso a los metods get,post etc..
var md_auth = require('../middlewares/authenticated'); //middleware de autienticacion

api.get('/pruebas-select_empleado',md_auth.ensureAuth, Select_empleadoController.pruebas );
api.post('/select_empleado',md_auth.ensureAuth, Select_empleadoController.saveSelect_empleado );
api.delete('/select_empleadod/:id',md_auth.ensureAuth, Select_empleadoController.deleteSelect_empleado );
api.get('/empleados_seleccionados/:id?/:page?',md_auth.ensureAuth, Select_empleadoController.getFollowingUsers );

module.exports = api;
