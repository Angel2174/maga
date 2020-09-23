'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');   //utilizar el modelo User

var mongoosePaginate = require('mongoose-pagination');

var jwt = require('../services/jwt');
//metodo de prueba
function home(req,res) {
  res.status(200).send({
	   message: 'hola desde el servidor NodeJS HOME-MAGA'
	 });
}
//metodo de prueba
function pruebas(req, res) {
  console.log(req.body);
  res.status(200).send({
	   message: 'Accion de prueba CONTROLLER-MAGA en el servidor de NodeJS'
	 });

}

function SaveUser(req, res) {
  var params = req.body; //recoger los parametros de las peticiones (req), todos los campos que nos lleguen pos POST, los guardamos en esta variable
   var user = new User(); //utilizamos el modelo de usuario "crear un objeto del modelo de usuario"

  if (params.name && params.surname &&
      params.username && params.email && params.password) {

  	   user.name = params.name;    // setear los datos al objeto del usuario
  	   user.surname = params.surname;
  	   user.username = params.username;
  	   user.email = params.email;

       user.role = 'ROLE_USER'; // por defecto 'ROLE_USER'
  	   user.image = null; // por defecto 'null'

//controlar usuarios duplicados
       User.find({ $or: [
                     		{email: user.email.toLowerCase()},
                   		  	{username: user.username.toLowerCase()}
            		 	  ]}).exec((err, users) => {
                		 if(err) return  res.status(500).send({message: 'Error en la peticion de usuario'})

                		 if(users && users.length >= 1){
                		   return res.status(200).send({message: 'El usuario que intentas registrar ya existe'})
                		 }else{
                       //hashear la password y guardar los datos
                              bcrypt.hash(params.password, null, null, (err,hash) => {
                                   user.password = hash;
                                   //usar el metodo de mongoose
                                   user.save((err, userStored) => {
                                    if(err) return res.status(500).send({message: 'Error al guardar el usuario'})

                                    if(userStored){
                                      res.status(200).send({user: userStored});
                                     }else{
                                      res.status(404).send({message: 'No se ha registrado el usuario'});
                                    }
                                  });
                                 });
               		  }
             		  });

   }else {
       res.status(200).send({
  	     message: 'Enviar todos los campos necesarios!'
  	  });
  }
  }

function loginUser(req, res) {
  var params = req.body; // recoger los parametros que lleguen por POST

  var email = params.email;
  var password = params.password;
//comprobar si email y password que me esta llegando coincide con algun documento en la BD
  User.findOne({email: email},(err, user) => {
    if(err) return res.status(500).send({message: 'Error en la peticion'});

    if(user){
      bcrypt.compare(password, user.password, (err, check) => {
        if(check){

          if (params.gettoken) {
            //generar y devolver createToken
            return res.status(200).send({
              token: jwt.createToken(user)
            });

          }else{
            //devolver datos de usuario

            //no devolver y dejar como algo interno a nivel de BACKEND
            user.password = undefined;
            return res.status(200).send({user});

          }

        }else{
          return res.status(404).send({message: 'El usuario no se ha podido indentificar'});
        }
      });
    }else{
      return res.status(404).send({message: 'El usuario no se ha podido indentificar!!!'});
    }
  })


}

//metodo para devolver listado de usuarios paginados

function getUsers(req, res){
  var identity_user_id = req.user.sub; //id del usuario logueado

  var page = 1;
  if (req.params.page) {
    page = req.params.page;

  }

  var itemsPerPage = 5; //5 usuarios por pagina como maximo

  User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
    if(err) return res.status(500).send({message: 'Error en la peticion'});

    if(!users) return res.status(404).send({message: 'No hay usuarios disponibles'});

    return res.status(200).send({
      users,
      total,
      pages: Math.ceil(total/itemsPerPage)   //numero de paginas
    });
  });
}

module.exports = {

home,
pruebas,
SaveUser,
loginUser,
getUsers

}
