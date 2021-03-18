'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');   //utilizar el modelo User
var Select_empleado = require('../models/select_empleado');
var moment = require('moment');
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
       user.created_at = moment().unix();
       user.role = params.role; // por defecto 'ROLE_USER'
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
// conseguir datos de usuario y verificar si tengoseleccionado a al empleado

function getUser(req, res){
  var userId = req.params.id;

  User.findById(userId, (err, user) => {
    if(err) return res.status(500).send({message: 'Error en la peticion'});

    if(!user) return res.status(404).send({message: 'el usuario no existe'});
    return res.status(200).send({user});

    selectThisUser(req.user.sub, userId).then((value) => {
      return res.status(200).send({
        user,
        following: value.following,
        selectempleado: value.selectempleado
      });

    });
  });
}

async function selectThisUser(identity_user_id, user_id){
  var following = await Select_empleado.findOne({"user":identity_user_id, "selectempleado":user_id}).exec().then((following) => {
    return following;
  }).catch((err) =>{
    return handleError(err);
  });

    var selectempleado = await Select_empleado.findOne({"user":user_id, "selectempleado":identity_user_id}).exec().then((selectempleado) => {
      return select_empleado;
  }).catch((err) => {
    return handleError(err);
  });
  return{
    following: following,
    selectempleado: selectempleado
  }
}
//metodo para devolver listado de usuarios paginados

function getUsers(req, res){
  var user_id = req.user.sub; //id del usuario logueado

  var page = 1;
  if (req.params.page) {
    page = req.params.page;

  }

  var itemsPerPage = 5; //5 usuarios por pagina como maximo

  User.find().sort('-created_at').paginate(page, itemsPerPage, (err, users, total) => {
    if(err) return res.status(500).send({message: 'Error en la peticion'});

    if(!users) return res.status(404).send({message: 'No hay usuarios disponibles'});


/*    return res.status(200).send({
      users,
      total,
      pages: Math.ceil(total/itemsPerPage)
    });*/
     selectUserIds(user_id).then((value) => {
        return res.status(200).send({
          users,
          users_following: value.following,
          users_follow_me: value.selectempleado,
          total,
          pages: Math.ceil(total/itemsPerPage)   //numero de paginas
        });
      });


  });
}

//arreglo de id de usuarios seleccionados
async function selectUserIds(user_id){
  var following = await Select_empleado.find({"user":user_id}).select({'_id':0, '__v':0, 'user':0}).then((select_empleados) => {
    return select_empleados;
  })
  .catch((err) =>{
    return handleError(err);
  });

  //procesar usuarios seleccionados
  var following_clean = [];

  following.forEach((select_empleado) => {
    following_clean.push(select_empleado.selectempleado);
  });

/*  var selectempleado = [];

  selectempleado.forEach((select_empleado) => {
    selectempleado_clean.push(select_empleado.user);
  });*/

  return{
    following: following_clean
    //selectempleado: selectempleado_clean
  }
}


function getCounters(req, res){
  var userId = req.user.sub;
  if(req.params.id){
    userId = req.params.id;
  }
  getCountSelect(userId).then((value) => {
    return res.status(200).send(value);
  });
}

//contar los empleados seleccionados
async function getCountSelect(user_id){
  var following = await Select_empleado.count({"user":user_id}).exec((err, count) =>{
    if(err) return handleError(err);
    return count;
  });
  return{
    following: following
  }
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

//subir archivos del DPI
function uploadDoc_dpi(req, res){
  var userId = req.params.id;

  if(req.files){
    var file_path = req.files.doc_dpi.path;
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
User.findByIdAndUpdate(userId, {doc_dpi: file_name}, {new: true}, (err, userUpdated) => {
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

function getDpiFile(req,res){
  var image_file = req.params.doc_dpiFile;
  var path_file = './uploads/dpi/'+image_file;

  fs.exists(path_file, (exists) => {
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({message: 'No existe la imagen'});
    }
  });
}

/*function deleteUser(req, res){
  var userId = req.params.id;
  User.find({'user': req.user.sub, '_id': userId}).remove(err => {
    if(err) return res.status(500).send({message: 'Error al borrar usuario'});

    if(!userRemoved) return res.status(404).send({message: 'no se ha borrado el usuario'});

    return res.status(200).send({message: 'usuario eliminado con exito'});
  });

}*/

/*function deleteUser('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});*/


module.exports = {

home,
pruebas,
SaveUser,
loginUser,
getUsers,
getCounters,
updateUser,
uploadImage,
getImageFile,
getUser,
uploadDoc_dpi

}
