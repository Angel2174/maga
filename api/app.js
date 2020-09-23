'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');  //carga la configuracion de rutas del controlador en este caso usuario
//middlewares  ---> metodo que se ejecuta antes de que llegue a un controlador, en cada ejecucion ser va ejecutar este middlewares

  // cuando resiva informacion de datos en una peticion lo va convertir en un objeto json, en cada peticion del BACKEND
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors
app.use(cors());
//rutas
app.use('/api', user_routes);//me permite hacer middlewares ---> tendre una ruta disponible '/api',lo que yo tenga en el routes

//exportar la configuracion

module.exports = app;
