'use strict'
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Publication = require('../models/planificacion_semanal_sner');
var Select_empleado = require('../models/select_empleado');

function probando(req, res) {

  res.status(200).send({
	   message: 'hola desde controlador Planificacion_semanal_sner '
	 });

}

function savePublication(req, res){
  var params = req.body;


  if(!params.actividad) return res.status(200).send({message: 'debes enviar la actividad'});

  var publication = Publication();

  publication.actividad = params.actividad;
  publication.user = req.user.sub;
  publication.created_at = moment().unix();

  publication.save((err, publicationStored) => {
    if(err) return re.status(500).send({message: 'error al guardar el informe sner'});

    if(!publicationStored) return res.status(404).send({message: 'el informe no ha sido guardado'});

    return res.status(200).send({publication: publication});
  });

var publication = new Publication();

}

//devolver todos los informes
function getPublications(req, res){
  var page = 1;
  if(req.params.page){
    page = req.params.page;
  }

  var itemsPerPage = 4;

  Select_empleado.find({user: req.user.sub}).populate('selectempleado').exec((err, select_empleados) =>{
    if(err) return res.status(500).send({message: 'Error en mostrar la seleccion de empleado'});

    var select_empleados_clean = [];

    select_empleados.forEach((select_empleado) =>{
      select_empleados_clean.push(select_empleado.selectempleado);
    });
    Publication.find({user: {"$in": select_empleados_clean}}).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, publications, total) =>{
      if(err) return res.status(500).send({message: 'Error en mostrar informes'});

      if(!publications) return res.status(404).send({message: 'No hay informes'});

      return res.status(200).send({
        total_items: total,
        pages: Math.ceil(total/itemsPerPage),
        page: page,
        publications
      });
    });
  });
}
/*
function getInforme(req, res){
  var informeId = req.params.id;

  Planificacion_semanal_sner.findById(informeId, (err, planificacion_semanal_sner) => {
    if(err) return res.status(500).send({message: 'Error en mostrar informes'});

    if(!planificacion_semanal_sners) return res.status(404).send({message: 'No existe el informe'});

    return res.status(200).send({planificacion_semanal_sner});
  });
}

function deleteInforme(req, res){
  var informeId = req.params.id;

  Planificacion_semanal_sner.findByIdAndRemove(informeId, (err, planificacion_semanal_snerRemoved) =>{
    if(err) return res.status(500).send({message: 'Error al borrar  informe'});

    if(!planificacion_semanal_snerRemoved) return res.status(404).send({message: 'No se ha borrado el informe'});

    return res.status(200).send({planificacion_semanal_sner: planificacion_semanal_snerRemoved});
  });
}*/
module.exports = {
  probando,
  savePublication,
  getPublications

}
