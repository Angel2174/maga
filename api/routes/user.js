'user strict'

var express = require('express'); // cargar el modulo de express
var UserController = require('../controllers/user');  // cargar el controlador

var api = express.Router();                //cargar el router de express, para tener acceso a los metods get,post etc..
var md_auth = require('../middlewares/authenticated'); //middleware de autienticacion

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/home', UserController.home);
api.get('/pruebas',UserController.pruebas );
api.post('/register', UserController.SaveUser);
api.post('/login', UserController.loginUser);
api.get('/users/:page?', md_auth.ensureAuth, UserController.getUsers);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;
