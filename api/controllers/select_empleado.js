'use strict'
var mongoosePaginate = require('mongoose-pagination');
var User = require('../models/user');
var Select_empleado = require('../models/select_empleado');

function pruebas(req, res){

  res.status(200).send({message: 'hola desde el controlador select_empleado'});
}
//seleccionar empleado
function saveSelect_empleado(req, res){
  var params = req.body;

  var select_empleado = new Select_empleado();
  select_empleado.user = req.user.sub;
  select_empleado.selectempleado = params.selectempleado;

  select_empleado.save((err, select_empleadoStored) => {
    if(err) return res.status(500).send({message: 'error al guardar seleccion de empleado'});

    if(!select_empleadoStored) return res.status(404).send({message: 'la seleccion no se ha guardado'});

    return res.status(200).send({select_empleado:select_empleadoStored});
  });
}

//deseleccionar empleado

function deleteSelect_empleado(req, res){
  var userId = req.user.sub;
  var select_empleadoId = req.params.id;

  Select_empleado.find({'user':userId, 'selectempleado': select_empleadoId}).remove(err => {
    if(err) return res.status(500).send({message: 'Error al deseleccionar el empleado'});

    return res.status(200).send({message: ' se ha deseleccionado al empleado'});
  });
}

//listado de empleados seleccionados

function getFollowingUsers(req, res){
  var userId = req.user.sub;

  if(req.params.id && req.params.page){
    userId = req.params.id;
  }
  var page = 1;

  if(req.params.page){
    page = req.params.page;
  }else{
    page = req.params.id;
  }
  var itemsPerPage = 4; //cantidad de usuarios seleccioandos
  Select_empleado.find({user:userId}).populate({path: 'selectempleado'}).paginate(page, itemsPerPage, (err, select_empleados, total ) =>{
    if(err) return res.status(500).send({message: 'Error en el servidor'});

    if(!select_empleados) return res.status(404).send({message: 'No hay usuarios seleccioandos'});

    return res.status(200).send({
      total: total,
      pages: Math.ceil(total/itemsPerPage),
      select_empleados
    });
  });
}

   module.exports = {
     pruebas,
     saveSelect_empleado,
     deleteSelect_empleado,
     getFollowingUsers
   }
