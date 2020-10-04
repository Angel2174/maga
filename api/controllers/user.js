'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');   //utilizar el modelo User

var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path'); //rutas del sistema de ficheros

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

//metodo para actualizar datos personales de usuarios
function updateUser(req, res){
  var userId = req.params.id;
  var update = req.body;

  //borrar propiedad password
  delete update.password;

  if (userId != req.user.sub) {
    return res.status(500).send({message: 'no tiene permiso para actualizar los datos del usuario'});
  }

  //no repetir usuario ni correo en actualizar Datos

  User.find({$or: [
              {email: update.email.toLowerCase()},
              {username: update.username.toLowerCase()}
  ]}).exec((err, users) => {

    var user_isset = false;
    users.forEach((user) => {
      if(user && user._id != userId) user_isset = true;
    });

    if(user_isset) return res.status(404).send({message: 'Los datos ya estan en uso'});

    User.findByIdAndUpdate(userId, update, {new: true},(err, userUpdated) => {
      if(err) return res.status(500).send({message: 'Error en la peticion'});

      if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario, Usuario o correo ya existentes'});

      return res.status(200).send({user: userUpdated});
    });

  });


}

//subir archivos
function uploadImage(req, res){
  var userId = req.params.id;

  if(req.files){
    var file_path = req.files.image.path;
    console.log(file_path);

    var file_split = file_path.split('\\');

    var file_name = file_split[2];

    var ext_split = file_name.split('\.');

    var file_ext = ext_split[1];

    if(userId != req.user.sub){
      return removeFilesOfUploades(res, file_path,'No tienes permiso para actualizar los datos del usuario');
      }
    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
      //actualizar documento de usuario logueado
User.findByIdAndUpdate(userId, {image: file_name}, {new: true}, (err, userUpdated) => {
  if(err) return res.status(500).send({message: 'Error en la peticion'});

  if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar'});

  return res.status(200).send({user: userUpdated});

});

    }else{
      return removeFilesOfUploades(res, file_path, 'Extensión no valida');
    }


  }else{
    return res.status(200).send({message: 'No se han subido imagenes'});
  }
}

function removeFilesOfUploades(res, file_path, message){
  fs.unlink(file_path, (err) => {     //eliminar directamente el fichero
    return res.status(200).send({message: message});
  });
}

//devolver la imagen de un usuario

function getImageFile(req,res){
  var image_file = req.params.imageFile;
  var path_file = './uploads/users/'+image_file;

  fs.exists(path_file, (exists) => {
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({message: 'No existe la imagen'});
    }
  });
}



module.exports = {

home,
pruebas,
SaveUser,
loginUser,
getUsers,
updateUser,
uploadImage,
getImageFile

}
